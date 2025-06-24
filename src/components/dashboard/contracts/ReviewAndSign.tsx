import { useState } from "react";
import { Accordion } from "../../../common/dashboard/Accordion";
import Stepper from "../../../common/Stepper";
import ContractDetailCard from "./ContractDetailCard";
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  NotebookIcon,
  SmallNotePadIcon,
} from "../../../assets/svg/svg";
import { ContractDetailHeader } from "./ContractDetailHeader";
type AccordionSection =
  | "Project details"
  | "Employee details"
  | "Payment"
  | "Compliance";

export const ReviewAndSign = () => {
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
  return (
    <div className="max-w-4xl p-6 space-y-6 bg-white rounded-lg dark:bg-gray-600">
      <div>
        <div>
          <p className="text-base font-semibold text-gray-400 sm:text-xl dark:text-gray-200">
            Review & Sign
          </p>
          <Stepper currentStep={6} totalSteps={6} />
        </div>
        <div className="space-y-2">
          <div className="border rounded-lg border-gray-250">
            <Accordion
              title="Project details"
              isOpen={activeAccordion["Project details"]}
              handleOpen={() => handleAccordion("Project details")}
            >
              <ContractDetailCard />
            </Accordion>
          </div>
          <div className="border rounded-lg border-gray-250 ">
            <Accordion
              title="Employee details"
              isOpen={activeAccordion["Employee details"]}
              handleOpen={() => handleAccordion("Employee details")}
            >
              <ContractDetailHeader />
            </Accordion>
          </div>
          <div className="border rounded-lg border-gray-250">
            <Accordion
              title="Payment"
              isOpen={activeAccordion["Payment"]}
              handleOpen={() => handleAccordion("Payment")}
            >
              <ContractDetailCard />
            </Accordion>
          </div>
          <div className="border rounded-lg border-gray-250">
            <Accordion
              title="Compliance"
              isOpen={activeAccordion["Compliance"]}
              handleOpen={() => handleAccordion("Compliance")}
            >
              <ContractDetailCard />
            </Accordion>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 ">
        <div className="flex-1 h-14">
          <button className="button--outline button !w-full !h-full">
            Prev{" "}
          </button>
        </div>
        <div className="flex-1 h-14">
          <button className="button--secondary button !w-full !h-full">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
