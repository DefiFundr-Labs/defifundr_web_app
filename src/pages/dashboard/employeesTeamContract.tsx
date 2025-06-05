import { useState } from "react";
import EmployeeCard from "../../components/dashboard/employees/EmployeeCard";
import { SearchIcon } from "../../assets/svg/svg";
import { Link } from "react-router-dom";

function EmployeesTeamContract() {
  const [search, setSearch] = useState("");

  const dummyEmployees = [
  { id: 1, name: "Omobolaji Olanrewaju Akinbiola", job: "Frontend Developer", contracts: 1, active: true },
  { id: 2, name: "Raymond Joseph", job: "Frontend Developer", contracts: 7, active: true },
  { id: 3, name: "Michael Francis", job: "Frontend Developer", contracts: 9, active: false },
  { id: 4, name: "Alice Johnson", job: "UI/UX Designer", contracts: 2, active: true },
  { id: 5, name: "Michael Brown", job: "DevOps Engineer", contracts: 6, active: false },
  { id: 6, name: "Emily Davis", job: "Project Manager", contracts: 4, active: true },
  { id: 7, name: "David Wilson", job: "Data Analyst", contracts: 1, active: false },
  { id: 8, name: "Sophia Lee", job: "Mobile Developer", contracts: 7, active: true },
  { id: 9, name: "Chris Taylor", job: "QA Engineer", contracts: 3, active: false },
  { id: 10, name: "Olivia White", job: "Full Stack Developer", contracts: 8, active: true },
  { id: 11, name: "Daniel Harris", job: "Product Owner", contracts: 2, active: false },
];
  const filteredEmployees = dummyEmployees.filter((emp) =>
    `${emp.name} ${emp.job}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 dark:bg-gray-500">
      
      <div className="flex gap-16 justify-between items-center h-9">
        <p className="font-semibold text-gray-600 dark:text-gray-150">Employees</p>
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

      <div className="flex flex-wrap gap-4 mt-4">
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
