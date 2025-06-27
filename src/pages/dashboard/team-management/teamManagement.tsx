// teamManagement.tsx - Updated to use structured data
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import EmployeesManagement from "../../../components/dashboard/team-management/EmployeesManagement";
import TimeTrackingTabContent from "../../../components/dashboard/team-management/timeTracking/TimeTrackingTabContent";
import TimeOffTable from "../../../components/dashboard/team-management/timeOff/TimeOffTable";
import ExpenseTable from "../../../components/dashboard/team-management/expense/ExpenseTable";

// Import the structured data
import { timeSheetRecords } from "../../../data/timeSheetRecords";
import { timeOffRequests } from "../../../data/timeOff";
import { expenseRecords } from "../../../data/expenseRecords";
import MileStone from "../../../components/dashboard/team-management/milestone/MileStone";

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
      case tabs[0]: // Employees
        return <EmployeesManagement />;
      case tabs[1]: // Time tracking
        return <TimeTrackingTabContent timeSheetRecords={timeSheetRecords} />;
      case tabs[2]: // Time tracking
        return <MileStone timeSheetRecords={expenseRecords} />;
      case tabs[3]: // Time off
        return <TimeOffTable timeSheetRecords={timeOffRequests} />;
      case tabs[4]: // Expense
        return <ExpenseTable timeSheetRecords={expenseRecords} />;
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
