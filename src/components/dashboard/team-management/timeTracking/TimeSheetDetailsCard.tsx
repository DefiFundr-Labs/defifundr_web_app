import { useEffect, useState } from "react";
import {
  CalendarIcon2,
  ClockIcon,
  ExpenseIcon,
  FlagIcon,
} from "../../../../assets/svg/svg";
import { RecordDetails } from "../../../../types/types";

function TimeSheetDetailsCard({ records, type }: RecordDetails) {
  const [statusStyle, setStatusStyle] = useState<string>("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "dark:bg-warning-400 bg-warning-300 border-warning-500 text-warning-500";
      case "approved":
        return "text-success-500 bg-success-300 border-success-500 dark:bg-success-400 dark:text-success-500";
      case "rejected":
        return "text-error-500 bg-error-400 border-error-500 dark:bg-error-300 dark:text-error-500";
      default:
        return "dark:bg-warning-400 bg-warning-300 border-warning-500 text-warning-500";
    }
  };

  useEffect(() => {
    if (records.status) {
      setStatusStyle(getStatusColor(records.status));
    }
  }, [records.status]);

  return (
    <div className="max-w-4xl p-4 space-y-4 rounded-lg sm:p-6 dark:bg-gray-500">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="items-center justify-between p-3.5 rounded-lg flex bg-primary-500 dark:bg-primary-600 w-fit text-primary-200 dark:text-primary-400">
              {type.toLowerCase() === "time tracking" ? (
                <ClockIcon />
              ) : type.toLowerCase() === "time off" ? (
                <CalendarIcon2 />
              ) : type.toLowerCase() === "expense" ? (
                <ExpenseIcon />
              ) : (
                <FlagIcon />
              )}
            </div>
            <div>
              <p className="text-base font-medium sm:text-xl dark:text-gray-150">
                {type.toLowerCase() === "time tracking"
                  ? `${records.totalHours ?? "0 hours"}, ${
                      records.totalMinutes ?? "0 minutes"
                    }`
                  : type.toLowerCase() === "time off"
                  ? records.dateRange
                  : type.toLowerCase() === "expense"
                  ? records.employeeName
                  : records.employeeName}
              </p>
              <p className="text-xs font-medium dark:text-gray-200">
                {type.toLowerCase() === "time tracking"
                  ? records.dateRange
                  : type.toLowerCase() === "time off"
                  ? records.paid
                    ? "Paid time off"
                    : ""
                  : type.toLowerCase() === "expense"
                  ? records.employeeName
                  : "2 of 4 milestones"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs dark:text-white">Status</p>
            <div>
              <p
                className={`border text-sm font-medium py-1 px-2 rounded-full ${statusStyle}`}
              >
                {records.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rate and Total Amount */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-2 py-1 bg-gray-100 dark:bg-gray-600">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
            {type.toLowerCase() === "time tracking"
              ? "Rate"
              : type.toLowerCase() === "time off"
              ? "Reason"
              : type.toLowerCase() === "expense"
              ? "Amount"
              : "Amount"}
          </p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
            {type.toLowerCase() === "time tracking"
              ? "Total amount"
              : type.toLowerCase() === "time off"
              ? "Total time off"
              : type.toLowerCase() === "expense"
              ? "Expense date"
              : "Estimated due date"}
          </p>
        </div>
        <div className="flex items-center justify-between p-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            {type.toLowerCase() === "time tracking"
              ? records.rate
              : type.toLowerCase() === "time off"
              ? records.leaveType
              : type.toLowerCase() === "expense"
              ? records.totalAmount + "USDT"
              : `${records.totalAmount} USDT`}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            {type.toLowerCase() === "time tracking"
              ? `${records.totalAmount}  ${records.paidIn}`
              : type.toLowerCase() === "time off"
              ? records.dateRange
              : type.toLowerCase() === "expense"
              ? records.submittedOn
              : records.submittedOn}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-2 py-1 bg-gray-100 dark:bg-gray-600">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
            Description
          </p>
        </div>
        <div className="flex items-center justify-between p-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            {records.description}
          </p>
        </div>
      </div>

      {/* Attachment and Submitted */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-2 py-1 bg-gray-100 dark:bg-gray-600">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
            Attachment
          </p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
            Submitted on
          </p>
        </div>
        <div className="flex items-center justify-between p-2">
          <p className="text-sm font-medium text-primary-200 dark:text-primary-400">
            {records.attachment}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            {records.submittedOn}
          </p>
        </div>
      </div>

      {records.status.toLowerCase() === "rejected" && (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between px-2 py-1 bg-gray-100 dark:bg-gray-600">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
              Reason for rejection
            </p>
          </div>
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
              {records.rejectionReason}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeSheetDetailsCard;
