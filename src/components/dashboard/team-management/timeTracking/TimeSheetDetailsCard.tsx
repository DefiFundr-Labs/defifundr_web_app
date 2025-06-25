import { useEffect, useState } from "react";
import { ClockIcon } from "../../../../assets/svg/svg";
import { TimeSheetRecord } from "../../../../types/types";

function TimeSheetDetailsCard({
  timeSheetDetail,
}: {
  timeSheetDetail: TimeSheetRecord;
}) {
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
    if (timeSheetDetail.status) {
      console.log("timeSheetDetail.status", timeSheetDetail.status);

      setStatusStyle(getStatusColor(timeSheetDetail.status));
    }
  }, [timeSheetDetail.status]);

  return (
    <div className="max-w-4xl p-4 space-y-4 rounded-lg sm:p-6 dark:bg-gray-500">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="items-center justify-between p-3.5 rounded-lg flex bg-primary-500 dark:bg-primary-600 w-fit text-primary-200 dark:text-primary-400">
              <ClockIcon />
            </div>
            <div>
              <p className="text-base font-medium sm:text-xl dark:text-gray-150">
                {timeSheetDetail.totalHours},{" "}
                {timeSheetDetail.totalMinutes ?? "0 minutes"}
              </p>
              <p className="text-xs font-medium dark:text-gray-200">
                {timeSheetDetail.dateRange}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs dark:text-white">Status</p>
            <div>
              <p
                className={`border text-sm font-medium py-1 px-2 rounded-full ${statusStyle}`}
              >
                {timeSheetDetail.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rate and Total Amount */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-2 py-1 bg-gray-100 dark:bg-gray-600">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
            Rate
          </p>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
            Total amount
          </p>
        </div>
        <div className="flex items-center justify-between p-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            {timeSheetDetail.rate}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            {timeSheetDetail.totalAmount}
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
            {timeSheetDetail.description}
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
            {timeSheetDetail.attachment}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            {timeSheetDetail.submittedOn}
          </p>
        </div>
      </div>

      {/* Rejection Reason */}
      {timeSheetDetail.status.toLowerCase() === "rejected" && (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between px-2 py-1 bg-gray-100 dark:bg-gray-600">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
              Reason for rejection
            </p>
          </div>
          <div className="flex items-center justify-between p-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
              {timeSheetDetail.rejectionReason}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeSheetDetailsCard;
