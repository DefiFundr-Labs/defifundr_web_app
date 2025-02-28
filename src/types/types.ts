import { ReactNode } from "react";

export interface IOnboardingLayout {
  children: ReactNode;
}

export type AccountType = "business" | "freelancer" | "employee";

export interface AccountOption {
  id: AccountType;
  title: string;
  description: string;
  icon: string;
}
