import { ReactNode } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { OtpSchemaType } from "../utils/schema";

export interface IOnboardingLayout {
  children?: ReactNode;
}

export type AccountType = "business" | "freelancer" | "employee";

export interface AccountOption {
  id: AccountType;
  title: string;
  description: string;
  // icon: string;
}

export interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  className?: string;
  touched?: boolean;
}

export interface FormSelectInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
  options: string[];
  touched?: boolean;
  placeholder?: string;
}

export interface OtpInputProps {
  control: Control<OtpSchemaType>;
  error?: FieldError;
}

export interface FormPrivacyProps<T extends FieldValues> {
  id: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  touched?: boolean;
}

export interface DashBoardTitleHeaderProps {
  title: string;
  isBackButton?: boolean;
  isTabs?: boolean;
  tabs?: string[];
  selectedTab?: string;
  setSelectedTab?: (tab: string) => void;
  isAddButton?: boolean;
}

// Updated TimeSheetRecord interface to match your data structure
export interface TimeSheetRecord {
  id: number;
  employeeName: string;
  profileImage: string;
  role: string;
  rate?: string; // Optional - only for time tracking
  totalHours?: string; // Optional - not present in time off requests
  totalMinutes?: string; // Optional
  totalAmount?: string; // Optional - only for time tracking
  paidIn?: string; // Optional
  status: "Pending" | "Approved" | "Rejected";
  submitted: string;
  description: string;
  attachment: string;
  submittedOn: string;
  dateRange: string;
  rejectionReason: string;

  // Extended properties for time off and other types
  leaveType?: string; // e.g., Sick Leave, Vacation, etc.
  paid?: boolean; // For Time Off: Paid or unpaid leave

  contract: {
    client: string;
    paymentType: string;
    contractLink: string;
  };

  contractor: {
    name: string;
    position: string;
    detailLink: string;
  };
}

export interface TimeTrackingTabContentProps {
  timeSheetRecords: TimeSheetRecord[];
}

export interface RecordDetails {
  records: TimeSheetRecord;
  type: string; // "timeSheet" | "timeOff" | "expense" | "milestone"
}
