import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import AuthLayout from "../layout/auth";
import DashboardLayout from "../layout/dashboard";
import SignIn from "../pages/auth/signin";
import Guide from "../pages/guide";
import GuestLayout from "../layout/guest";

import { ForgotPassword } from "../pages/auth/forgotPassword";
import CreateAccount from "../pages/auth/createAccount";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { VerifyEmail } from "../pages/auth/verifyEmail";
import { ResetPasswordOtp } from "../pages/auth/ResetpasswordOtp";
import { CreatePassword } from "../pages/auth/CreatePassword";
import { CreateBusinessDetail } from "../pages/auth/createBusinessDetails";
import SelectAccountType from "../pages/auth/selectAccountType";

// Dashboard page components
import Dashboard from "../pages/dashboard/home";
import Contract from "../pages/dashboard/contract/contract";
// import CreateCompliance from "../pages/dashboard/contract/createCompliance";
import TeamContracts from "../pages/dashboard/teamContracts";
import EmployeeDetails from "../pages/dashboard/employeeDetails";
import TeamManagement from "../pages/dashboard/team-management/teamManagement";
import EmployeeManagementDetails from "../pages/dashboard/team-management/employeeManagementDetails";
import Invoices from "../pages/dashboard/invoices";
import TimeTrackingDetails from "../pages/dashboard/team-management/timeTrackingDetails";
import Expense from "../pages/dashboard/team-management/expense";
import TimeOffDetails from "../pages/dashboard/team-management/timeOffDetails";
import MileStone from "../pages/dashboard/team-management/mileStonesDetails";
import NotFound from "../pages/notFound/notFound";
import { CreateContract } from "../pages/dashboard/contract/createContract";
import InvoiceDetails from "../pages/dashboard/invoiceDetails";

import Payroll from "../pages/dashboard/payroll/payroll";
import EmployeePayoutDetails from "../components/dashboard/payroll/EmployeePayoutDetails";
import Settings from "../pages/dashboard/settings/settings";
import ManageCompanyInformation from "../pages/dashboard/settings/company/manageCompanyInformation";
import ManageBillingAddress from "../pages/dashboard/settings/company/manageBillingAddress";
import ManageRegisteredAddress from "../pages/dashboard/settings/company/manageRegisteredAddress";
import ManagePermissions from "../pages/dashboard/settings/permissions/managePermissions";
import AddTemplate from "../pages/dashboard/settings/template/addTemplate";
import ProfileSettings from "../pages/dashboard/profile-settings/profileSettings";
import EditProfile from "../pages/dashboard/profile-settings/profile/editProfile";
import TwoFASetup from "../pages/dashboard/profile-settings/profile/twoFASetup";
import ScanQRCode from "../pages/dashboard/profile-settings/profile/scanQRCode";
import VerifyTwoFACode from "../pages/dashboard/profile-settings/profile/verifyTwoFACode";
import VerifyTwoFAEmail from "../pages/dashboard/profile-settings/profile/verifyTwoFAEmail";
import TemplateDetails from "../pages/dashboard/settings/template/templateDetails";
import EditTemplate from "../pages/dashboard/settings/template/editTemplate";

// import { ReviewSign } from "../pages/dashboard/contract/reviewAndSign";

