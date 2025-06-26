import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TitleHeader from "../../common/dashboard/TitleHeader";
import Table from "../../components/table/Table";
import { TableColumn } from "../../components/table/TableHeader";

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
  [key: string]: any;
}

const Invoices: React.FC = () => {
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

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.name?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.company?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.title?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.invoiceNo?.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = () => {
    console.log("Show filter modal");
  };

  const invoiceColumns: TableColumn[] = [
    { key: "invoiceNo", header: "Invoice No.", showOnMobile: true, mobileOrder: 0 },
    { key: "title", header: "Title", showOnMobile: false },
    { key: "amount", header: "Amount", align: "right", showOnMobile: true, mobileOrder: 1 },
    { key: "paidIn", header: "Paid in", align: "center", showOnMobile: true, mobileOrder: 2 },
    { key: "status", header: "Status", align: "center", showOnMobile: true, mobileOrder: 3 },
    { key: "issueDate", header: "Issue date", align: "right", showOnMobile: true, mobileOrder: 4 },
  ];

  const renderInvoiceCell = (item: Invoice, column: TableColumn) => {
    switch (column.key) {
      case "amount":
        return `$${item.amount.toLocaleString()}.00`;
      case "paidIn":
        return (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center text-sm font-medium lg:bg-gray-100 lg:border dark:bg-gray-600 dark:border-gray-250 border-gray-150 lg:py-1 lg:px-3 w-fit rounded-full">
              <div className="w-4 h-4 mr-1 bg-success-200 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-150">{item.paidIn}</span>
            </div>
          </div>
        );
      case "status":
        const getStatusBadge = (status: Invoice["status"]) => {
          const baseClasses = "px-3 py-1 rounded-full text-sm font-medium border";
          switch (status) {
            case "Pending":
              return `${baseClasses} bg-warning-300 text-warning-500 border-warning-500 dark:bg-warning-400`;
            case "Overdue":
              return `${baseClasses} bg-error-400 text-error-500 border-error-500 dark:bg-error-300`;
            case "Paid":
              return `${baseClasses} bg-success-300 text-success-500 border-success-500 dark:bg-success-400`;
            default:
              return baseClasses;
          }
        };
        return <span className={getStatusBadge(item.status)}>{item.status}</span>;
      case "invoiceNo":
        return <span className="font-medium">{item.invoiceNo}</span>;
      case "title":
        return <span>{item.title}</span>;
      case "issueDate":
        return <span>{item.issueDate}</span>;
      default:
        return (item as any)[column.key] || "-";
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? filteredInvoices.map((invoice) => invoice.id) : []);
  };

  const handleRowClick = (invoice: Invoice) => {
    console.log("Invoice clicked:", invoice);
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500">
      <TitleHeader title="Invoices" isBackButton={false} />
      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 w-full h-full px-4 py-4 space-y-4">
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
          />
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Invoices;

