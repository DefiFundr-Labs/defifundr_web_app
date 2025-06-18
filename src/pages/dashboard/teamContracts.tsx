import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Contracts from "../../components/dashboard/contracts/Contracts";
import Employees from "../../components/dashboard/employees/Employees";
import { Plus } from "lucide-react";
import Tabs from "../../components/dashboard/Tabs";
import { contractsData } from "../../utils/constant";
import TitleHeader from "../../common/dashboard/TitleHeader";
import { employees } from "../../data/employeeData";
import CreateContractCard from "../../components/dashboard/contracts/CreateContractCard";

const detailsTab = ["Contracts", "Employees"];

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const TeamContracts = () => {
  const [selectedTab, setSelectedTab] = useState(detailsTab[0]);

  const renderContent = () => {
    switch (selectedTab) {
      case detailsTab[0]:
        return (
          <motion.div
            key="contracts"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1 space-y-4"
          >
            <Contracts />
          </motion.div>
        );
      case detailsTab[1]:
        return (
          <motion.div
            key="employees"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1 space-y-4"
          >
            <Employees />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500">
      {/* // <div className=" flex flex-col h-[inherit] relative"> */}
      {/* <section className="sticky top-0 px-4 pt-6 bg-white border-b z-5 border-gray-150 dark:border-gray-250 dark:bg-transparent">
        <div className="flex items-center justify-between mb-3 text-white">
          <span>
            <p className="mb-1 text-xs font-medium text-gray-300">Overview</p>

            <h1 className="text-4xl font-bold text-gray-600 dark:text-white">
              Team Contracts
            </h1>
          </span>

          <button
            className={
              "hidden lg:flex items-center rounded-full bg-primary-200 h-10 gap-1 px-4 transform-all ease-linear  " +
              "hidden lg:flex items-center rounded-full bg-primary-200 h-10 gap-1 px-4 transform-all ease-linear " +
              (selectedTab === detailsTab[0] ? "opacity-100" : "opacity-0")
            }
          >
            <Plus size={16} className="text-white dark:text-gray-600" />
            New contract
          </button>
        </div>

        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabs={detailsTab}
        />
      </section> */}
      <TitleHeader
        tabs={detailsTab}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isAddButton
        title="Team Contracts"
        isBackButton={false}
        isTabs
      />
      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 w-full h-full p-4 space-y-4">
          {((selectedTab === detailsTab[0] && contractsData.length === 0) ||
            selectedTab === detailsTab[1]) &&
            employees.length === 0 && <CreateContractCard />}

          <section className="flex flex-col flex-1 overflow-hidden ">
            {renderContent()}
          </section>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TeamContracts;
