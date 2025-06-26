import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import Table from "../../../components/table/Table";
import { TableColumn } from "../../../components/table/TableHeader";
import { milestoneRecords } from "../../../data/milestoneRecords";
import type { MilestoneRecord } from "../../../types/types";
import ProfilePic from "../../../assets/images/ProfilePic.png";



const Milestones: React.FC = () => {
  const [milestones] = useState<MilestoneRecord[]>(milestoneRecords);


  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredMilestones = milestones.filter(
    (milestone) =>
      milestone.contractor.name?.toLowerCase().includes(search.toLowerCase()) ||
      milestone.milestoneRange?.toLowerCase().includes(search.toLowerCase()) ||
      milestone.amount?.toLowerCase().includes(search.toLowerCase()) ||
      milestone.paidIn?.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = () => {
    console.log("Show filter modal");
  };

  const milestoneColumns: TableColumn[] = [
    { key: "milestoneName", header: "Employee", showOnMobile: false, },
    { key: "milestoneRange", header: "Milestone no", showOnMobile: false },
    { key: "prototype", header: "Milestone name", align: "left", showOnMobile: true, mobileOrder: 0 },
    { key: "amount", header: "Amount", align: "right", showOnMobile: true, mobileOrder: 1 },
    { key: "paidIn", header: "Paid in", align: "center", showOnMobile: true, mobileOrder: 2 },
    { key: "status", header: "Status", align: "center", showOnMobile: true, mobileOrder: 3 },
    { key: "submitted", header: "Submitted", align: "right", showOnMobile: true, mobileOrder: 4 },
  ];

  const renderMilestoneCell = (item: MilestoneRecord, column: TableColumn) => {
    switch (column.key) {
      case "amount":
        return <span className="text-sm">${item.amount.toLocaleString()}.00</span>;

      case "paidIn":
        return (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center text-sm font-medium lg:bg-gray-100 lg:border dark:bg-gray-600 dark:border-gray-250 border-gray-150 lg:py-1 lg:px-3 w-fit rounded-full">
              <div className="w-4 h-4 mr-1 bg-success-200 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-150 text-sm">{item.paidIn}</span>
            </div>
          </div>
        );
      case "status":
        const getStatusBadge = (status: MilestoneRecord["status"]) => {
          const baseClasses = "px-3 py-1 rounded-full text-sm font-medium border";
          switch (status) {
            case "Pending":
              return `${baseClasses} bg-warning-300 text-warning-500 border-warning-500 dark:bg-warning-400`;
            case "Rejected":
              return `${baseClasses} bg-error-400 text-error-500 border-error-500 dark:bg-error-300`;
            case "Approved":
              return `${baseClasses} bg-success-300 text-success-500 border-success-500 dark:bg-success-400`;
            default:
              return baseClasses;
          }
        };
        // <span className="text-sm ">{item.contractor.name}</span>
        return <span className={getStatusBadge(item.status)}>{item.status}</span>;
      case "milestoneRange":
        return <span className="font-medium text-sm">{item.milestoneRange}</span>;
      case "milestoneName":
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full">
              <img
                src={ProfilePic}
                alt={item.contractor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm ">{item.contractor.name}</p>
              <p className="text-xs text-gray-400">{item.contractor.position}</p>
            </div>
          </div>
        );
      case "prototype":
        return <p className="text-left sm:whitespace-normal text-sm truncate w-45">{item.prototype}</p>;
      case "submitted":
        return <span className="text-sm ">{item.submitted}</span>;
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
    setSelectedItems(checked ? filteredMilestones.map((milestone) => String(milestone.id)) : []);
  };

  const handleRowClick = (milestone: MilestoneRecord) => {
    console.log("Milestone clicked:", milestone);
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-500">
      <TitleHeader title="Milestones" isBackButton={false} />
      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 w-full h-full px-4 py-4 space-y-4">
          <Table
            data={filteredMilestones}
            columns={milestoneColumns}
            search={search}
            setSearch={setSearch}
            showModal={showModal}
            selectedTab="Milestone history"
            searchPlaceholder="Search by milestone name..."
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onRowClick={handleRowClick}
            renderCell={renderMilestoneCell}
            emptyTitle={search ? "No milestones found" : "No milestones yet"}
            emptyDescription={
              search
                ? `No milestones match "${search}". Try adjusting your search.`
                : "Milestones sent to you will be displayed here"
            }
          />
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Milestones;

