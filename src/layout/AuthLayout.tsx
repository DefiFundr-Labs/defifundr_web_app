import { Outlet } from "react-router-dom";
import AuthNavbar from "../common/Navbar"; // Your auth navbar
import AuthFooter from "../common/Footer"; // Your auth footer

export default function AuthLayout() {
  return (
    <div className="">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
