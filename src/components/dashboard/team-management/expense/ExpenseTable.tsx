import { useEffect, useState } from "react";
import { TimeTrackingTabContentProps } from "../../../../types/types";
import EmptyState from "../../EmptyState";
import TabHeader from "../TabHeader";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../../routes/routesPath";

function ExpenseTable({ timeSheetRecords }: TimeTrackingTabContentProps) {
  const expense = timeSheetRecords;
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(expense);
  console.log(expense.length);

  useEffect(() => {
    const filtered = expense.filter((record) =>
      record.employeeName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, expense]); // Removed filteredData from dependencies

  return (
    <div className="min-h-screen p-4 space-y-2 bg-gray-100 dark:bg-gray-600">
      <TabHeader
        title="Expense requests"
        search={search}
        setSearch={setSearch}
      />
      {expense.length === 0 ? (
        <div className="flex items-center justify-center w-full bg-white rounded-lg dark:bg-gray-600 h-fullheight">
          <EmptyState
            title="No expenses yet"
            description="Looks like you're yet to receive any time sheet record"
          />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100 rounded-lg gap-y-4 size-full dark:bg-gray-600 ">
          <div className="bg-white dark:text-white dark:bg-gray-500 grow">
            {filteredData.length > 0 ? (
              <div className="flex flex-col gap-2 p-4 ">
                {filteredData.map((record, index) => (
                  <Link
                    to={`${RoutePaths.TEAM_MANAGEMENT_EXPENSE}/${record.id}`}
                    key={record.id || index} // Use record.id as key if available
                  >
                    {record.employeeName} {record.status}
                  </Link>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
