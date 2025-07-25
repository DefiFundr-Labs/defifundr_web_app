import { FC, useEffect, useState } from "react";
import { Accordion } from "../../../common/dashboard/Accordion";
import ContractDetailCard from "./ContractDetailCard";
import { ContractDetailHeader } from "./ContractDetailHeader";
import FormNavigation from "./createContract/FormNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import EmployeeCard from "./EmployeCard";
import ComplianceCard from "./ComplianceCard";
import PaymentCard from "./PaymentCard";
import useModal from "../../../hooks/useModal";
import ContractReviewModal from "../../modal/ContractReviewModal";
import { useScreenWidth } from "../../../utils/useScreenWidth";
type AccordionSection =
  | "Project details"
  | "Employee details"
  | "Payment"
  | "Compliance";
interface ReviewAndSignProps {
  handleStepper?: (step: number) => void;
}
export const ReviewAndSign: FC<ReviewAndSignProps> = ({ handleStepper }) => {
  const isMobile = useScreenWidth();

  const contractForm = useSelector((state: RootState) => state.contractForm);
  const { showCustomModal, showEnhancedModal, hideModal } = useModal();
  const [activeAccordion, setActiveAccordion] = useState({
    "Project details": true,
    "Employee details": false,
    Payment: false,
    Compliance: false,
  });
  const handleAccordion = (name: AccordionSection) => {
    setActiveAccordion((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  const closeModal = () => {
    hideModal();
  };

  const OpenContractReviewModal = () => {
    showEnhancedModal(<ContractReviewModal />, {
      showCloseButton: false,
      size: "lg",
      onCancel: closeModal,
    });
  };

  useEffect(() => {
    console.log(contractForm);
  }, [contractForm]);

  return (
    <div className="space-y-8">
      <div>
        <div className="space-y-2">
          <div className="border rounded-lg border-gray-150 dark:border-gray-250">
            <Accordion
              title="Project details"
              isOpen={activeAccordion["Project details"]}
              handleOpen={() => handleAccordion("Project details")}
            >
              <ContractDetailCard
                projectTitle={contractForm.projectTitle}
                endDate={contractForm.contractDetails.endDate}
                jobRole={contractForm.jobRole}
                projectType={contractForm.contractType}
                startDate={contractForm.contractDetails.startDate}
                scope={contractForm.scope}
                terminationDate={contractForm.contractDetails.noticePeriod.toString()}
              />
            </Accordion>
          </div>
          <div className="border rounded-lg border-gray-150 dark:border-gray-250">
            <Accordion
              title="Employee details"
              isOpen={activeAccordion["Employee details"]}
              handleOpen={() => handleAccordion("Employee details")}
            >
              <EmployeeCard employeeDetails={contractForm.employeeDetails} />
            </Accordion>
          </div>
          <div className="border rounded-lg border-gray-150 dark:border-gray-250">
            <Accordion
              title={
                contractForm.contractType.toLowerCase() !==
                "milestone".toLowerCase()
                  ? "Payment details"
                  : "Payment details & Milestones"
              }
              isOpen={activeAccordion["Payment"]}
              handleOpen={() => handleAccordion("Payment")}
            >
              <PaymentCard
                contractDetails={contractForm.contractDetails}
                contractType={contractForm.contractType}
              />
            </Accordion>
          </div>
          <div className="border rounded-lg border-gray-150 dark:border-gray-250">
            <Accordion
              title="Compliance"
              isOpen={activeAccordion["Compliance"]}
              handleOpen={() => handleAccordion("Compliance")}
            >
              <ComplianceCard
                additionalAgreement={
                  contractForm.complianceDetails[0].additionalAgreement
                }
                agreement={null}
              />
            </Accordion>
          </div>
        </div>
      </div>
      <FormNavigation
        isNextDisable={false}
        handleNext={OpenContractReviewModal}
        nextBtnText="Next"
        handlePrev={() => {
          if (handleStepper) {
            handleStepper(5);
          }
        }}
      />
    </div>
  );
};
