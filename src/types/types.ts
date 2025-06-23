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
