import { Outlet } from "react-router";

interface GuestLayoutProps {
  children?: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div>
      {/* <Navbar /> */}

      <div className="">{children ? children : <Outlet />}</div>

      {/* <Footer /> */}
    </div>
  );
}
