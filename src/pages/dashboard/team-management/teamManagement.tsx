import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { dummyEmployees } from "../../../utils/constant";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import ManagementTabsContent from "../../../components/dashboard/team-management/ManagementTabsContent";
import { SearchIcon } from "../../../assets/svg/svg";
import CreateContractCard from "../../../components/dashboard/contracts/CreateContractCard";

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

  console.log(filteredData);

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500">
      <TitleHeader
        tabs={detailsTab}
        selectedTab={selectedTab}
        setSelectedTab={handleTabSelect}
        title="Team management"
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
              <div className="flex gap-16 justify-between items-center h-9">
                <p className="font-semibold text-gray-600 dark:text-gray-150">
                  {selectedTab}
                </p>
                <div className="py-2 px-4 flex justify-between bg-white rounded-2xl max-w-68 w-full h-9 dark:bg-gray-600">
                  <input
                    type="search"
                    className="outline-none w-full text-gray-400 dark:text-gray-300"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <SearchIcon />
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
