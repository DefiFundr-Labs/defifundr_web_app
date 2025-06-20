import { Link } from "react-router-dom";

import EmployeeCard from "../employees/EmployeeCard";
import EmptyState from "../EmptyState";
import { RoutePaths } from "../../../routes/routesPath";
import { ManagementTabContentProps } from "../../../types/types";

const ManagementTabsContent = ({ data }: ManagementTabContentProps) => {
  const isContractData = data.length === 0;

  return (
    <>
      {isContractData ? (
        <div className="rounded-lg bg-white dark:bg-gray-600 flex-1 flex-col flex justify-center items-center">
          <EmptyState
            title="No employees yet"
            description="Employees you have contracts with will be displayed here"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
          {data.map((emp, index) => (
            <Link to={`${RoutePaths.TEAM_MANAGEMENT}/${emp.id}`}>
              <EmployeeCard
                key={index}
                name={emp.name}
                job={emp.job}
                employmentType="Freelancer"
                active={emp.active}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ManagementTabsContent;
