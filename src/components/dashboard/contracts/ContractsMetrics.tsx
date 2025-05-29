import { div } from "framer-motion/client";
import { JSX } from "react";

interface ContractsMetricsProps {
  title: string;
  value: string;
  subValue: string;
  icon: JSX.Element;
}

const ContractsMetrics = ({
  icon,
  subValue,
  title,
  value,
}: ContractsMetricsProps) => {
  return (
    <div>
      <div className="p-4 rounded-lg bg-white dark:bg-gray-600 min-w-60 lg:w-full h-full">
        <span className="flex justify-between text-xs font-medium">
          <p className=" text-gray-400 dark:text-gray-200">{title}</p>
          <p className="text-gray-300">This year</p>
        </span>

        <hr className="text-gray-150 dark:text-gray-250 my-4" />

        <div className="flex justify-between items-center">
          <span>
            <p className="font-bold text-gray-600 dark:text-gray-150 mb-1 text-2xl lg:text-4xl">
              {value}
            </p>
            <p className="text-sm font-medium text-gray-300">{subValue}</p>
          </span>

          <span className="text-primary-200 dark:text-primary-400">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default ContractsMetrics;
