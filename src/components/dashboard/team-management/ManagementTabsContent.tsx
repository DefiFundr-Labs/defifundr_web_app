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
        <div className="flex flex-col items-center justify-center flex-1 bg-white rounded-lg dark:bg-gray-600">
          <EmptyState
            title="No employees yet"
            description="Employees you have contracts with will be displayed here"
          />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.map((emp, index) => (
            <Link to={`${RoutePaths.TEAM_MANAGEMENT_EMPLOYEE}/${emp.id}`}>
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
