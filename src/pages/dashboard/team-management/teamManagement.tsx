import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { dummyEmployees } from "../../../utils/constant";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import ManagementTabsContent from "../../../components/dashboard/team-management/ManagementTabsContent";
import { FilterIcon, Profile, SearchIcon } from "../../../assets/svg/svg";
import CreateContractCard from "../../../components/dashboard/contracts/CreateContractCard";
import useModal from "../../../hooks/useModal";
import FilterEmployeeModal from "../../../components/modal/FilterEmployeeModal";

const detailsTab = [
  "Employees",
  "Time tracking",
  "Milestone",
  "Time off",
  "Expense",
];

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const TeamManagement = () => {
  const [selectedTab, setSelectedTab] = useState(detailsTab[0]);
  const [search, setSearch] = useState("");

  const filteredData = dummyEmployees.filter((emp) =>
    `${emp.name} ${emp.job}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
    setSearch("");
  };

  const activeEmployees = dummyEmployees.filter(emp => emp.active).length;
  const activePercentage = (activeEmployees / dummyEmployees.length) * 100;
  
  const { showCustomModal,  } = useModal();
     const showModal = () => {
           showCustomModal(<FilterEmployeeModal />, "lg");
       };
  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500">
      <TitleHeader
        tabs={detailsTab}
        selectedTab={selectedTab}
        setSelectedTab={handleTabSelect}
        title="Team Management"
        isBackButton={false}
        isTabs
      />

      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 w-full h-full p-4 space-y-4">
          {filteredData.length === 0 && <CreateContractCard />}

          <section className="flex flex-col flex-1 overflow-hidden">
            <motion.div
              key={selectedTab}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="flex flex-col flex-1 space-y-4"
            >
              {dummyEmployees.length > 0 && (
                <div className="w-full bg-white dark:bg-gray-600 rounded p-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 dark:bg-gray-800 bg-primary-500 flex items-center justify-center rounded-md overflow-hidden">
                      <Profile />
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm text-gray-300 font-medium">Total number</p>
                      <p className="text-2xl md:text-4xl text-gray-500 dark:text-gray-150 font-bold">
                        {dummyEmployees.length} employees
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <p className="text-sm text-right text-gray-300 font-medium md:order-1 order-2">
                      Active: <span className="text-gray-700">{activeEmployees} employees</span>
                    </p>
                    <div className="w-full h-2 bg-primary-500 dark:bg-primary-50 rounded-full relative overflow-hidden md:order-2 order-1">
                      <div
                        className="absolute h-full bg-primary-200 rounded-full"
                        style={{ width: `${activePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 justify-between items-center">
                <p className="font-semibold text-gray-600 dark:text-gray-150">
                  {selectedTab}
                </p>
                <div className="flex items-center gap-1 w-full max-w-85">
                  <div className="py-2 px-4 flex justify-between bg-white rounded-2xl w-full h-9 dark:bg-gray-600">
                    <input
                      type="search"
                      className="outline-none w-full text-gray-400 dark:text-gray-300 text-xs"
                      placeholder="Search by name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchIcon />
                  </div>
                  <button onClick={showModal} className="cursor-pointer w-9 h-9 border border-gray-150 bg-white rounded flex items-center justify-center dark:bg-gray-600 dark:border-gray-600">
                    <FilterIcon />
                  </button>
                </div>
              </div>

              <ManagementTabsContent data={filteredData} />
            </motion.div>
          </section>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TeamManagement;
