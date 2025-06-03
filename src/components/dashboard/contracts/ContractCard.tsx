import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleOnCardClick = () => {
    // Handle card click logic here, e.g., navigate to contract details
    navigate("/dashboard/team-contract");
  };

  return (
    <div
      onClick={handleOnCardClick}
      className="p-4 space-y-4 bg-white rounded-lg cursor-pointer dark:bg-gray-600"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-lg p-2.5 bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400">
          <EditNoteIcon />
        </div>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-150">
          USD {amount.toLocaleString()}
        </p>
      </div>

      <p className="mb-2 font-semibold text-gray-600 dark:text-gray-150">
        {title}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-primary-200 dark:text-primary-400">
          <CalendarIcon />
        </span>

        <p className="text-xs font-medium text-gray-300 dark:text-gray-300">
          {period}
        </p>
      </div>

      <hr className="my-4 text-gray-150 dark:text-gray-250" />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-150">
          Fixed rate
        </p>

        <p className={"py-1 px-2 rounded text-sm " + statusColor}>{status}</p>
      </div>
    </div>
  );
};

export default ContractCard;
