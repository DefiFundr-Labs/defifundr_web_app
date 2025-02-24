import { createBrowserRouter } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";
import CreatePassword from "../pages/create-password";
import AuthLayout from "../layout/authLayout";

export const router = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <GuestLayout />,
    children: [
      {
        path: RoutePaths.CREATE_PASSWORD,
        element: <Home />,
      },

    ],
  },
  {
    path: RoutePaths.AUTH,
    element: <AuthLayout />,
    children: [
      {
        path: RoutePaths.CREATE_PASSWORD,
        element: <CreatePassword />,
      },
    ],
  },
]);
