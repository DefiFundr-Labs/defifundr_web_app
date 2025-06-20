import React from "react";
import { EmploymentType } from "../../../assets/svg/svg";
import Profile from "../../../assets/images/ProfilePic.png"
type EmployeeCardProps = {
  name: string;
  job: string;
  employmentType: string;
  active: boolean;
};
const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  job,
  employmentType,
  active,
}) => {
  return (
    <div className="bg-white dark:bg-gray-600 p-4 rounded-lg w-full  cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <div className="flex gap-2 mb-4">
        <div className="size-10 dark:bg-gray-800 bg-primary-500 flex items-center justify-center rounded-full overflow-hidden">
          <img
            src={Profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="">
          <p className="font-semibold truncate dark:text-gray-150 text-gray-600 w-51">
            {name}
          </p>
          <p className="text-xs text-gray-300 font-medium">{job}</p>
        </div>
      </div>
      <hr className="border border-gray-150 dark:border-gray-700" />
      <div className="flex h-6 items-center justify-between mt-4">
        <p className="flex gap-1 items-center text-xs text-gray-400 px-3 py-1 border border-gray-150 bg-gray-100 dark:bg-inherit dark:border-gray-250 rounded-full dark:text-gray-200">
          <EmploymentType /> {employmentType}
        </p>
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
              ${
                active
                  ? "bg-success-300 text-success-500 border border-success-500 dark:border-success-400 dark:bg-success-400"
                  : "bg-gray-100 text-gray-300 dark:bg-gray-500"
              }`}
        >
          {active ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
};

export default EmployeeCard;
