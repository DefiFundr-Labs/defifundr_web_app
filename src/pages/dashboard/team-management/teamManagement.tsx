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

  const activeEmployees = dummyEmployees.filter((emp) => emp.active).length;
  const activePercentage = (activeEmployees / dummyEmployees.length) * 100;

  const { showCustomModal } = useModal();
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
                <div className="w-full p-4 bg-white rounded dark:bg-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center overflow-hidden rounded-md size-14 dark:bg-gray-800 bg-primary-500">
                      <Profile />
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-gray-300">
                        Total number
                      </p>
                      <p className="text-2xl font-bold text-gray-500 md:text-4xl dark:text-gray-150">
                        {dummyEmployees.length} employees
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <p className="order-2 text-sm font-medium text-right text-gray-300 md:order-1">
                      Active:{" "}
                      <span className="text-gray-700">
                        {activeEmployees} employees
                      </span>
                    </p>
                    <div className="relative order-1 w-full h-2 overflow-hidden rounded-full bg-primary-500 dark:bg-primary-50 md:order-2">
                      <div
                        className="absolute h-full rounded-full bg-primary-200"
                        style={{ width: `${activePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-gray-600 dark:text-gray-150">
                  {selectedTab}
                </p>
                <div className="flex items-center w-full gap-1 max-w-85">
                  <div className="flex justify-between w-full px-4 py-2 bg-white rounded-2xl h-9 dark:bg-gray-600">
                    <input
                      type="search"
                      className="w-full text-xs text-gray-400 outline-none dark:text-gray-300"
                      placeholder="Search by name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchIcon />
                  </div>
                  <button
                    onClick={showModal}
                    className="flex items-center justify-center bg-white border rounded cursor-pointer w-9 h-9 border-gray-150 dark:bg-gray-600 dark:border-gray-600"
                  >
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
