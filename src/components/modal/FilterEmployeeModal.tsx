import { useState } from "react";
import useModal from "../../hooks/useModal";

function FilterEmployeeModal() {
  const [selected, setSelected] = useState("option1");
  const [selected2, setSelected2] = useState("All");
  const buttons = [
    { label: "All", value: "option1" },
    { label: "Active", value: "option2" },
    { label: "Inactive", value: "option3" },
  ];

  const buttons2 = [
    { label: "All", value: "All" },
    { label: "Freelancer", value: "Freelancer" },
    { label: "Contractor", value: "Contractor" },
  ];
  const { hideModal } = useModal();
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center w-full h-full mb-5">
        <button onClick={hideModal} className="absolute left-0">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.4532 6.66675L15.9998 14.1201L8.5465 6.66675L6.6665 8.54675L14.1198 16.0001L6.6665 23.4534L8.5465 25.3334L15.9998 17.8801L23.4532 25.3334L25.3332 23.4534L17.8798 16.0001L25.3332 8.54675L23.4532 6.66675Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <p className="text-xl font-semibold text-center text-gray-500 dark:text-gray-150">
          Filter
        </p>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-150">
          Contract
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setSelected(btn.value)}
              className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
                selected === btn.value
                  ? "bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400"
                  : "bg-gray-100 dark:bg-gray-500 text-gray-300 dark:text-gray-300"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-150">
          Type
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {buttons2.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setSelected2(btn.value)}
              className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
                selected2 === btn.value
                  ? "bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400"
                  : "bg-gray-100 dark:bg-gray-500 text-gray-300 dark:text-gray-300"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-29">
        <button className="border border-gray-500 rounded-full dark:border-gray-100 dark:text-gray-100 w-34 md:w-51 h-11 md:h-14">
          Cancel
        </button>
        <button className="text-white rounded-full w-34 md:w-51 h-11 md:h-14 bg-primary-200">
          Apply
        </button>
      </div>
    </div>
  );
}

export default FilterEmployeeModal;
