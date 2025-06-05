import EmptyState from "../EmptyState";
import { employees }from "../../../data/EmployeeData"
import EmployeesTeamContract from "../../../pages/dashboard/employeesTeamContract";

const Employees = () => {
  
  const renderContent = () => {
    if (employees.length === 0) {
      return (
        <EmptyState
          title="No employees yet"
          description="Employees you have contracts with will be displayed here"
        />
      );
    } else {
      return(<EmployeesTeamContract/>)
    }
  }
  return (
    <>
      <div className="rounded-lg bg-white dark:bg-gray-600 flex-1 flex-col flex justify-center items-center">
        {
          renderContent()
        }
      </div>
    </>
  );
};

export default Employees;
