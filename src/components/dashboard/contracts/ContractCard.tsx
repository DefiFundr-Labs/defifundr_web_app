import { CalendarIcon, EditNoteIcon } from "../../../assets/svg/svg";

interface ContractCardProps {
  title: string;
  amount: number;
  period: string;
  status: string;
}

const ContractCard = ({ amount, period, status, title }: ContractCardProps) => {
  const getColor = () => {
    switch (status) {
      case "Active":
        return "bg-success-300 text-success-500 dark:bg-success-300 dark:text-success-500";
      case "Completed":
        return "bg-info-500 text-info-300 dark:bg-info-400";
      case "In Review":
        return "bg-warning-300 text-warning-500 dark:bg-warning-400 ";
      case "Rejected":
        return "bg-error-400 text-error-500 dark:bg-error-300";
      default:
        break;
    }
  };

  let statusColor = getColor();

  return (
    <div className="bg-white dark:bg-gray-600 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="rounded-lg p-2.5 bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400">
          <EditNoteIcon />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-150 font-semibold">
          USD {amount.toLocaleString()}
        </p>
      </div>

      <p className="text-gray-600 font-semibold mb-2 dark:text-gray-150">
        {title}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-primary-200 dark:text-primary-400">
          <CalendarIcon />
        </span>

        <p className="text-gray-300 dark:text-gray-300 font-medium text-xs">
          {period}
        </p>
      </div>

      <hr className="my-4 text-gray-150 dark:text-gray-250" />

      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-150 text-sm font-semibold">
          Fixed rate
        </p>

        <p className={"py-1 px-2 rounded text-sm " + statusColor}>{status}</p>
      </div>
    </div>
  );
};

export default ContractCard;
