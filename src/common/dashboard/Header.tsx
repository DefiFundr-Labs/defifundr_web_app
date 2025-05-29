import { BellIcon, FoxIcon } from "../../assets/svg/svg";
import { useForm } from "react-hook-form";
import { SearchIcon } from "../../assets/svg/svg";
import FormInputWithIcon from "../../components/form/FormInputWithIcon";

interface HeaderProps {
  toggleSidebar: () => void;
  isOpen: boolean; // Add this prop to track sidebar state
}

interface SearchFormData {
  search: string;
}

export default function Header({ toggleSidebar, isOpen }: HeaderProps) {
  const { register, handleSubmit, watch } = useForm<SearchFormData>();

  const onSubmit = (data: SearchFormData) => {
    console.log("Search query:", data.search);
    // Handle search logic here
  };

  const handleSearchIconClick = () => {
    const searchValue = watch("search");
    if (searchValue) {
      onSubmit({ search: searchValue });
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 lg:hidden absolute top-6 right-6 z-10 rounded-xl border border-gray-200 dark:border-[#2E2E38] p-3">
        <button
          className="flex flex-col items-center justify-center w-6 h-6"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-[3px]" : "mb-1"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "mb-1"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </div>
      <div className="sticky top-0 md:block hidden z-10 w-full px-6 py-4 border-b border-gray-150 dark:border-[#2E2E38] lg:py-2 min-h-18">
        <div className="flex items-center justify-between h-full">
          <div className="relative flex-1 hidden mx-4 max-w-2xs md:block">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInputWithIcon
                id="search"
                label=""
                placeholder="Search..."
                register={register}
                error={undefined}
                rightIcon={<SearchIcon />}
                onIconClick={handleSearchIconClick}
                className="w-full border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent py-2.5"
              />
            </form>
          </div>

          <div className="flex items-center gap-4">
            {/* Search bar */}

            {/* Notifications */}
            <button className="relative p-2">
              <BellIcon />
              <span className="absolute w-2 h-2 rounded-full bg-primary-300 top-1 right-1"></span>
            </button>

            {/* User profile */}
            <div className="w-8 h-8 rounded-full bg-[#F2F4F7] flex items-center justify-center">
              <FoxIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
