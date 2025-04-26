import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoutePaths } from "./routesPath";

import SignIn from "../pages/auth/SignIn";
import AuthLayout from "../layout/auth";

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
    ],
  },
]);
