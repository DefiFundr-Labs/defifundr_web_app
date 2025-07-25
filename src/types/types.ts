import { JSX, ReactNode } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  Control,
  RegisterOptions,
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
  validationRules?: RegisterOptions<T, Path<T>>;
  labelClass?: string;
  readOnly?: boolean;
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
  validationRules?: RegisterOptions<T, Path<T>>;
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
  email?: string; // Optional
  phone?: string; // Optional
  address?: string; // Optional
  network?: string; // Optional - only for time tracking
  frequency?: string; // Optional - only for time tracking
  rate?: string;
  totalHours?: string;
  totalMinutes?: string;
  totalAmount?: string;
  paidIn?: string;
  status: "Pending" | "Approved" | "Rejected";
  submitted: string;
  description: string;
  attachment: string;
  submittedOn: string;
  dateRange: string;
  startDate: string; // Optional - for time tracking
  endDate: string; // Optional - for time tracking
  rejectionReason: string;
  leaveType?: string;
  paid?: boolean;

  contract: {
    client: string;
    paymentType: string;
    contractType: string; // e.g., "Fixed rate", "Pay as you go", "Milestone"
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
  type: string;
}

// Enhanced milestone and contract types
export type MilestoneDetails = {
  id: number;
  title: string;
  amount: string;
  description?: string;
  dueDate?: string;
  deliverables?: string;
  createdAt: string;
  updatedAt?: string;
};

export type EmployeeDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
};
export type ComplianceDetails = {
  agreement: File | null;
  additionalAgreement?: string;
  agreementType: string;
};
export type ContractDetails = {
  startDate: string;
  endDate?: string;
  noticePeriod: number;
  paymentDetails: PaymentDetails;
  invoiceDetails: InvoiceDetails;
  firstInvoice: FirstInvoice;
  taxDetails?: TaxDetails;
  milestoneDetails: MilestoneDetails[];
  requireDeposit?: boolean;
  rateUnit?: string;
  totalMilestoneAmount?: string;
  completedMilestones?: number;
};

export type PaymentDetails = {
  network: string;
  asset: string;
  amount: string;
};

export type InvoiceDetails = {
  invoiceFrequency: string;
  issueInvoiceOn: string;
  paymentDue: string;
};

export type FirstInvoice = {
  type: "full" | "custom";
  date?: string;
  amount?: string;
};

export type TaxDetails = {
  taxType: string;
  accountNumber: string;
  taxRate: string;
};

export interface CreateContractFormProps {
  contractType: "fixed rate" | "pay as you go" | "milestone";
  projectType: "freelancer" | "contractor";
  projectTitle: string;
  jobRole: string;
  scope: string;
  employeeDetails: EmployeeDetails[];
  contractDetails: ContractDetails;
  complianceDetails: ComplianceDetails[];
  formStep: number;
  isFormValid: boolean;
  lastUpdated: string;
}

export type JobScopeProps = {
  jobRole: string;
  scope: string;
};

// Modal related types for milestone management
export interface ModalButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  className?: string;
}

export interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (milestone: Partial<MilestoneDetails>) => void;
  editingMilestone?: MilestoneDetails | null;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationState {
  isValid: boolean;
  errors: ValidationError[];
  touchedFields: string[];
}

// Contract form step types
export type ContractFormStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface StepValidation {
  step: ContractFormStep;
  isValid: boolean;
  requiredFields: string[];
  completedFields: string[];
}

// Enhanced form state management
export interface FormStateManager {
  currentStep: ContractFormStep;
  maxCompletedStep: ContractFormStep;
  stepValidations: Record<ContractFormStep, StepValidation>;
  isDirty: boolean;
  lastSaved: string;
}

// Milestone status tracking
export interface MilestoneProgress {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  cancelled: number;
  totalAmount: number;
  completedAmount: number;
  progressPercentage: number;
}

// Contract summary for review step
export interface ContractSummary {
  basicInfo: {
    contractType: string;
    projectTitle: string;
    jobRole: string;
    startDate: string;
    endDate?: string;
  };
  paymentInfo: {
    network: string;
    asset: string;
    totalAmount: string;
    paymentStructure: string;
  };
  employeeInfo: EmployeeDetails;
  milestoneInfo?: MilestoneProgress;
  complianceInfo: ComplianceDetails;
  estimatedCompletion?: string;
}

export type InvoiceStatus = "Pending" | "Paid" | "Approved" | "Rejected";

export type InvoiceTableCell = {
  status?: InvoiceStatus;
  text?: string;
  icon?: JSX.Element;
  iconLabel?: string;
};
export interface InvoiceDetailTableProps {
  headers: string[];
  body: [InvoiceTableCell, InvoiceTableCell];
}
