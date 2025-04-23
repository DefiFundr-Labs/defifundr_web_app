import { createBrowserRouter, Navigate } from "react-router-dom";
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
    element: <Navigate to="/auth/signin" replace />, // Redirect root to sign in
  },
  {
    path: "/home", // Move home to its own path
    element: <GuestLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: RoutePaths.VERIFY_EMAIL,
    element: <GuestLayout />,
    children: [
      {
        path: "",
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
