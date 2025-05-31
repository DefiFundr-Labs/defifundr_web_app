import { motion } from "framer-motion";
interface TabsProps {
  tabs: string[];
  selectedTab?: string;
  setSelectedTab?: (tab: string) => void;
}

const Tabs = ({ tabs, selectedTab, setSelectedTab }: TabsProps) => {
  return (
    <div className="flex flex-wrap w-full gap-6 pl-4">
      {tabs.map((tab, index) => {
        const active =
          tab.toLocaleLowerCase() === selectedTab?.toLocaleLowerCase();
        return (
          <div key={index} className="relative">
            <button
              onClick={() => setSelectedTab?.(tab)}
              className={`pb-2 text-sm font-medium ${
                active
                  ? "dark:text-primary-400 text-primary-200"
                  : "text-gray-300 dark:hover:text-primary-500 hover:text-primary-300"
              } border-transparent border-b-3 transition-colors duration-150 ease-in-out cursor-pointer `}
            >
              {tab}
            </button>
            {active && (
              <motion.div
                id="activeTab"
                layoutId="activeTab"
                className="h-[3px] bg-primary-400 w-full absolute bottom-0 left-0"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Tabs;
