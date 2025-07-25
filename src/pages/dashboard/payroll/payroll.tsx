// teamManagement.tsx - Updated to use structured data
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import PayoutHistory from "../../../components/dashboard/payroll/PayoutHistory";
import OverviewTabContent from "../../../components/dashboard/payroll/overview/OverviewTabContent";

const tabs = ["Overview", "Payout history"];

const Payroll: React.FC = () => {
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
        return <OverviewTabContent />;
      case tabs[1]: // Time tracking
        return <PayoutHistory />;
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
        title="Payroll"
        isBackButton={false}
        isTabs
      />

      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
};

export default Payroll;