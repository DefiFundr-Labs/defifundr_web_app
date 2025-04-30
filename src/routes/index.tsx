import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import AuthLayout from "../layout/auth";
import SignIn from "../pages/auth/signin";
import Guide from "../pages/guide";
import GuestLayout from "../layout/guest";

import { ResetPasswordOtp } from "../pages/auth/ResetpasswordOtp";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { ForgotPassword } from "../pages/auth/forgotPassword";
import { VerifyEmail } from "../pages/auth/verifyEmail";
import CreateAccount from "../pages/auth/createAccount";

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
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp",
        element: <ResetPasswordOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: RoutePaths.CREATE_ACCOUNT,
        element: <CreateAccount />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />, // Separate layout for authentication pages
    children: [
      {
        path: "guide",
        element: <Guide />,
      },
    ],
  },
]);
