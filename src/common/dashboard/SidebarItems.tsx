import { SettingsIcon } from "lucide-react";
import {
  BusinessIcon,
  ContractIcon,
  DashboardIcon,
  EditNoteIcon,
  InvoicesIcon,
  PayrollIcon,
} from "../../assets/svg/svg";
import { RoutePaths } from "../../routes/routesPath";

export const sidebarRoutes = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: RoutePaths.DASHBOARD,
  },
  {
    name: "Contracts",
    icon: <EditNoteIcon />,
    path: RoutePaths.CONTRACTS,
  },
  {
    name: "Team Management",
    icon: <ContractIcon />,
    path: RoutePaths.TEAM_MANAGEMENT,
  },
  {
    name: "Payroll",
    icon: <PayrollIcon />,
    path: RoutePaths.PAYROLL,
  },
  {
    name: "Invoices",
    icon: <InvoicesIcon />,
    path: RoutePaths.INVOICES,
  },
  {
    name: "Business",
    icon: <BusinessIcon />,
    path: RoutePaths.BUSINESS,
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    path: RoutePaths.SETTINGS,
  },
];
