import { Link } from "react-router-dom";
import { LinkIcon, NotebookIcon, Profile } from "../../../assets/svg/svg";
import { FC } from "react";
import CtaButton from "./CtaButton";
import useModal from "../../../hooks/useModal";
import RejectTimeSheetModal from "../../modal/RejectTimeSheetModal";
import { useScreenWidth } from "../../../utils/useScreenWidth";

// Types
interface Contractor {
  name: string;
  position: string;
  detailLink: string;
}

interface Contract {
  client: string;
  paymentType: string;
  contractLink: string;
}

interface PartiesInvolvedProps {
  contractor: Contractor;
  contract: Contract;
  onApprove?: () => void;
  onReject?: (reason: string) => void;
  showCtaButton?: boolean;
}

// Component
const PartiesInvolved: FC<PartiesInvolvedProps> = ({
  contractor,
  contract,
  onApprove,
  showCtaButton,
  onReject,
}) => {
  const { name, position, detailLink } = contractor;
  const { client, paymentType, contractLink } = contract;
  const screenSize = useScreenWidth();
  const { showCustomModal } = useModal();
  const handleShowModal = () => {
    showCustomModal(
      <RejectTimeSheetModal
        handleReject={(reason) => {
          onReject?.(reason);
        }}
      />,
      screenSize < 640 ? "full" : "md"
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col max-w-4xl gap-2 sm:gap-4 sm:flex-row">
        {/* Contract Details Card */}
        <div className="flex items-center gap-2 p-4 rounded-lg dark:bg-gray-500 sm:p-6 sm:gap-4 sm:w-1/2">
          <div className="p-3.5 rounded-lg flex items-center justify-between bg-primary-500 dark:bg-primary-600 text-primary-200 dark:text-primary-400">
            <NotebookIcon />
          </div>
          <div className="w-full">
            <p className="text-base font-medium sm:text-xl dark:text-gray-150">
              {client}
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-medium dark:text-gray-200">
                {paymentType}
              </p>
              <Link
                to={contractLink}
                className="flex items-center gap-1 text-xs font-medium transition duration-150 ease-in-out text-primary-200 hover:text-primary-300 dark:hover:text-primary-300 dark:text-primary-400"
              >
                <span>View contract</span>
                <LinkIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Contractor Details Card */}
        <div className="flex items-center gap-2 p-4 rounded-lg dark:bg-gray-500 sm:p-6 sm:gap-4 sm:w-1/2">
          <div className="p-3.5 rounded-lg flex items-center justify-between bg-primary-500 dark:bg-primary-600 text-primary-200 dark:text-primary-400">
            <Profile />
          </div>
          <div className="w-full">
            <p className="text-base font-medium sm:text-xl dark:text-gray-150">
              {name}
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-medium dark:text-gray-200">
                {position}
              </p>
              <Link
                to={detailLink}
                className="flex items-center gap-1 text-xs font-medium transition duration-150 ease-in-out text-primary-200 hover:text-primary-300 dark:hover:text-primary-300 dark:text-primary-400"
              >
                <span>View details</span>
                <LinkIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showCtaButton && (
        <div className="fixed left-0 w-full sm:block bottom-2 sm:static lg:hidden ">
          <CtaButton onApprove={onApprove} onReject={handleShowModal} />
        </div>
      )}
    </div>
  );
};

export default PartiesInvolved;
