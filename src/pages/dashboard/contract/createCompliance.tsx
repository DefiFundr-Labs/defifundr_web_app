import TitleHeader from "../../../common/dashboard/TitleHeader";
import { ComplianceForm } from "../../../components/dashboard/contracts/ComplianceForm";

function CreateCompliance() {
  return (
    <div>
      <TitleHeader title="Create contract" isBackButton />
      <div className="p-2 bg-gray-100 sm:p-4 dark:bg-gray-500">
        <ComplianceForm />
      </div>
    </div>
  );
}

export default CreateCompliance;
