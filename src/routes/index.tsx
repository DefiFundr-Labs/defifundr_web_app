import { createBrowserRouter } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";

import BusinessDetailsScreen from "../pages/BusinessDetailsScreen";

import EmailVerification from "../pages/verify-email";

import { accountTypesRoutes } from "./modules";
import AccountCreationPage from "../common/AccountCreationPage";

import SignIn from "../pages/auth/SignIn";
import AuthLayout from "../layout/AuthLayout";
import CreatePassword from "../pages/auth/Create-password";
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
      {

        path: "/business",
        element: <BusinessDetailsScreen />,
      },
      {
        path: RoutePaths.VERIFY_EMAIL,
        element: <EmailVerification />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "create-account",
        element: <AccountCreationPage />,

      },
      {
        path: "create-password",
        element: <CreatePassword />,
      },
    ],
  },
  ...accountTypesRoutes,
]);
