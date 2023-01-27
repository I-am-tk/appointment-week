import { useState } from "react";
import {
  DAYS_IN_WEEK,
  DEFAULT_END_HOUR,
  DEFAULT_MAX_RESERVATION_ALLOWED,
  DEFAULT_SLOT_DURATION,
  DEFAULT_START_HOUR,
} from "./AppointmentConstants";
import {
  IAppointmentPickerProps,
  IReqAppointmentData,
} from "./AppointmentTypes";
import { findTotalDuration, getSlotAppointmentData } from "./AppointmentUtils";

const AppointmentPicker = <TAppointmentData extends IReqAppointmentData>({
  renderSlot,
  renderTitle,
  appointments,
  dateOfWeek,
  slotDuration = DEFAULT_SLOT_DURATION,
  from = { hours: DEFAULT_START_HOUR },
  to = { hours: DEFAULT_END_HOUR },
  className = "",
  maxReservationAllowed = DEFAULT_MAX_RESERVATION_ALLOWED,
}: IAppointmentPickerProps<TAppointmentData>) => {
  const initialSlots = getSlotAppointmentData({
    appointments,
    dateOfWeek,
    from,
    slotDuration,
    to,
  });
  const [slotGroups, setSlotGroups] = useState(initialSlots);
  const appointmentsSelected = slotGroups.flat().reduce((selected, slot) => {
    if (slot.slotType === "AVAILABLE" && slot.isSelected) return selected + 1;
    return selected;
  }, 0);

  const handleSlotClick = (id: string) => {
    let slotGroupCopy = slotGroups.map((slots) =>
      slots.map((slot) => ({ ...slot }))
    );
    let selectedSlotDayIdx: number | undefined = undefined;
    let selectedSlotIdx: number | undefined = undefined;
    slotGroupCopy.forEach((slots, dayIdx) =>
      slots.forEach((slot, slotIdx) => {
        if (slot.slotType === "AVAILABLE" && slot.id === id) {
          selectedSlotDayIdx = dayIdx;
          selectedSlotIdx = slotIdx;
        }
      })
    );

    if (selectedSlotDayIdx === undefined || selectedSlotIdx === undefined)
      return;

    let updatedSlotGroups = slotGroupCopy;
    const selectedSlot = updatedSlotGroups[selectedSlotDayIdx][selectedSlotIdx];

    if (selectedSlot.slotType === "AVAILABLE") {
      // If reservation has reached its limit
      if (
        !selectedSlot.isSelected &&
        appointmentsSelected >= maxReservationAllowed
      ) {
      } else {
        updatedSlotGroups[selectedSlotDayIdx][selectedSlotIdx] = {
          ...selectedSlot,
          isSelected: selectedSlot.isSelected ? false : true,
        };
      }
    }
    setSlotGroups(updatedSlotGroups);
  };

  const totalDuration = findTotalDuration(dateOfWeek, from, to);

  const renderTableTitles = () => {
    return (
      <thead>
        <tr>
          {[...Array(DAYS_IN_WEEK)].map((_, idx) => {
            const slot = slotGroups[idx][0];
            if (slot.slotType === "BLANK") return null;
            return <th>{renderTitle!(slot.startTime)}</th>;
          })}
        </tr>
      </thead>
    );
  };

  const renderTableSlots = () => {
    const slotsPerDay = slotGroups[0].length;
    return [...Array(slotsPerDay)].map((_, slotIdx) => (
      <tr>
        {[...Array(DAYS_IN_WEEK)].map((_, dayIdx) => {
          const slot = slotGroups[dayIdx][slotIdx];
          if (!slot) return null;
          if (slot.slotType === "BLANK") return null;
          return (
            <td rowSpan={slot.slotSpan ?? 1}>
              {renderSlot(slot, handleSlotClick)}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <table className={`appointment-table ${className}`}>
      {renderTitle && renderTableTitles()}
      <tbody>{renderTableSlots()}</tbody>
    </table>
  );
};

export default AppointmentPicker;
