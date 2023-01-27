import { ReactNode } from "react";

interface ISlotCommonData {
  startTime: Date;
  endTime: Date;
  duration: number;
  id: string;
  slotSpan?: number;
}

export interface IReqAppointmentData {
  appointmentTime: Date;
  appointmentDuration: number;
}

interface TReservedSlotData<TAppointmentData extends IReqAppointmentData = any>
  extends ISlotCommonData {
  slotType: "RESERVED";
  appointmentData: TAppointmentData;
}

interface IAvailableSlotData extends ISlotCommonData {
  slotType: "AVAILABLE";
  isSelected?: boolean;
}

interface IBlankSlotData {
  slotType: "BLANK";
}

export type TSlotData<TAppointmentData extends IReqAppointmentData = any> =
  | TReservedSlotData<TAppointmentData>
  | IAvailableSlotData;

export type TInternalSlotData<
  TAppointmentData extends IReqAppointmentData = any
> = IBlankSlotData | TSlotData<TAppointmentData>;

export interface IGetSlotOnDateArgs<
  TAppointmentData extends IReqAppointmentData = any
> {
  date: Date;
  appointmentsByTime: Map<string, TAppointmentData>;
  slotDuration: number;
  from: IRangeTime;
  to: IRangeTime;
}

export interface IRangeTime {
  hours: number;
  minutes?: number;
}

export interface IGetSlotAppointmentDateArgs<
  TAppointmentData extends IReqAppointmentData = any
> {
  appointments: TAppointmentData[];
  dateOfWeek: Date;
  slotDuration: number;
  from: IRangeTime;
  to: IRangeTime;
}

export interface IAppointmentPickerProps<
  TAppointmentData extends IReqAppointmentData = any
> extends Omit<IGetSlotAppointmentDateArgs<TAppointmentData>, "slotDuration"> {
  renderSlot(
    slot: TSlotData<TAppointmentData>,
    onClick: (id: string) => void
  ): ReactNode;
  renderTitle?: (date: Date) => ReactNode;
  className?: string;
  slotDuration?: number;
  maxReservationAllowed?: number;
}
