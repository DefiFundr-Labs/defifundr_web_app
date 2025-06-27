import { ArrowLeft } from "lucide-react";
import useModal from "../../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import CtaButton from "./CtaButton";
import RejectTimeSheetModal from "../../modal/RejectTimeSheetModal";
import { SetStateAction, useEffect, useState } from "react";
import { useScreenWidth } from "../../../utils/useScreenWidth";
interface CtaHeaderProps {
  title: string;
  showCtaButton?: boolean;
  onApprove?: () => void;
  onReject?: (reason: string) => void;
}
function CtaHeader({
  title,
  showCtaButton,
  onApprove,
  onReject /* the reject functionality for the modal  */,
}: CtaHeaderProps) {
  const navigate = useNavigate();
  const screenSize = useScreenWidth();
  const handleBackButton = () => {
    navigate(-1);
  };

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
    <section className="sticky top-0 bg-white border-b z-5 border-gray-150 dark:border-gray-250 dark:bg-gray-600">
      <div className="flex items-center justify-between px-4 pt-6">
        <div className="pb-1 space-y-1">
          <button
            onClick={handleBackButton}
            className="flex items-center gap-1 text-xs font-medium text-gray-300 transition-colors duration-150 ease-in-out cursor-pointer hover:text-gray-200"
          >
            <span>
              <ArrowLeft size={16} />
            </span>
            Back
          </button>

          <div className="flex items-center justify-between gap-4">
            <h1 className="overflow-hidden text-2xl font-bold tracking-tight text-gray-600 truncate max-w-44 xs:max-w-56 dark:text-gray-150 whitespace-nowrap sm:text-4xl sm:max-w-full">
              {title}
            </h1>
          </div>
        </div>
        {showCtaButton && (
          <div className="hidden lg:inline-block">
            <CtaButton onApprove={onApprove} onReject={handleShowModal} />
          </div>
        )}
      </div>
    </section>
  );
}

export default CtaHeader;
