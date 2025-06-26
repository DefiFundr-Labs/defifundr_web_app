import { Link, useLocation, useNavigate } from "react-router-dom";
import type { FC } from "react";
import { sidebarRoutes } from "./SidebarItems";
import { SidebarLinkProps, SidebarProps } from "../../types/common";
import { Logo } from "../../assets/svg/svg";
import { RoutePaths } from "../../routes/routesPath";

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const SidebarLink: FC<SidebarLinkProps> = ({
    to,
    icon,
    name,
    toggleSidebar,
  }) => {
    // Enhanced active logic for nested routes
    const isActive = (() => {
      // For dashboard root, only match when pathname is exactly "/dashboard"
      if (to === RoutePaths.DASHBOARD) {
        return location.pathname === RoutePaths.DASHBOARD;
      }

      // For other routes, check if current path starts with the route path
      // This will make the sidebar item active for nested routes
      return location.pathname.startsWith(to);
    })();

    return (
      <li className="w-full">
        <Link
          to={to}
          onClick={toggleSidebar}
          className={`
        group w-full h-10 py-3 px-4 flex items-center gap-3 text-gray-400 rounded-full transition ease-in duration-200
        ${
          isActive
            ? "dark:text-black text-white font-medium dark:bg-white bg-black border border-gray"
            : "dark:hover:bg-white hover:bg-black dark:hover:text-black hover:text-white"
        }
      `}
        >
          <span
            className={`
        ${
          isActive
            ? "text-primary-200"
            : "text-gray-300 group-hover:text-primary-200"
        }
      `}
          >
            {icon}
          </span>
          <span className="text-sm font-medium">{name}</span>
        </Link>
      </li>
    );
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(RoutePaths.ROOT);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[98] bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-[99] w-[230px] dark:bg-gray-600 bg-white h-screen border-r dark:border-[#2E2E38] border-gray-150 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo section - fixed at top */}
        <div className="flex items-center justify-between px-6 pt-6 shrink-0">
          <Logo />
          <button className="lg:hidden" onClick={toggleSidebar}>
            <div
              className="flex flex-col items-center lg:hidden"
              aria-label="Toggle Sidebar"
            >
              <span className="block rotate-45 translate-y-0.5 h-0.5 w-5 dark:bg-white bg-black transition-all duration-300 ease-in-out" />
              <span className="block -rotate-45 -translate-y-0.5 h-0.5 w-5 dark:bg-white bg-black transition-all duration-300 ease-in-out" />
            </div>
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex flex-col justify-between flex-1 min-h-0 gap-8 mt-8 pb-7">
          {/* This div will be scrollable */}
          <div className="flex-1 px-4 overflow-y-auto scrollbar-hide">
            {/* Main Menu header */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-xs font-medium text-gray-300">MENU</p>
            </div>
            <ul className="w-full space-y-2">
              {/* Dashboard item */}
              {sidebarRoutes.map((route, index) => (
                <SidebarLink
                  key={`${route.name}-${index}`}
                  icon={route.icon}
                  name={route.name}
                  to={route.path}
                  toggleSidebar={toggleSidebar}
                />
              ))}
            </ul>
          </div>
          <div className="flex flex-col mt-auto">
            {/* <div className="w-full px-4">
              <ConnectWallet />
            </div> */}
            {/* Footer section - fixed at bottom */}
            <div className="w-full px-4">
              <button
                onClick={handleLogout}
                className="hover:cursor-pointer text-dark font-medium text-xs h-[38px] py-2.5 hover:text-primary transition ease-in duration-200 px-3 flex items-center gap-3 mb-11"
              >
                {/* <LogOutIcon /> */}
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
