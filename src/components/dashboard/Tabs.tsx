interface TabsProps {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const Tabs = ({ tabs, selectedTab, setSelectedTab }: TabsProps) => (
  <div className="flex flex-wrap gap-6 w-full">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setSelectedTab(tab)}
        className={`h-6 pb-2 px-1 flex w-fit outline-none text-sm hover:cursor-pointer transition-all ${
          selectedTab === tab
            ? "text-primary-200 dark:text-primary-400 dark:border-primary-400 border-primary-200 border-b-3 font-semibold"
            : "text-gray-300 font-medium hover:text-gray-400"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
