import { AccountOption } from "../types/types";

export const accountTypeOptions: AccountOption[] = [
  {
    id: "business",
    title: "Business",
    description: "For companies and organizations managing business operations",
    // icon: businessIcon,
  },
  {
    id: "freelancer",
    title: "Freelancer",
    description: "For independent contractors and self-employed professionals",
    // icon: freelancerIcon,
  },
  {
    id: "employee",
    title: "Employee/Contractor",
    description: "For individuals working within an organization",
    // icon: employeeIcon,
  },
];

export const AUTH_STEPS = {
  CREATE_ACCOUNT: 1,
  CREATE_PASSWORD: 2,
  ACCOUNT_TYPE: 3,
  BUSINESS_INFO: 4,
} as const;
