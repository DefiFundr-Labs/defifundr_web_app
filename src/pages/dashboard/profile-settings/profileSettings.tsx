import { useEffect, useState } from "react";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import { useSearchParams } from "react-router-dom";
import Profile from "./profile/profile";
import { AnimatePresence, motion } from "framer-motion";
import Preferences from "./Preferences";
import Notification from "./notification";

const tabs = ["Settings", "Preferences", "Notifications"];

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const ProfileSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    if (tabFromUrl)
      setSelectedTab(tabs.includes(tabFromUrl) ? tabFromUrl : tabs[0]);
    else {
      setSelectedTab(tabs[0]);
      setSearchParams({ tab: tabs[0] });
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab: string): void => {
    setSelectedTab(tab);
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case tabs[0]:
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
            <Profile />
          </motion.div>
        );
      case tabs[1]:
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
            <Preferences />
          </motion.div>
        );
      case tabs[2]:
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
            <Notification />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      <TitleHeader
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={handleTabChange}
        title="Profile settings"
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

export default ProfileSettings;
