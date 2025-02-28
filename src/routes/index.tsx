import { createBrowserRouter } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";
import EmailVerification from "../pages/verify-email";

import { accountTypesRoutes } from "./modules";
import AccountCreationPage from "../common/AccountCreationPage";

import SignIn from "../pages/auth/SignIn";
import AuthLayout from "../layout/AuthLayout";

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
        path: RoutePaths.VERIFY_EMAIL,
        element: <EmailVerification />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />, // Separate layout for authentication pages
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "create-account",
        element: <AccountCreationPage />,
      },
    ],
  },
  ...accountTypesRoutes,
]);
