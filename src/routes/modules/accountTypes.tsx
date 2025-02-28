import { Outlet } from "react-router-dom";
import { RoutePaths } from "../routesPath";
import {
  AccountSelection,
  BusinessForm,
  EmployeeForm,
  FreelancerForm,
} from "../../pages/accountType";
import { OnboardingLayout } from "../../layout/onboardingLayout";

export const accountTypesRoutes = [
  {
    path: RoutePaths.ROOT,
    element: (
      <OnboardingLayout>
        <Outlet />
      </OnboardingLayout>
    ),
    children: [
      {
        path: RoutePaths.ACCOUNT_TYPES,
        element: <AccountSelection />,
      },
      {
        path: `${RoutePaths.ACCOUNT_TYPES}/business`,
        element: <BusinessForm />,
      },
      {
        path: `${RoutePaths.ACCOUNT_TYPES}/freelancer`,
        element: <FreelancerForm />,
      },
      {
        path: `${RoutePaths.ACCOUNT_TYPES}/employee`,
        element: <EmployeeForm />,
      },
    ],
  },
];
