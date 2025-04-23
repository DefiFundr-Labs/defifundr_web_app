import businessIcon from "../assets/svgs/business.svg";
import freelancerIcon from "../assets/svgs/freelancer.svg";
import employeeIcon from "../assets/svgs/employee.svg";
import { AccountOption } from "../types/types";

export const accountTypeOptions: AccountOption[] = [
  {
    id: "business",
    title: "Business",
    description: "For companies and organizations managing business operations",
    icon: businessIcon,
  },
  {
    id: "freelancer",
    title: "Freelancer",
    description: "For independent contractors and self-employed professionals",
    icon: freelancerIcon,
  },
  {
    id: "employee",
    title: "Employee/Contractor",
    description: "For individuals working within an organization",
    icon: employeeIcon,
  },
];
