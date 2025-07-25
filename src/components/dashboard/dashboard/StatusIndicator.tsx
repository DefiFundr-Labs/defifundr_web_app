import { FC } from "react";
import { Check, ForwardArrow } from "../../../assets/svg/svg";

interface StatusIndicatorProps {
  isChecked: boolean;
  text: string;
}

const StatusIndicator: FC<StatusIndicatorProps> = ({ isChecked, text }) => {
  return (
    <div className="rounded bg-black/20 border border-primary-300 px-4 flex items-center justify-between w-full h-12 text-sm text-gray-50 gap-2">
      <span className="truncate w-full">{text}</span>
      {isChecked ? (
        <Check />
      ) : (
        <ForwardArrow />
      )}
    </div>
  );
};

export default StatusIndicator;
