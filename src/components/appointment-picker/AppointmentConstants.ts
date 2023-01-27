// slot duration is in minutes
export const DEFAULT_SLOT_DURATION = 30;

export const DAYS_IN_WEEK = 7;
export const MIN_IN_HOURS = 60;
export const WARNINGS = {
  APPOINTMENT_ON_SAME_TIME: `Appointment starting on the same time. Later ones will be ignored`,
  DATE_OUT_OF_WEEK: `Date doesn't fall in the weeks range`,
  SLOT_DURATION_NOT_A_FACTOR_OF_TOTAL_DURATION:
    "SlotDuration should divide totalDuration into equal slots. Make sure SlotDuration is a factor of Total Duration",
  INVALID_FROM_AND_TO: "From date should occur before to date",
};

export const DATE_TIME_FORMAT = "YYYY-MM-DD[T]HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";

export const DEFAULT_START_HOUR = 0;
export const DEFAULT_END_HOUR = 24;

export const DEFAULT_MAX_RESERVATION_ALLOWED = 3;
