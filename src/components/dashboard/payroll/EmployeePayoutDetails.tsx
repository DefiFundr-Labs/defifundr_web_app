import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CtaHeader from "../../../components/dashboard/team-management/CtaHeader";
import { timeSheetRecords } from "../../../data/timeSheetRecords";
import { TimeSheetRecord } from "../../../types/types";
import EmployeeCard from "./EmployeeCard";
import PaymentDetailsCard from "./PaymentDetailsCard";
import FixedRate from "./payoutHistory/fixedRate";

function EmployeePayoutDetails() {
  const { id } = useParams();

  const [timeSheetDetail, setTimeSheetDetail] =
    useState<TimeSheetRecord | null>(null);
  useEffect(() => {
    if (id) {
      const fetchTimeSheetDetails = () => {
        const timeSheet = timeSheetRecords.find(
          (record) => record.id === Number(id)
        );
        setTimeSheetDetail(timeSheet || null);
      };
      fetchTimeSheetDetails();
    }
  }, [id]);

  return (
    <div className="bg-gray-100">
      <CtaHeader title={timeSheetDetail?.employeeName || "Timesheet details"} />
      <div className="p-4 space-y-4 dark:bg-gray-600 flex flex-wrap gap-4">
        <EmployeeCard />
        <PaymentDetailsCard/>
      </div>
        <FixedRate/>
    </div>
  );
}

export default EmployeePayoutDetails;