export const router = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <Navigate to="/auth/signin" replace />, // Redirect root to sign in
  },

  {
    path: "/auth",
    element: <AuthLayout />, // Separate layout for authentication pages
    children: [
      {
        path: RoutePaths.SIGNIN,
        element: <SignIn />,
      },
      {
        path: RoutePaths.CREATE_PASSWORD,
        element: <CreatePassword />,
      },
      {
        path: RoutePaths.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: RoutePaths.RESET_OTP,
        element: <ResetPasswordOtp />,
      },
      {
        path: RoutePaths.RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: RoutePaths.VERIFY_EMAIL,
        element: <VerifyEmail />,
      },
      {
        path: RoutePaths.CREATE_ACCOUNT,
        element: <CreateAccount />,
      },
      {
        path: RoutePaths.CREATE_BUSINESS_DETAIL,
        element: <CreateBusinessDetail />,
      },
      {
        path: RoutePaths.SELECT_ACCOUNT_TYPE,
        element: <SelectAccountType />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "team-contracts",
        element: <TeamContracts />,
      },
      {
        path: "team-contract",
        element: <Contract />,
      },
      {
        path: RoutePaths.CREATE_CONTRACT,
        element: <CreateContract />,
      },
      {
        path: "employee-details",
        element: <EmployeeDetails />,
      },
      {
        path: RoutePaths.TEAM_MANAGEMENT,
        element: <TeamManagement />,
      },
      {
        path: `${RoutePaths.TEAM_MANAGEMENT_EMPLOYEE}/:id`,
        element: <EmployeeManagementDetails />,
      },
      {
        path: `${RoutePaths.TEAM_MANAGEMENT_TIME_TRACKING}/:id`,
        element: <TimeTrackingDetails />,
      },
      {
        path: `${RoutePaths.TEAM_MANAGEMENT_MILESTONE}/:id`,
        element: <MileStone />,
      },
      {
        path: `${RoutePaths.TEAM_MANAGEMENT_TIME_OFF}/:id`,
        element: <TimeOffDetails />,
      },
      {
        path: `${RoutePaths.TEAM_MANAGEMENT_EXPENSE}/:id`,
        element: <Expense />,
      },
      {
        path: RoutePaths.INVOICES,
        element: <Invoices />,
      },
      {
        path: RoutePaths.PAYROLL,
        element: <Payroll />,
      },
      {
        path: `${RoutePaths.PAYROLL_EMPLOYEE_DETAILS}/:id`,
        element: <EmployeePayoutDetails />,

      },
      {
        path: RoutePaths.SETTINGS,
        children: [
          {
            index: true,
            element: <Settings />,
          },
          {
            path: `${RoutePaths.COMPANY_INFORMATION_SETTINGS}/:id?`,
            element: <ManageCompanyInformation />,
          },
          {
            path: `${RoutePaths.BILLING_ADDRESS_SETTINGS}/:id?`,
            element: <ManageBillingAddress />,
          },
          {
            path: `${RoutePaths.REGISTERED_ADDRESS_SETTINGS}/:id?`,
            element: <ManageRegisteredAddress />,
          },
          {
            path: `${RoutePaths.PERMISSIONS_SETTINGS}/:id?`,
            element: <ManagePermissions />,
          },

          {
            path: RoutePaths.TEMPLATE_SETTINGS,
            element: <AddTemplate />,
          },
          {
            path: `${RoutePaths.EDIT_TEMPLATE_SETTINGS}/:id`,
            element: <EditTemplate />,
          },
          {
            path: `${RoutePaths.TEMPLATE_SETTINGS}/:id`,
            element: <TemplateDetails />,
          },
        ],
      },
      {
        path: RoutePaths.PROFILE_SETTINGS,
        children: [
          {
            index: true,
            element: <ProfileSettings />,
          },
          {
            path: RoutePaths.EDIT_PROFILE_SETTINGS,
            element: <EditProfile />,
          },
          {
            path: RoutePaths.TWO_FA_SETTINGS,
            element: <TwoFASetup />,
          },
          {
            path: RoutePaths.SCAN_TWO_FA_QR_CODE_SETTINGS,
            element: <ScanQRCode />,
          },
          {
            path: RoutePaths.VERIFY_TWO_FA_SETTINGS,
            element: <VerifyTwoFACode />,
          },
          {
            path: RoutePaths.VERIFY_TWO_FA_EMAIL_SETTINGS,
            element: <VerifyTwoFAEmail />,
          },
        ],


      },
      {
        path: `${RoutePaths.PAYROLL_EMPLOYEE_DETAILS}/:id`,
        element: <EmployeePayoutDetails />,
      }
      // {
      //   path: "create-compliance",
      //   element: <CreateCompliance />,
      // },
      // {
      //   path: "contract/review-and-sign",
      //   element: <ReviewSign />,
      // },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: RoutePaths.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />, // Separate layout for guest pages
    children: [
      {
        path: "guide",
        element: <Guide />,
      },
    ],
  },
]);
