import { createBrowserRouter } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";
import BusinessDetailsScreen from "../pages/BusinessDetailsScreen";

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
    ],
  },
]);
