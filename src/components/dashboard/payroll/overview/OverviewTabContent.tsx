import { useEffect, useState } from "react";
import EmptyState from "../../EmptyState";
import PayoutOverviewChart from "./PayoutOverviewChart";
import InfoCard from "./InfoCard";
import { UsdtIcon, Warning } from "../../../../assets/svg/svg";
import Table from "../../../table/Table";
import { AnimatePresence } from "framer-motion";
import { TableColumn } from "../../../table/TableHeader";
import ProfilePic from "../../../../assets/images/ProfilePic.png";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../../routes/routesPath";
import { timeSheetRecords } from "../../../../data/timeSheetRecords";
import { TimeSheetRecord } from "../../../../types/types";

const getContractBadge = (contractType: TimeSheetRecord["contract"]["contractType"]) => {
  switch (contractType) {
    case "Fixed rate":
      return `border-primary-200 bg-primary-500 text-primary-200 dark:bg-primary-50`;
    case "Pay as you go":
      return `border-error-500 bg-error-400 text-error-500 dark:bg-error-300 `;
    case "Milestone":
      return `border-info-300 bg-info-500 text-info-300 dark:bg-info-400`;
    default:
      return "";
  }
};



const renderPayrollCell = (item: TimeSheetRecord, column: TableColumn) => {
  switch (column.key) {
    case "amount":
      return (
        <span className="text-gray-150 text-sm font-semibold dark:text-white">
           {`$${parseFloat(item.totalAmount ?? "0").toFixed(2)}`}
        </span>
      );
    case "employee":
      return (
        <div className="flex gap-2 items-center">
          <div className="rounded-full">
            <img src={ProfilePic} alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-sm text-gray-500 dark:text-gray-150">
              {item.employeeName}
            </p>
            <span className="font-medium text-xs text-gray-400 dark:text-gray-200">
              {item.contractor.position}
            </span>
          </div>
        </div>
      );
    case "paidIn":
      return (
        <div className="w-fit m-auto text-gray-500 text-sm font-medium dark:text-white border border-gray-150 bg-gray-100 dark:bg-gray-600 dark:border-gray-250 px-3 py-1.5 rounded-full flex items-center gap-1">
          <UsdtIcon />
          <span>{item.paidIn}</span>
        </div>
      );
    case "contractType":
      return (
        <span className={`px-2 py-1 rounded-full text-sm font-semibold border ${getContractBadge(
          item.contract.contractType
        )}`}>
          {item.contract.contractType}
        </span>
      );
    case "frequency":
      return (
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-150">
          {item.frequency || "-- --"}
        </span>
      );
    case "nextPayoutDate":
      return (
        <span className="text-gray-600 font-semibold text-sm dark:text-gray-150">
          {item.startDate}
        </span>
      );
    default:
      return (item as any)[column.key] || "-";
  }
};

const renderMobileCell = (item: TimeSheetRecord) => (
  <div className="flex gap-4 justify-between">
    <div className="space-y-2 flex-1 min-w-0">
      <p className="truncate font-semibold text-gray-500">{item.employeeName}</p>
      <span className="flex items-center gap-2 ">
        <p className="text-xs font-medium text-gray-300">{item.totalAmount}</p>
        <div className="w-px self-stretch bg-gray-150" />
        <div className="flex items-center font-medium gap-1 ">
          <UsdtIcon />
          <span className="text-gray-600 text-sm font-medium dark:text-gray-300">
            {item.paidIn}
          </span>
        </div>
      </span>
    </div>

    <div className="space-y-2 shrink-0  flex flex-col items-end justify-between">
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getContractBadge(
          item.contract.contractType
        )}`}
      >
        {item.contract.contractType}
      </span>
      <p className="text-xs font-medium text-gray-400">{item.startDate}</p>
    </div>
  </div>
);

function OverviewTabContent() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(timeSheetRecords);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(
      checked ? timeSheetRecords.map((data) => String(data.id)) : []
    );
  };

  useEffect(() => {
    const filtered = timeSheetRecords.filter((record) =>
      record.employeeName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search]);

  const payrollColumns: TableColumn[] = [
    { key: "employee", header: "Employee" },
    { key: "contractType", header: "Contract Type" },
    { key: "frequency", header: "Frequency", align: "right" },
    { key: "amount", header: "Amount", align: "center" },
    { key: "paidIn", header: "Paidin", align: "center" },
    { key: "nextPayoutDate", header: "Next Payout date", align: "right" },
  ];

  const showModal = () => {
    console.log("Show filter modal");
  };

  const handleRowClick = (employee: TimeSheetRecord) => {
    navigate(`${RoutePaths.PAYROLL_EMPLOYEE_DETAILS}/${employee.id}`);
  };

  return (
    <div className="min-h-screen space-y-2 bg-gray-100 dark:bg-gray-600">
      {timeSheetRecords.length > 0 && (
        <div className="p-4">
          <div className="block sm:flex gap-4">
            <PayoutOverviewChart />
            <div className="mt-4 sm:mt-0 w-full max-w-79 h-74 flex flex-col justify-between">
              <InfoCard label="Total Monthly Payout" value="$17,000.00" />
              <InfoCard label="Total Employees" value="20" />
              <InfoCard label="Next Payout Date" value="May 30, 2025" />
            </div>
          </div>
          <div className="w-full h-20 sm:h-22 mt-4 sm:mt-6 rounded-xl border border-warning-500 flex items-center justify-between p-2 sm:p-4 bg-white dark:bg-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-8 sm:w-14 h-8 sm:h-14 flex items-center justify-center rounded-full bg-warning-300 dark:bg-warning-400">
                <Warning />
              </div>
              <div className=" tracking-tight sm:tracking-normal">
                <h2 className="text-gray-500 dark:text-gray-150 font-semibold text-sm sm:text-base">
                  Urgent: Pending Payroll Action Required
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-200 font-medium">
                  Review and Approve Payroll by 8 PM WAT, Feb 25th to ensure timely employee payments.
                </p>
              </div>
            </div>
            <button className="hidden sm:block text-xs sm:text-sm text-gray-500 dark:text-gray-100 border border-gray-500 dark:border-gray-100 px-4 py-2 rounded-full">
              View payroll
            </button>
          </div>
        </div>
      )}
      {timeSheetRecords.length === 0 ? (
        <div className="flex items-center justify-center w-full bg-white rounded-lg dark:bg-gray-600 h-fullheight">
          <EmptyState
            title="No records yet"
            description="Looks like you're yet to receive any time sheet record"
          />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <div className="flex flex-col flex-1 w-full h-full px-4 py-4 space-y-4">
            <Table
              data={filteredData}
              columns={payrollColumns}
              search={search}
              setSearch={setSearch}
              showModal={showModal}
              selectedTab="Payout Schedule"
              searchPlaceholder="Search by name..."
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              onRowClick={handleRowClick}
              emptyTitle={search ? "No invoices found" : "No invoices yet"}
              emptyDescription={
                search
                  ? `No invoices match "${search}". Try adjusting your search.`
                  : "Invoices sent to you will be displayed here"
              }
              renderCell={renderPayrollCell}
              renderMobileCell={renderMobileCell}
            />
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default OverviewTabContent;
