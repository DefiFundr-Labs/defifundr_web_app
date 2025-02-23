import { createBrowserRouter } from "react-router-dom";
import { RoutePaths } from "./routesPath";
import Home from "../pages/home";
import GuestLayout from "../layout";
import AccountCreationPage from "../common/AccountCreationPage";

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
        path: RoutePaths.ACCOUNT_CREATION, // Define the path for account creation
        element: <AccountCreationPage />, // Render the AccountCreation component
      },
    ],
  },
]);
