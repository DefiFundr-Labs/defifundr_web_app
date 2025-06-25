import TitleHeader from "../../../common/dashboard/TitleHeader";
import { ReviewAndSign } from "../../../components/dashboard/contracts/ReviewAndSign";
export const ReviewSign = () => {
  return (
    <div className="h-full">
      <TitleHeader title="Create contract" isBackButton />

      <div className="p-2 bg-gray-100 sm:p-4 dark:bg-gray-500">
        <ReviewAndSign />
      </div>
    </div>
  );
};
