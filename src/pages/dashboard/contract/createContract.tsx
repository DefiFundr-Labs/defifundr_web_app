import TitleHeader from "../../../common/dashboard/TitleHeader";
import { MultiStepForm } from "../../../components/dashboard/contracts/createContract/MultiStepForm";

export const CreateContract = () => {
  return (
    <div>
      <TitleHeader title="Create contract" isBackButton />
      <div className="p-2 bg-gray-100 sm:p-4 dark:bg-gray-600">
        <MultiStepForm />
      </div>
    </div>
  );
};
