import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoutePaths } from "./routesPath";

import SignIn from "../pages/auth/SignIn";
import AuthLayout from "../layout/auth";
import Guide from "../pages/guide";
import GuestLayout from "../layout/guest";

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
        path: "guide",
        element: <Guide />,
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
