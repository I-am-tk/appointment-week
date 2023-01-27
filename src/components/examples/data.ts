import { IReqAppointmentData } from "./../appointment-picker/AppointmentTypes";

type TEligibility = "ELIGIBLE" | "NOT_ELIGIBLE";
type TAppointmentStatus = "CHECK_OUT" | "PENDING";

export interface TAppointmentData extends IReqAppointmentData {
  id: string;
  appointmentType: string;
  providerName: string;
  patientName: string;
  guarantorName: string;
  appointmentStatus: TAppointmentStatus;
  balance: number | null;
  comments: string;
  eligibility: TEligibility;
}

export const DUMMY_APPOINTMENT_DATA: TAppointmentData[] = [
  {
    id: "1",
    appointmentTime: new Date(2023, 0, 22, 7),
    appointmentDuration: 30,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: null,
    comments: "",
    eligibility: "ELIGIBLE",
  },
  {
    id: "2",
    appointmentTime: new Date(2023, 0, 23, 9),
    appointmentDuration: 60,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: 20,
    comments: "",
    eligibility: "NOT_ELIGIBLE",
  },
  {
    id: "3",
    appointmentTime: new Date(2023, 0, 24, 18),
    appointmentDuration: 30,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "PENDING",
    balance: null,
    comments: "",
    eligibility: "NOT_ELIGIBLE",
  },
  {
    id: "4",
    appointmentTime: new Date(2023, 0, 25, 10),
    appointmentDuration: 60,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: 50,
    comments: "",
    eligibility: "ELIGIBLE",
  },
  {
    id: "5",
    appointmentTime: new Date(2023, 0, 26, 15),
    appointmentDuration: 30,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: null,
    comments: "",
    eligibility: "ELIGIBLE",
  },
  {
    id: "6",
    appointmentTime: new Date(2023, 0, 27, 6, 30),
    appointmentDuration: 30,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: null,
    comments: "",
    eligibility: "ELIGIBLE",
  },
  {
    id: "7",
    appointmentTime: new Date(2023, 0, 28, 7, 30),
    appointmentDuration: 60,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: 20,
    comments: "",
    eligibility: "NOT_ELIGIBLE",
  },
  {
    id: "8",
    appointmentTime: new Date(2023, 0, 22, 8),
    appointmentDuration: 30,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "PENDING",
    balance: null,
    comments: "",
    eligibility: "NOT_ELIGIBLE",
  },
  {
    id: "9",
    appointmentTime: new Date(2023, 0, 23, 11),
    appointmentDuration: 60,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: 50,
    comments: "",
    eligibility: "ELIGIBLE",
  },
  {
    id: "10",
    appointmentTime: new Date(2023, 0, 24, 14, 30),
    appointmentDuration: 30,
    appointmentType: "Routine",
    providerName: "Max Smith",
    patientName: "Cavin Mardo",
    guarantorName: "Mark Woh",
    appointmentStatus: "CHECK_OUT",
    balance: null,
    comments: "",
    eligibility: "ELIGIBLE",
  },
];
