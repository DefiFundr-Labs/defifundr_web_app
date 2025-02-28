import { createBrowserRouter } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";
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
      
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />, // Separate layout for authentication pages
    children: [
      {
         path: "signin",
         element: <SignIn />
       },
    ],
  },
  
]);
