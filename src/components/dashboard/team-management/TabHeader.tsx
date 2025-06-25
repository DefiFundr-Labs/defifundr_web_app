import { FilterIcon, SearchIcon } from "../../../assets/svg/svg";
import FilterEmployeeModal from "../../modal/FilterEmployeeModal";
import useModal from "../../../hooks/useModal";
interface TabHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  title: string;
}
function TabHeader({ search, setSearch, title }: TabHeaderProps) {
  const { showCustomModal } = useModal();
  const showModal = () => {
    showCustomModal(<FilterEmployeeModal />, "lg");
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="font-semibold text-gray-600 dark:text-gray-150">{title}</p>
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
  );
}

export default TabHeader;
