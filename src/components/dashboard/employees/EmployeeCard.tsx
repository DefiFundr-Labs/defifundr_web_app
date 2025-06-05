import React from "react";
import{ Profile }from "../../../assets/svg/svg";
type EmployeeCardProps = {
  name: string;
  job: string;
  contracts: number;
  active: boolean;
};
const EmployeeCard: React.FC<EmployeeCardProps> = ({ name, job, contracts, active }) =>{
    const formatted = String(contracts).padStart(2, '0');
  return (
    <div className="bg-white dark:bg-gray-600 p-4 rounded-lg w-full xs:w-72 cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <div className="flex gap-2 mb-4">
           <div className="size-10 dark:bg-gray-800 bg-primary-500 flex items-center justify-center rounded-md overflow-hidden">
            <Profile/>
           </div>
           <div className="">
              <p className="font-semibold truncate dark:text-gray-150 text-gray-600 w-51">{name}</p>
              <p className="text-xs text-gray-300 font-medium">{job}</p>
           </div>
        </div>
        <hr className="border border-gray-150 dark:border-gray-700"/>
        <div className="flex h-6 items-center justify-between mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-200">{formatted} Contract(s)</p>
            <span
             className={`inline-block mt-2 px-3 py-1 rounded-md text-xs font-semibold
              ${active ? "bg-success-300 text-success-500 dark:bg-success-400" : "bg-gray-100 text-gray-300 dark:bg-gray-500"}`}
            >
              {active ? "Active" : "Inactive"}
            </span>
        </div>
      
    </div>
  )
}

export default EmployeeCard
