import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  NotebookIcon,
  SmallNotePadIcon,
} from "../../../assets/svg/svg";

function ContractDetailCard() {
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
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
          Scope of work
        </p>
        <div className="py-4.5 px-3.5 bg-gray-100 dark:bg-gray-500 rounded-lg [&>p]:text-sm [&>p]:text-gray-600 dark:[&>p]:text-gray-150 [&>p]:font-medium space-y-3">
          <p>
            Infrastructure Management: Manage and optimize cloud-based
            infrastructure, ensuring scalability and cost-effectiveness.
          </p>
          <p>
            CI/CD Pipeline Optimization: Improve and expand CI/CD pipelines to
            enable faster and more reliable code deployment.{" "}
          </p>
          <p>
            Scripting and Automation: Develop scripts and automation tools to
            streamline various DevOps processes.{" "}
          </p>
          <p>
            Containerization: Implement and manage containerization technologies
            like Docker and Kubernetes.{" "}
          </p>
          <p>
            Performance Optimization: Identify and resolve performance
            bottlenecks in applications and infrastructure.{" "}
          </p>
          <p>
            Disaster Recovery: Plan and implement disaster recovery and backup
            solutions for critical systems.{" "}
          </p>
          <p>
            DevOps Tools: Evaluate and integrate new DevOps tools to enhance
            efficiency and collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContractDetailCard;
