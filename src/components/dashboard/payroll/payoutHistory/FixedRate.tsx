
import { AnimatePresence } from "framer-motion";
import Table from "../../../table/Table";
import { TableColumn } from "../../../table/TableHeader";
import { useState } from "react";


function fixedRate() {
interface TimeSheetRecord {
  id: number;
  totalAmount: string;
  paidIn: string;
  status: "Pending" | "Approved";
  frequency?: string;
}

const timeSheetRecords: TimeSheetRecord[] = [
  {
    id: 1,
    totalAmount: "600",
    paidIn: "USDT",
    status: "Pending",
    frequency: "Bi-weekly"
  },
  {
    id: 2,
    totalAmount: "472.50",
    paidIn: "USDT",
    status: "Approved",
    frequency: "Weekly"
  },
  {
    id: 3,
    totalAmount: "900",
    paidIn: "USDT",
    status: "Pending",
    frequency: "Monthly"
  },
  {
    id: 4,
    totalAmount: "481.25",
    paidIn: "USDT",
    status: "Approved",
    frequency: "Bi-weekly"
  },
  {
    id: 5,
    totalAmount: "588",
    paidIn: "USDT",
    status: "Pending",
    frequency: "Weekly"
  },
  {
    id: 6,
    totalAmount: "380",
    paidIn: "USDT",
    status: "Approved",
    frequency: "Bi-weekly"
  },
  {
    id: 7,
    totalAmount: "462",
    paidIn: "USDT",
    status: "Pending",
    frequency: "Monthly"
  },
  {
    id: 8,
    totalAmount: "715",
    paidIn: "USDT",
    status: "Approved",
    frequency: "Weekly"
  },
  {
    id: 9,
    totalAmount: "278.67",
    paidIn: "USDT",
    status: "Pending",
    frequency: "Monthly"
  },
  {
    id: 10,
    totalAmount: "920.83",
    paidIn: "USDT",
    status: "Approved",
    frequency: "Bi-weekly"
  }
];

    const payrollColumns: TableColumn[] = [
        { key: "totalAmount", header: "Amount" },
        { key: "paidIn", header: "Paid in", align: "center" },
        { key: "status", header: "Status" },
        { key: "frequency", header: "Time Stamp", align: "right" },
      ];
    const [search, setSearch] = useState("");
    const showModal = () => {
    console.log("Show filter modal");
  };
   const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
const handleRowClick = (employee: TimeSheetRecord) => {
    console.log("Row clicked:", employee);
    
  };

const renderPayrollCell = (item: TimeSheetRecord, column: TableColumn) => {
  switch (column.key) {
    case "amount":
      return (
        <span className="text-gray-500 text-sm font-semibold dark:text-white">
          {item.totalAmount}
        </span>
      );
    case "employee":
      return (
        <div className="flex gap-2 items-center">
         
          <div className="leading-tight">
            <p className="font-semibold text-sm text-gray-500 dark:text-white">
            </p>
            <span className="font-medium text-xs text-gray-400 dark:text-gray-300">
            </span>
          </div>
        </div>
      );
    case "paidIn":
      return (
        <div className="w-fit m-auto text-gray-500 text-sm font-medium dark:text-white border border-gray-150 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
          
          <span>{item.paidIn}</span>
        </div>
      );
    
    case "frequency":
      return (
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
          {item.frequency || "-- --"}
        </span>
      );
    case "nextPayoutDate":
      return (
        <span className="text-gray-600 font-semibold text-sm dark:text-gray-300">
        </span>
      );
    default:
      return (item as any)[column.key] || "-";
  }
};
    const renderMobileCell = (item: TimeSheetRecord) => (
      <div className="flex gap-4 justify-between">
        <div className="space-y-2 flex-1 min-w-0">
          <span className="flex items-center gap-2 ">
            <p className="text-xs font-medium text-gray-300">{item.totalAmount}</p>
            <div className="w-px self-stretch bg-gray-150" />
            <div className="flex items-center font-medium gap-1 ">
              <span className="text-gray-600 text-sm font-medium dark:text-gray-300">
                {item.paidIn}
              </span>
            </div>
          </span>
        </div>
    
        <div className="space-y-2 shrink-0  flex flex-col items-end justify-between">
          
          <p className="text-xs font-medium text-gray-400"></p>
        </div>
      </div>
    );
  return (
    <div>
       <AnimatePresence mode="wait">
          <div className="flex flex-col flex-1 w-full h-full px-4 py-4 space-y-4">
            <Table
              data={timeSheetRecords}
              columns={payrollColumns}
              search={search}
              setSearch={setSearch}
              showModal={showModal}
              selectedTab=""
              searchPlaceholder="Search by title..."
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              onRowClick={handleRowClick}
              emptyTitle={search ? "No Payout found" : "No Payout yet"}
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
    </div>
  )
}

export default fixedRate
