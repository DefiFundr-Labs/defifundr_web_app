import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CtaButton from "../team-management/CtaButton";
import { Export, SolidArrowDownIcon } from "../../../assets/svg/svg";
import { InvoiceStatus } from "../../../types/types";

interface InvoiceHeaderProps {
  title: string;
  showCtaButton?: boolean;
  status?: InvoiceStatus;
  onApprove?: () => void;
  handlePayment?: () => void;
  handleExport?: () => void;
  handleReject?: () => void;
}
function InvoiceHeader({
  title,
  showCtaButton,
  onApprove,
  handleReject,
  handleExport,
  handlePayment,
  status,
}: InvoiceHeaderProps) {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const isApprove = status === "Approved";

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
            <CtaButton onApprove={onApprove} onReject={handleReject} />
          </div>
        )}

        {!showCtaButton && status !== "Pending" && (
          <div className="static hidden lg:flex items-center w-full gap-2 px-4 sm:px-0 sm:gap-4 lg:gap-2 lg:w-fit">
            <button
              aria-label="reject button"
              className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-primary-200 border-primary-200 hover:bg-primary-200/12 focus:bg-primary-200/20 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400/12 dark:focus:bg-primary-400/20 lg:w-fit h-14 lg:h-10"
              onClick={handleExport}
              type="button"
            >
              <span className="text-primary-200 dark:text-primary-400">
                <Export />
              </span>
              Export
              <span className="text-primary-200 dark:text-primary-400">
                <SolidArrowDownIcon />
              </span>
            </button>

            {isApprove && (
              <button
                onClick={handlePayment}
                type="button"
                className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 lg:h-10 bg-primary-200 lg:w-fit"
              >
                Make payment
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default InvoiceHeader;
