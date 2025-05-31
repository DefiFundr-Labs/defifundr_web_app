import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  NotebookIcon,
  SmallNotePadIcon,
} from "../../../assets/svg/svg";

export const ContractDetailHeader = () => {
  return (
    <div className="max-w-[53.8rem] space-y-4  px-4 py-6 sm:p-6">
      <div className="flex items-center gap-4">
        <div className="items-center justify-between hidden p-4 rounded-lg sm:flex bg-primary-500 dark:bg-primary-600 w-fit text-primary-200 dark:text-primary-400 ">
          <NotebookIcon />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-base font-semibold text-gray-600 sm:text-xl dark:text-gray-150">
            Insyder Website & Webapp Design
          </p>
          <div className="flex gap-x-6 gap-y-2 [&>div]:flex [&>div]:items-center [&>div]:gap-1 [&>div]:text-xs [&>div]:font-medium [&>div]:text-gray-600 flex-wrap dark:[&>div]:text-gray-200">
            <div>
              <SmallNotePadIcon />
              <p>Fixed rate</p>
            </div>
            <div>
              <BriefcaseIcon />
              <p>UI/UX Designer</p>
            </div>
            <div>
              <CalendarIcon />
              <p>25th Oct 22 - 25th Nov 22 </p>
            </div>
            <div>
              <ClockIcon />
              <p>14 days notice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
