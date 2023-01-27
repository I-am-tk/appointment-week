import moment from "moment";
import { AppointmentPicker } from "../appointment-picker";
import { DUMMY_APPOINTMENT_DATA } from "./data";

import "./BasicExampleStyle.css";

const formatSlotTime = (startTime: Date, endTime: Date) => {
  return `${moment(startTime).format("HH:mm")} - ${moment(endTime).format(
    "HH:mm"
  )}`;
};

const formatSlotTitle = (time: Date) => {
  return moment(time).format("dddd");
};

export const BasicExample = () => {
  return (
    <AppointmentPicker
      className="content"
      from={{ hours: 6 }}
      to={{ hours: 12 }}
      appointments={DUMMY_APPOINTMENT_DATA}
      dateOfWeek={new Date()}
      renderSlot={(slot, onClick) => {
        const isReserved = slot.slotType === "RESERVED";
        const isSelected = slot.slotType === "AVAILABLE" && slot.isSelected;
        return (
          <div
            className={`slot ${isReserved ? "reserved" : "available"} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => onClick(slot.id)}
          >
            {formatSlotTime(slot.startTime, slot.endTime)}
          </div>
        );
      }}
      renderTitle={(date) => (
        <div className={`group-title`}>{formatSlotTitle(date)}</div>
      )}
      maxReservationAllowed={3}
      slotDuration={30}
    />
  );
};
