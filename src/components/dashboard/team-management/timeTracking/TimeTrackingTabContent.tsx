import { useEffect, useState } from "react";
import {
  TimeSheetRecord,
  TimeTrackingTabContentProps,
} from "../../../../types/types";
import EmptyState from "../../EmptyState";

import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../../routes/routesPath";
import { TableColumn } from "../../../table/TableHeader";
import { UsdtIcon } from "../../../../assets/svg/svg";
import ProfilePic from "../../../../assets/images/ProfilePic.png";
import { AnimatePresence } from "framer-motion";
import Table from "../../../table/Table";
const getContractBadge = (status: TimeSheetRecord["status"]) => {
  switch (status) {
    case "Pending":
      return `border-primary-200 bg-primary-500 text-primary-200 dark:bg-primary-50`;
    case "Rejected":
      return `border-error-500 bg-error-400 text-error-500 dark:bg-error-300 `;
    case "Approved":
      return `border-info-300 bg-info-500 text-info-300 dark:bg-info-400`;
    default:
      return "";
  }
};

const renderDesktopCell = (item: TimeSheetRecord, column: TableColumn) => {
  switch (column.key) {
    case "amount":
      return (
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-150">
          {`$${parseFloat(item.totalAmount ?? "0").toFixed(2)}`}
        </span>
      );
    case "employee":
      return (
        <div className="flex items-center gap-2">
          <div className="rounded-full">
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
              {item.employeeName}
            </p>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-200">
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
    case "status":
      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold border ${getContractBadge(
            item.status
          )}`}
        >
          {item.status}
        </span>
      );
    case "rate":
      return (
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-150">
          {item.rate || "-- --"}
        </span>
      );
    case "totalWorked":
      return (
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-150">
          {(item.totalHours, item.totalMinutes || "-- --")}
        </span>
      );
    case "submitted":
      return (
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-150">
          {item.startDate}
        </span>
      );
    default:
      return (item as any)[column.key] || "-";
  }
};

const renderMobileCell = (item: TimeSheetRecord) => (
  <div className="flex justify-between gap-4">
    <div className="flex-1 min-w-0 space-y-2">
      <p className="font-semibold text-gray-500 truncate">
        {item.employeeName}
      </p>
      <span className="flex items-center gap-2 ">
        <p className="text-xs font-medium text-gray-300">{item.totalAmount}</p>
        <div className="self-stretch w-px bg-gray-150" />
        <div className="flex items-center gap-1 font-medium ">
          <UsdtIcon />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {item.paidIn}
          </span>
        </div>
      </span>
    </div>

    <div className="flex flex-col items-end justify-between space-y-2 shrink-0">
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold border ${getContractBadge(
          item.status
        )}`}
      >
        {item.status}
      </span>
      <p className="text-xs font-medium text-gray-400">{item.startDate}</p>
    </div>
  </div>
);
function TimeTrackingTabContent({
  timeSheetRecords,
}: TimeTrackingTabContentProps) {
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

  const timeTrackingColumns: TableColumn[] = [
    { key: "employee", header: "Employee" },
    { key: "rate", header: "Rate" },
    { key: "totalWorked", header: "Total worked", align: "right" },
    { key: "amount", header: "Total amount", align: "center" },
    { key: "paidIn", header: "Paid in", align: "center" },
    { key: "status", header: "Status", align: "center" },
    { key: "submitted", header: "Submitted", align: "right" },
  ];

  const handleRowClick = (employee: TimeSheetRecord) => {
    navigate(`${RoutePaths.TEAM_MANAGEMENT_TIME_TRACKING}/${employee.id}`);
  };
  const showModal = () => {
    // Add your filter modal logic here
    console.log("Show filter modal");
  };
  return (
    <div className="min-h-screen p-4 space-y-2 bg-gray-100 dark:bg-gray-600">
      {timeSheetRecords.length === 0 ? (
        <div className="flex items-center justify-center w-full bg-white rounded-lg dark:bg-gray-600 h-fullheight">
          <EmptyState
            title="No records yet"
            description="Looks like you're yet to receive any time sheet record"
          />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <div className="flex flex-col flex-1 w-full h-full py-4 space-y-4">
            <Table
              data={filteredData}
              columns={timeTrackingColumns}
              search={search}
              setSearch={setSearch}
              showModal={showModal}
              selectedTab="Timesheet records"
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
              renderCell={renderDesktopCell}
              renderMobileCell={renderMobileCell}
            />
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default TimeTrackingTabContent;
