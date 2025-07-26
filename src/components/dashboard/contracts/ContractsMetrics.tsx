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
      <div className="h-full p-4 bg-white rounded-lg dark:bg-gray-600 min-w-60 lg:w-full">
        <span className="flex justify-between text-xs font-medium">
          <p className="text-gray-400  dark:text-gray-200">{title}</p>
          <p className="text-gray-300">This year</p>
        </span>

        <hr className="my-4 text-gray-150 dark:text-gray-250" />

        <div className="flex items-center justify-between">
          <span>
            <p className="mb-1 text-2xl font-bold text-gray-600 dark:text-gray-150 lg:text-4xl">
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
