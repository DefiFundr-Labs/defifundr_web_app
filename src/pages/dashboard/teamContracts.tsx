import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Contracts from "../../components/dashboard/contracts/Contracts";
import Employees from "../../components/dashboard/contracts/Employees";
import { contractsData } from "../../utils/constant";
import TitleHeader from "../../common/dashboard/TitleHeader";

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
    <div className="flex flex-col flex-1 ">
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
            selectedTab === detailsTab[1]) && (
            <motion.div
              key="employees"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="relative p-6 overflow-hidden rounded-lg lg:p-8 bg-primary-200 backdrop-blur-xs "
            >
              <div>
                <p className="mb-2 text-2xl font-bold text-white lg:text-3xl">
                  Create your first contract{" "}
                </p>
                <p className="text-sm font-medium text-primary-500 mb-7">
                  You're one step away! Set up your first contract and start
                  managing payroll.
                </p>

                <button className="flex items-center h-10 px-4 text-sm font-medium bg-white rounded-full text-primary-200">
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
              <div className="absolute inset-0 -z-1 bg-gradient-rectangle"></div>
            </motion.div>
          )}

          <section className="flex flex-col flex-1 overflow-hidden ">
            {renderContent()}
          </section>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TeamContracts;
