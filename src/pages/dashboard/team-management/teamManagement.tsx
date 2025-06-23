import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import EmployeesManagement from "../../../components/dashboard/team-management/EmployeesManagement";

const tabs = ["Employees", "Time tracking", "Milestone", "Time off", "Expense"];

const TeamManagement = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const renderContent = () => {
    switch (selectedTab) {
      case tabs[0]:
        return <EmployeesManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500">
      <TitleHeader
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        title="Team Management"
        isBackButton={false}
        isTabs
      />

      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
};

export default TeamManagement;
