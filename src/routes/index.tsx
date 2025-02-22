import { createBrowserRouter, Outlet } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";
import { AccountSelection } from "../pages/accountType";
import { OnboardingLayout } from "../layout/onboardingLayout";

export const router = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <GuestLayout />,
    children: [
      {
        path: RoutePaths.ROOT,
        element: <Home />,
      },
    ],
  },
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
    ],
  },
]);
