import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  NotebookIcon,
  SmallNotePadIcon,
} from "../../../assets/svg/svg";
interface ContractDetailCardProps {
  projectTitle: string;
  jobRole: string;
  startDate: string;
  endDate: string | undefined;
  scope: string;
  projectType: string;
  terminationDate: string;
}
function ContractDetailCard({
  endDate,
  jobRole,
  projectTitle,
  projectType,
  scope,
  startDate,
  terminationDate,
}: ContractDetailCardProps) {
  return (
    <div className="max-w-[53.8rem] space-y-4  px-4 py-6 sm:p-6">
      <div className="flex  gap-4">
        <div className="items-center justify-between hidden p-4 h-fit rounded-lg sm:flex bg-primary-500 dark:bg-primary-600 w-fit text-primary-200 dark:text-primary-400 ">
          <NotebookIcon />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-base font-semibold text-gray-600 sm:text-xl dark:text-gray-150 capitalize">
            {projectTitle}
          </p>
          <div className="flex gap-x-6 gap-y-2 [&>div]:flex [&>div]:items-center [&>div]:gap-1 [&>div]:text-sm [&>div]:font-medium [&>div]:text-gray-500 flex-wrap dark:[&>div]:text-gray-150">
            <div className="border border-white bg-gray-100 dark:border-gray-700 px-3 py-1 rounded-full dark:bg-gray-600">
              <SmallNotePadIcon />
              <p>{projectType}</p>
            </div>
            <div className="border border-white bg-gray-100 dark:border-gray-700 px-3 py-1 rounded-full dark:bg-gray-600">
              <BriefcaseIcon />
              <p>{jobRole}</p>
            </div>
            <div className="border border-white bg-gray-100 dark:border-gray-700 px-3 py-1 rounded-full dark:bg-gray-600">
              <CalendarIcon />
              <p>
                {startDate} {endDate ? "-" + endDate : null}
              </p>
            </div>
            <div className="border border-white bg-gray-100 dark:border-gray-700 px-3 py-1 rounded-full dark:bg-gray-600">
              <ClockIcon />
              {terminationDate ? <p>{terminationDate} days notice</p> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
          Scope of work
        </p>
        <div className="py-4.5 px-3.5 bg-gray-100 dark:bg-gray-600 rounded-lg [&>p]:text-sm [&>p]:text-gray-600 dark:[&>p]:text-gray-150 [&>p]:font-semibold space-y-3">
          <p>{scope}</p>
        </div>
      </div>
    </div>
  );
}

export default ContractDetailCard;
