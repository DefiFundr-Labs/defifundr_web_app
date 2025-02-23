import { createBrowserRouter } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";
import EmailVerification from "../pages/verify-email";


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
      }
    ],
  },
]);
