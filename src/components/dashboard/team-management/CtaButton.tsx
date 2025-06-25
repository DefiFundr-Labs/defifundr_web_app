import { CancelIcon, CheckMarkIcon } from "../../../assets/svg/svg";
interface CtaButtonProps {
  onReject?: () => void;
  onApprove?: () => void;
}
function CtaButton({ onReject, onApprove }: CtaButtonProps) {
  return (
    <div className="static flex items-center w-full gap-2 px-4 sm:px-0 sm:gap-4 lg:gap-2 lg:w-fit">
      <button
        aria-label="reject button"
        className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-primary-200 border-primary-200 hover:bg-primary-200/12 focus:bg-primary-200/20 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400/12 dark:focus:bg-primary-400/20 lg:w-fit h-14 lg:h-10"
        onClick={onReject}
        type="button"
      >
        Reject
        <CancelIcon />
      </button>
      <button
        onClick={onApprove}
        type="button"
        className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 lg:h-10 bg-primary-200 lg:w-fit"
      >
        Approve
        <CheckMarkIcon />
      </button>
    </div>
  );
}

export default CtaButton;
