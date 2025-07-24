import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TitleHeader from "../../common/dashboard/TitleHeader";
import Table from "../../components/table/Table";
import { TableColumn } from "../../components/table/TableHeader";
import ContractsMetrics from "../../components/dashboard/contracts/ContractsMetrics";
import { invoiceMetricsData } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routes/routesPath";
import { UsdtIcon } from "../../assets/svg/svg";

interface Invoice {
  id: string;
  invoiceNo: string;
  title: string;
  amount: number;
  paidIn: string;
  status: "Pending" | "Overdue" | "Paid";
  issueDate: string;
  name?: string;
  number?: string;
  company?: string;
  [key: string]: any; // Add index signature for dynamic property access
}

const Invoices: React.FC = () => {
  // Sample data - replace with your actual data fetching
  const [invoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNo: "#INV-2025-010",
      title: "For Mar 31st - Apr 6th 2025",
      amount: 1200,
      paidIn: "USDT",
      status: "Pending",
      issueDate: "25th Oct 2025",
      name: "March April Invoice",
      number: "#INV-2025-010",
      company: "Sample Company",
    },
    {
      id: "2",
      invoiceNo: "#INV-2025-011",
      title: "For Mar 31st - Apr 6th 2025",
      amount: 1200,
      paidIn: "USDT",
      status: "Overdue",
      issueDate: "25th Oct 2025",
      name: "March April Invoice",
      number: "#INV-2025-011",
      company: "Sample Company",
    },
    {
      id: "3",
      invoiceNo: "#INV-2025-012",
      title: "For Mar 31st - Apr 6th 2025",
      amount: 1200,
      paidIn: "USDT",
      status: "Paid",
      issueDate: "25th Oct 2025",
      name: "March April Invoice",
      number: "#INV-2025-012",
      company: "Sample Company",
    },
  ]);

  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const navigate = useNavigate();

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.name?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.company?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.title?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.invoiceNo?.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = () => {
    // Add your filter modal logic here
    console.log("Show filter modal");
  };

  // Define table columns
  const invoiceColumns: TableColumn[] = [
    { key: "invoiceNo", header: "Invoice No." },
    { key: "title", header: "Title" },
    { key: "amount", header: "Amount", align: "right" },
    { key: "paidIn", header: "Paid in", align: "center" },
    { key: "status", header: "Status", align: "center" },
    { key: "issueDate", header: "Issue date", align: "right" },
  ];

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Pending":
        return ` border-warning-500 bg-warning-300 text-warning-500 dark:bg-yellow-900 dark:text-yellow-300`;
      case "Overdue":
        return `border-warning-500 bg-error-400 text-error-500 dark:bg-red-900 dark:text-red-300`;
      case "Paid":
        return `border-success-500 bg-success-300 text-success-500 dark:bg-green-900 dark:text-green-300`;
      default:
        return;
    }
  };

  // Custom cell renderer for invoice-specific formatting
  const renderInvoiceCell = (item: Invoice, column: TableColumn) => {
    switch (column.key) {
      case "amount":
        return `$${item.amount.toLocaleString()}.00`;
      case "paidIn":
        return (
          <div className="flex items-center font-medium gap-1 py-1.5 px-3 border border-gray-150 bg-gray-100 rounded-full w-fit mx-auto">
            {/* <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div> */}
            <UsdtIcon />
            <span className="text-gray-600 dark:text-gray-300">
              {item.paidIn}
            </span>
          </div>
        );
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
              item.status
            )}`}
          >
            {item.status}
          </span>
        );
      case "invoiceNo":
        return (
          <p className="font-medium text-gray-900 dark:text-white">
            {item.invoiceNo}
          </p>
        );
      case "title":
        return (
          <span className="text-gray-600 dark:text-gray-300">{item.title}</span>
        );
      case "issueDate":
        return (
          <span className="text-gray-600 dark:text-gray-300">
            {item.issueDate}
          </span>
        );
      default:
        return (item as any)[column.key] || "-";
    }
  };

  const renderMobileCell = (item: Invoice) => (
    <div className="flex gap-4 justify-between">
      <div className="space-y-2 flex-1 min-w-0">
        <p className="truncate font-semibold text-gray-500">{item.invoiceNo}</p>
        <span className="flex items-center gap-2 ">
          <p className="text-xs font-medium text-gray-300">{item.amount}</p>

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
          className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
            item.status
          )}`}
        >
          {item.status}
        </span>
        <p className="text-xs font-medium text-gray-400">25th Oct 2025</p>
      </div>
    </div>
  );

  // Handle item selection
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(
      checked ? filteredInvoices.map((invoice) => invoice.id) : []
    );
  };

  // Handle row click (optional)
  const handleRowClick = (invoice: Invoice) => {
    // Add navigation or modal logic here
    navigate(`${RoutePaths.INVOICES}/${invoice.invoiceNo.replace("#", "")}`);
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500 w-full min-h-full">
      <TitleHeader title="Invoices" isBackButton={false} />

      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 w-full h-full px-4 py-4 ">
          {invoices.length > 0 && (
            <div className="flex gap-2 w-full overflow-auto lg:overflow-hidden scroll-hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-4 mb-4">
              {invoiceMetricsData.map((metric) => (
                <ContractsMetrics
                  icon={metric.icon}
                  subValue={metric.subValue}
                  title={metric.title}
                  value={metric.value}
                  key={metric.title}
                />
              ))}
            </div>
          )}

          <Table
            data={filteredInvoices}
            columns={invoiceColumns}
            search={search}
            setSearch={setSearch}
            showModal={showModal}
            selectedTab="Invoice history"
            searchPlaceholder="Search by title..."
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onRowClick={handleRowClick}
            renderCell={renderInvoiceCell}
            emptyTitle={search ? "No invoices found" : "No invoices yet"}
            emptyDescription={
              search
                ? `No invoices match "${search}". Try adjusting your search.`
                : "Invoices sent to you will be displayed here"
            }
            renderMobileCell={renderMobileCell}
          />
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Invoices;
