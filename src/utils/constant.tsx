import { CalendarCheckIcon, Dollar, DollarCircle } from "../assets/svg/svg";
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

export const MetricsData = [
  {
    title: "Completed contracts",
    value: "12",
    subValue: "10 employees",
    icon: <CalendarCheckIcon />,
  },
  {
    title: "Active contracts",
    value: "04",
    subValue: "04 employees",
    icon: <CalendarCheckIcon />,
  },
  {
    title: "Average Salary per Contract",
    value: "$7,200.00",
    subValue: "12 contracts",
    icon: <Dollar />,
  },
  {
    title: "Total Locked in Escrow",
    value: "$20,200.00",
    subValue: "04 contracts",
    icon: <DollarCircle />,
  },
];

export const contractsData = [
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "In Review",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Rejected",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Active",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Active",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
  {
    title: "Insyder Website & Webapp Design",
    amount: 6000,
    period: "25th Oct 22 - 25th Nov 22",
    status: "Completed",
  },
];
 
