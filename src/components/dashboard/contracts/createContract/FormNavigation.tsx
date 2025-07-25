interface FormNavigationProps {
  isNextDisable: boolean;
  handleNext?: () => void;
  handlePrev?: () => void;
  previousBtnText?: string;
  nextBtnText?: string;
}
function FormNavigation({
  isNextDisable = true,
  handleNext,
  handlePrev,
  previousBtnText = "prev",
  nextBtnText = "next",
}: FormNavigationProps) {
  return (
    <div className="flex w-full gap-2 sm:gap-4 ">
      <button
        type="button"
        className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-gray-500 capitalize transition duration-150 ease-in-out border border-gray-500 rounded-full outline-none cursor-pointer hover:bg-primary-200/12 focus:bg-primary-200/20 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400/12 dark:focus:bg-primary-400/20 h-14 "
        aria-label="back to previous form step"
        onClick={handlePrev}
      >
        {previousBtnText}
      </button>
      <button
        type="button"
        disabled={isNextDisable}
        onClick={handleNext}
        className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white capitalize transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 bg-primary-200 disabled:cursor-not-allowed"
        aria-label="move to the next form step"
      >
        {nextBtnText}
      </button>
    </div>
  );
}

export default FormNavigation;
