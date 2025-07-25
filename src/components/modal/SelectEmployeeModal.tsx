import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { employees } from "../../data/employeeData";
import { useDispatch } from "react-redux";
import { closeModal, resetModal } from "../../redux/slice/modalSlice";
import EmptyState from "../dashboard/EmptyState";
import dummyImage from "../../assets/Frame 1948759911.png";
import { CancelIcon } from "../../assets/svg/svg";
type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  postal: string;
  phoneCode: string;
  image: string;
};
interface SelectEmployeeModalProps {
  selectedEmployee: Employee | null;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
}

export const SelectEmployeeModal: React.FC<SelectEmployeeModalProps> = ({
  setSelectedEmployee,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleClose = () => {
    dispatch(closeModal());
    setTimeout(() => {
      dispatch(resetModal());
    }, 300);
  };
  const handleSelect = (employee: any) => {
    const selected: Employee = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      phoneNumber: employee.tel,
      address: employee.address,
      city: employee.city,
      country: employee.country,
      email: employee.email,
      postal: employee.postalCode,
      phoneCode: "+234",
      image: dummyImage,
    };
    setSelectedEmployee(selected);
    handleClose();
  };

  return (
    <div className="flex flex-col gap-8 ">
      <div className="relative">
        <button
          onClick={handleClose}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-fit cursor-pointer"
        >
          <CancelIcon />
        </button>
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-150 text-center">
          Select employee
        </p>
      </div>

      {/* Search Input */}
      <div className="relative dark:bg-gray-600 rounded-lg form-control">
        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
          <SearchIcon size={18} />
        </div>
      </div>

      {/* Filtered List */}
      <div className=" overflow-y-auto max-h-80 flex flex-col custom-scrollbar pr-1">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (
            <button
              key={employee.id}
              onClick={() => handleSelect(employee)}
              className={` ${
                index !== filteredEmployees.length - 1 ? "border-b" : ""
              } py-4 cursor-pointer  h-fit dark:border-gray-250 border-gray-150 flex`}
            >
              <div className=" w-full  flex gap-2">
                <div className="size-10 rounded-full bg-primary-50">
                  <img
                    src={dummyImage}
                    alt={employee.name}
                    className="object-cover size-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-500 dark:text-gray-150 text-left">
                    {employee.name}
                  </p>
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-200 text-left ">
                    {employee.job}
                  </p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="w-full  flex items-center justify-center">
            <EmptyState
              title="Oops! No Employee Found"
              description="Adjust your search"
            />
          </div>
        )}
      </div>
    </div>
  );
};
