import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../common/dashboard/Sidebar";
import Header from "../../common/dashboard/Header";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen ">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col lg:ml-[230px] w-full">
        <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 w-full pt-2 pb-5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
