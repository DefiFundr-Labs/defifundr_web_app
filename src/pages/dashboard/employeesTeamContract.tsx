import { useState } from "react";
import EmployeeCard from "../../components/dashboard/employees/EmployeeCard";
import { SearchIcon } from "../../assets/svg/svg";
import { Link } from "react-router-dom";
import { dummyEmployees } from "../../utils/constant";

function EmployeesTeamContract() {
  const [search, setSearch] = useState("");

  const filteredEmployees = dummyEmployees.filter((emp) =>
    `${emp.name} ${emp.job}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-500 w-full">
      <div className="flex gap-16 justify-between items-center h-9">
        <p className="font-semibold text-gray-600 dark:text-gray-150">
          Employees
        </p>
        <div className="py-2 px-4 flex justify-between bg-white rounded-2xl max-w-68 w-full h-9 dark:bg-gray-600">
          <input
            type="search"
            className="outline-none w-full text-gray-400 dark:text-gray-300"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {filteredEmployees.map((emp, index) => (
          <Link to={"/dashboard/employee-details"}>
            <EmployeeCard
              key={index}
              name={emp.name}
              job={emp.job}
              contracts={emp.contracts}
              active={emp.active}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EmployeesTeamContract;
