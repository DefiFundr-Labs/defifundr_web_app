import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Contracts from "../../components/dashboard/contracts/Contracts";
import Employees from "../../components/dashboard/contracts/Employees";
import { Plus } from "lucide-react";
import Tabs from "../../components/dashboard/Tabs";
import { contractsData } from "../../utils/constant";

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
            className="flex-1 flex flex-col space-y-4"
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
            className="flex-1 flex flex-col space-y-4"
          >
            <Employees />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col ">
      {/* // <div className=" flex flex-col h-[inherit] relative"> */}
      <section className="sticky top-0 z-20 pt-6 border-gray-150 dark:border-gray-250 border-b px-4 bg-white dark:bg-transparent">
        <div className="mb-3 flex items-center  justify-between text-white">
          <span>
            <p className="text-gray-300 font-medium text-xs mb-1">Overview</p>

            <h1 className="font-bold text-4xl text-gray-600 dark:text-white">
              Team Contracts
            </h1>
          </span>

          <button
            className={
              "hidden lg:flex items-center rounded-full bg-primary-200 h-10 gap-1 px-4 transform-all ease-linear hidden " +
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
      </section>
      <AnimatePresence mode="wait">
        <div className="p-4 space-y-4  h-full flex-1 w-full flex flex-col">
          {((selectedTab === detailsTab[0] && contractsData.length === 0) ||
            selectedTab === detailsTab[1]) && (
            <motion.div
              key="employees"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="p-6 lg:p-8 relative rounded-lg bg-primary-200 backdrop-blur-xs overflow-hidden "
            >
              <div>
                <p className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                  Create your first contract{" "}
                </p>
                <p className="font-medium text-sm text-primary-500 mb-7">
                  You're one step away! Set up your first contract and start
                  managing payroll.
                </p>

                <button className="h-10 rounded-full flex  items-center px-4 text-primary-200 bg-white font-medium text-sm">
                  New contract
                </button>
              </div>

              {/* background gradient */}
              <div className="absolute w-[1191px] h-[1044.5px] top-[calc(50%-1044.5px/2+38.75px)] right-[-634px]">
                <div className="rectangle hidden xl:block left-[-141px] top-[14.72px]"></div>
                <div className="rectangle hidden xl:block left-[2%] top-3.5"></div>
                <div className="rectangle left-[29%] xl:left-[17%] top-3.5"></div>
                <div className="rectangle left-[39%] xl:left-[33%] top-[71.21px]"></div>
                <div className="rectangle left-[43%] top-[-14.19px]"></div>
              </div>
              <div className="inset-0 -z-1 absolute inset-0  bg-gradient-rectangle"></div>
            </motion.div>
          )}

          <section className=" flex flex-col flex-1 overflow-hidden">
            {renderContent()}
          </section>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TeamContracts;
