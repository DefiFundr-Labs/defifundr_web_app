import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TitleHeader from "../../../common/dashboard/TitleHeader";
import Company from "./company";
import AddressBook from "./addressBook";
import Permissions from "./permissions";
import HiringTemplate from "./hiringTemplate";
import { useSearchParams } from "react-router-dom";

const settingsTabs = [
  "Company",
  "Permissions",
  "Hiring templates",
  "Address book",
];

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    if (tabFromUrl)
      setSelectedTab(
        settingsTabs.includes(tabFromUrl) ? tabFromUrl : settingsTabs[0]
      );
    else {
      setSelectedTab(settingsTabs[0]);
      setSearchParams({ tab: settingsTabs[0] });
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab: string): void => {
    setSelectedTab(tab);
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case settingsTabs[0]:
        return (
          <motion.div
            key={selectedTab[0]}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1 space-y-4"
          >
            <Company />
          </motion.div>
        );
      case settingsTabs[1]:
        return (
          <motion.div
            key={selectedTab[1]}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1 space-y-4"
          >
            <Permissions />
          </motion.div>
        );
      case settingsTabs[2]:
        return (
          <motion.div
            key={selectedTab[2]}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1 space-y-4"
          >
            <HiringTemplate />
          </motion.div>
        );
      case settingsTabs[3]:
        return (
          <motion.div
            key={selectedTab[3]}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1 space-y-4"
          >
            <AddressBook />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      <TitleHeader
        tabs={settingsTabs}
        selectedTab={selectedTab}
        setSelectedTab={handleTabChange}
        title="Settings"
        isBackButton={false}
        isTabs
      />

      <AnimatePresence mode="wait">
        <div className="p-4">
          <div className="space-y-4 max-w-4xl w-full">{renderContent()}</div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Settings;
