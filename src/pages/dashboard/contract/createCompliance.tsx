import { useState } from "react";
import TitleHeader from "../../../common/dashboard/TitleHeader";
import { ComplianceForm } from "../../../components/dashboard/contracts/ComplianceForm";

function CreateCompliance() {
  // Add state to manage the stepper if needed
  const [, setCurrentStep] = useState(5); // Assuming compliance is step 5

  return (
    <div>
      <TitleHeader title="Create contract" isBackButton />
      <div className="p-2 bg-gray-100 sm:p-4 dark:bg-gray-500">
        <ComplianceForm setStepper={setCurrentStep} />
      </div>
    </div>
  );
}

export default CreateCompliance;
