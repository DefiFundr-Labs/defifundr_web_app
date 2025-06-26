import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CtaHeader from "../../../components/dashboard/team-management/CtaHeader";
import MilestoneDetailsComponent from "../../../components/dashboard/team-management/milestone/MilestoneDetailsCard";
import PartiesInvolvedComponent from "../../../components/dashboard/team-management/PartiesInvolved";
import { milestoneRecords } from "../../../data/milestoneRecords";
import { MilestoneRecord } from "../../../types/types";

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

function MilestoneDetailsPage() {
  const { id } = useParams();

  const [milestoneDetail, setMilestoneDetail] =
    useState<MilestoneRecord | null>(null);
  const [contractor, setContractor] = useState<ContractorType | null>(null);
  const [contract, setContract] = useState<ContractType | null>(null);
  const [showCtaButton, setShowCtaButton] = useState<boolean>(false);

  const handleOnApprove = () => {
    console.log("Milestone approved");
    setMilestoneDetail((prev) => {
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
    console.log("Milestone rejected");
    setMilestoneDetail((prev) => {
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
       const fetchMilestoneDetails = () => {
         const milestone = milestoneRecords.find(
           (record) => record.id === Number(id)
         );
         setMilestoneDetail(milestone || null);
       };
       fetchMilestoneDetails();
     }
   }, [id]);

  useEffect(() => {
    setShowCtaButton(milestoneDetail?.status === "Pending");
    if (milestoneDetail) {
      setContractor(milestoneDetail.contractor);
      setContract(milestoneDetail.contract);
    }
  }, [milestoneDetail]);

  return (
    <div>
      <CtaHeader
        title="Milestone details"
        showCtaButton={showCtaButton}
        onApprove={handleOnApprove}
        onReject={handleOnReject}
      />
      <div className="p-4 space-y-4 dark:bg-gray-600">
        {milestoneDetail ? (
          <MilestoneDetailsComponent milestoneDetail={milestoneDetail} />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-white rounded-lg dark:bg-gray-500">
            <p className="text-gray-600 dark:text-gray-200">
              No milestone details found.
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

export default MilestoneDetailsPage;

