import moment from "moment";
import {
  DATE_TIME_FORMAT,
  DAYS_IN_WEEK,
  MIN_IN_HOURS,
} from "./AppointmentConstants";
import {
  IGetSlotAppointmentDateArgs,
  IGetSlotOnDateArgs,
  IRangeTime,
  IReqAppointmentData,
  TInternalSlotData,
  TSlotData,
} from "./AppointmentTypes";

// TODO: Date should be formatted in a way that a date obj can be create from the resulting string
const getDateTimeKey = (date: Date) => moment(date).format(DATE_TIME_FORMAT);

// Get weekDates ie. the current date with next 6 dates.
export const getWeekDates = (date: Date) => {
  const startDate = moment(date).startOf("week");
  const weekDates = new Set<string>();
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const weekDate = moment(startDate).add(i, "days").startOf("day");
    weekDates.add(getDateTimeKey(weekDate.toDate()));
  }
  return weekDates;
};

export const getAppointmentsByTime = <
  TAppointmentData extends IReqAppointmentData
>(
  appointments: TAppointmentData[],
  weekDates: Set<string>
) => {
  const appointsByTime = new Map<string, TAppointmentData>();

  appointments.forEach((appointment) => {
    const appointmentDate = moment(appointment.appointmentTime).startOf("day");
    const appointmentDateKey = getDateTimeKey(appointmentDate.toDate());

    // Check the appointment falls with in the week
    if (weekDates.has(appointmentDateKey)) {
      const appointmentStartKey = getDateTimeKey(appointment.appointmentTime);
      //  Check if any other appointment starts on the time
      if (appointsByTime.has(appointmentStartKey)) {
        console.warn(
          `Appointment starting on the same time. Later ones will be ignored`
        );
      } else {
        appointsByTime.set(appointmentStartKey, appointment);
      }
    } else {
      // Appointment doesn't fall in the week
      console.warn(`Date doesn't fall in the weeks range`);
    }
  });
  return appointsByTime;
};

export const getSlotsOnDate = <TAppointmentData extends IReqAppointmentData>({
  appointmentsByTime,
  date,
  slotDuration,
  from,
  to,
}: IGetSlotOnDateArgs<TAppointmentData>): TInternalSlotData<TAppointmentData>[] => {
  const slotsOnDate: TInternalSlotData<TAppointmentData>[] = [];

  if (MIN_IN_HOURS % slotDuration !== 0) {
    throw new Error(`Slot duration should be a factor of ${MIN_IN_HOURS}`);
  }

  // TODO: Add start time and end time for the slot

  const startDate = moment(date).startOf("date");

  const startTime = moment(startDate).add({
    hours: from.hours,
    minutes: from.minutes,
  });

  const endTime = moment(startDate).add({
    hours: to.hours,
    minutes: to.minutes,
  });
  console.log({
    startTime: startTime.toString(),
    endTime: endTime.toString(),
  });

  let slotTime = moment(startTime);

  while (
    slotTime.day() === startDate.day() &&
    moment(slotTime).add({ minutes: slotDuration }).toDate() <= endTime.toDate()
  ) {
    const appointmentTimeKey = getDateTimeKey(slotTime.toDate());
    const appointment = appointmentsByTime.get(appointmentTimeKey);

    // durations are in minutes
    let totalSlotDuration = slotDuration;
    if (!appointment) {
      slotsOnDate.push({
        slotType: "AVAILABLE",
        duration: slotDuration,
        startTime: slotTime.toDate(),
        id: appointmentTimeKey,
        endTime: moment(slotTime).add(totalSlotDuration, "minutes").toDate(),
      });
    } else {
      // TODO: Add a warning if it the value is in fraction
      const slotSpan = Math.floor(
        appointment.appointmentDuration / slotDuration
      );
      totalSlotDuration = appointment.appointmentDuration;
      slotsOnDate.push({
        slotType: "RESERVED",
        id: appointmentTimeKey,
        startTime: slotTime.toDate(),
        duration: appointment.appointmentDuration,
        appointmentData: appointment,
        slotSpan,
        endTime: moment(slotTime).add(totalSlotDuration, "minutes").toDate(),
      });
      for (let i = 0; i < slotSpan - 1; i++) {
        slotsOnDate.push({
          slotType: "BLANK",
        });
      }
    }

    slotTime.add(totalSlotDuration, "minutes");
  }
  return slotsOnDate;
};

export const getSlotAppointmentData = <
  TAppointmentData extends IReqAppointmentData
>({
  appointments,
  dateOfWeek,
  slotDuration,
  from,
  to,
}: IGetSlotAppointmentDateArgs<TAppointmentData>): TInternalSlotData<TAppointmentData>[][] => {
  const slotAppointmentData: TInternalSlotData<TAppointmentData>[][] = [];

  // re-verifying the startWeekDate
  const startWeekDate = moment(dateOfWeek).startOf("week");

  const weekDates = getWeekDates(startWeekDate.toDate());
  const appointmentsByTime = getAppointmentsByTime(appointments, weekDates);

  for (const weekDate of weekDates) {
    const slotsOnDate = getSlotsOnDate({
      appointmentsByTime,
      slotDuration,
      date: new Date(weekDate),
      from,
      to,
    });
    slotAppointmentData.push(slotsOnDate);
  }

  return slotAppointmentData;
};

export const findTotalDuration = (
  date: Date,
  from: IRangeTime,
  to: IRangeTime
) => {
  const startTime = moment(date).add({
    hours: from.hours,
    minutes: from.minutes,
  });

  const endTime = moment(date).add({
    hours: to.hours,
    minutes: to.minutes,
  });

  return endTime.diff(startTime, "minutes");
};
