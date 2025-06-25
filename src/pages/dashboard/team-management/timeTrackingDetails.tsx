import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CtaHeader from "../../../components/dashboard/team-management/CtaHeader";
import TimeSheetDetailsCard from "../../../components/dashboard/team-management/timeTracking/TimeSheetDetailsCard";
import PartiesInvolvedComponent from "../../../components/dashboard/team-management/PartiesInvolved";
import { timeSheetRecords } from "../../../data/timeSheetRecords";
import { TimeSheetRecord } from "../../../types/types";
import { set } from "react-hook-form";

type ContractorType = {
  name: string;
  position: string;
  detailLink: string;
};

type ContractType = {
  client: string;
  paymentType: string;
  contractLink: string;
};

function TimeTrackingDetails() {
  const { id } = useParams();

  const [timeSheetDetail, setTimeSheetDetail] =
    useState<TimeSheetRecord | null>(null);
  const [contractor, setContractor] = useState<ContractorType | null>(null);
  const [contract, setContract] = useState<ContractType | null>(null);
  const [showCtaButton, setShowCtaButton] = useState<boolean>(false);
  const handleOnApprove = () => {
    // Logic to handle approval of the timesheet
    console.log("Timesheet approved");
    // You can add further actions like updating the status in the backend
    setTimeSheetDetail((prev) => {
      if (prev) {
        return {
          ...prev,
          status: "Approved",
        };
      }
      return prev;
    });
    setShowCtaButton(false);
  };
  const handleOnReject = () => {
    // Logic to handle rejection of the timesheet
    console.log("Timesheet rejected");
    // You can add further actions like updating the status in the backend
    setTimeSheetDetail((prev) => {
      if (prev) {
        return {
          ...prev,
          status: "Rejected",
        };
      }
      return prev;
    });
    setShowCtaButton(false);
  };
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

  useEffect(() => {
    setShowCtaButton(timeSheetDetail?.status === "Pending");
    if (timeSheetDetail) {
      setContractor(timeSheetDetail.contractor);
      setContract(timeSheetDetail.contract);
    }
  }, [timeSheetDetail]);

  return (
    <div>
      <CtaHeader
        title="Timesheet details"
        showCtaButton={showCtaButton}
        onApprove={handleOnApprove}
        onReject={handleOnReject}
      />
      <div className="p-4 space-y-4 dark:bg-gray-600">
        {timeSheetDetail ? (
          <TimeSheetDetailsCard timeSheetDetail={timeSheetDetail} />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-white rounded-lg dark:bg-gray-500">
            <p className="text-gray-600 dark:text-gray-200">
              No timesheet details found.
            </p>
          </div>
        )}

        {contractor && contract && (
          <PartiesInvolvedComponent
            contractor={contractor}
            contract={contract}
            onApprove={handleOnApprove}
            onReject={handleOnReject}
            showCtaButton={showCtaButton}
          />
        )}
      </div>
    </div>
  );
}

export default TimeTrackingDetails;
