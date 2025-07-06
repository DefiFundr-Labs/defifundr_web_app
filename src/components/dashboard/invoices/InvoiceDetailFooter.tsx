import { Export, SolidArrowDownIcon } from "../../../assets/svg/svg";
import { InvoiceStatus } from "../../../types/types";

interface InvoiceDetailFooterProps {
  onApprove: () => void;
  onPayment: () => void;
  onExport?: () => void;
  onReject: () => void;
  status: InvoiceStatus;
  showButton: boolean;
}

const InvoiceDetailFooter = ({
  onApprove,
  status,
  onExport,
  showButton,
  onPayment,
  onReject,
}: InvoiceDetailFooterProps) => {
  const isApprove = status === "Approved";

  return (
    <section className="bg-white dark:bg-gray-500 py-4 px-6 fixed w-full bottom-0 lg:hidden block">
      {showButton && (
        <div className="static flex items-center w-full gap-2 sm:gap-4 lg:gap-2 lg:w-fit">
          <button
            aria-label="reject button"
            className="flex items-center justify-center w-full gap-1 px-4 py-2 font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-primary-200 border-primary-200 hover:bg-primary-200/12 focus:bg-primary-200/20 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400/12 dark:focus:bg-primary-400/20 lg:w-fit h-14 lg:h-10"
            onClick={onReject}
            type="button"
          >
            Reject
          </button>
          <button
            onClick={onApprove}
            type="button"
            className="flex items-center justify-center w-full gap-1 px-4 py-2 font-medium text-white transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 lg:h-10 bg-primary-200 lg:w-fit"
          >
            Approve
          </button>
        </div>
      )}

      {!showButton && status !== "Pending" && status !== "Rejected" && (
        <div className="static flex items-center w-full gap-2 px-4 sm:px-0 sm:gap-4 lg:gap-2 lg:w-fit">
          <button
            aria-label="reject button"
            className={
              "flex items-center justify-center gap-2 px-4 py-2 font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-primary-200 border-primary-200 hover:bg-primary-200/12 focus:bg-primary-200/20 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400/12 dark:focus:bg-primary-400/20  h-14 lg:h-10 " +
              (!isApprove ? "w-fit px-9 self-end ml-auto" : "w-full")
            }
            onClick={onExport}
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
              onClick={onPayment}
              type="button"
              className="flex items-center justify-center w-full gap-1 px-4 py-2 font-medium text-white transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 lg:h-10 bg-primary-200 lg:w-fit"
            >
              Make payment
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default InvoiceDetailFooter;
