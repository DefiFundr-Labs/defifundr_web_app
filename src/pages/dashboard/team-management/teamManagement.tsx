import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import EmployeesManagement from "../../../components/dashboard/team-management/EmployeesManagement";
import TimeTrackingTabContent from "../../../components/dashboard/team-management/timeTracking/TimeTrackingTabContent";
import { timeSheetRecords } from "../../../data/timeSheetRecords";

const tabs = ["Employees", "Time tracking", "Milestone", "Time off", "Expense"];

const TeamManagement: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<string>(
    tabs.includes(tabFromUrl as any) ? tabFromUrl! : tabs[0]
  );

  const handleTabChange = (tab: string): void => {
    setSelectedTab(tab);
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case tabs[0]:
        return <EmployeesManagement />;
      case tabs[1]:
        return <TimeTrackingTabContent timeSheetRecords={timeSheetRecords} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500">
      <TitleHeader
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={handleTabChange}
        title="Team Management"
        isBackButton={false}
        isTabs
      />

      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
};

export default TeamManagement;
