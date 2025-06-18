import { ArrowLeft, Plus } from "lucide-react";
import { DashBoardTitleHeaderProps } from "../../types/types";
import Tabs from "./Tabs";
import { useNavigate } from "react-router-dom";
function TitleHeader({
  title,
  isBackButton,
  isAddButton = false,
  isTabs,
  tabs = ["", ""],
  selectedTab,
  setSelectedTab,
}: DashBoardTitleHeaderProps) {
  const navigate = useNavigate();
  const handleBackButton = () => {
    if (isBackButton) {
      navigate(-1);
    }
  };
  return (
    <section className="sticky top-0 bg-white border-b z-5 border-gray-150 dark:border-gray-250 dark:bg-gray-600">
      <div className="px-4 pt-6">
        <div className="pb-1 space-y-1">
          {isBackButton ? (
            <button
              onClick={handleBackButton}
              className="flex items-center gap-1 text-xs font-medium text-gray-300 transition-colors duration-150 ease-in-out cursor-pointer hover:text-gray-200"
            >
              <span>
                <ArrowLeft size={16} />
              </span>
              Back
            </button>
          ) : (
            <p className="text-xs font-medium text-gray-300">Overview</p>
          )}
          <div className="flex items-center justify-between gap-4">
            <h1 className="overflow-hidden text-2xl font-bold tracking-tight text-gray-600 truncate max-w-44 xs:max-w-56 dark:text-gray-150 whitespace-nowrap sm:text-4xl sm:max-w-full">
              {title}
            </h1>
            {isAddButton && (
              <button
                className={
                  "hidden lg:flex items-center text-white rounded-full cursor-pointer bg-primary-200 h-10 gap-1 px-4 transform-all ease-linear  " +
                  (selectedTab === tabs[0]
                    ? "opacity-100 visible"
                    : "opacity-0 hidden")
                }
              >
                <Plus size={16} />
                New contract
              </button>
            )}
          </div>
        </div>
      </div>
      {isTabs && (
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
    </section>
  );
}

export default TitleHeader;
