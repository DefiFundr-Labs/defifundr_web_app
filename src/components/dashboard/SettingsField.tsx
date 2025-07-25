import { ReactNode } from "react";

interface SettingsFieldProps {
  title: string;
  value?: ReactNode;
}

const SettingsField = ({ title, value }: SettingsFieldProps) => {
  return (
    <div className="px-2 py-3.5 flex gap-16 items-center justify-between bg-gray-100 dark:bg-gray-600 dark:even:bg-transparent even:bg-transparent text-sm overflow-hidden">
      <p className="font-medium text-sm text-gray-400 dark:text-gray-200 whitespace-nowrap">
        {title}
      </p>

      <p className="font-semibold text-gray-500 dark:text-gray-150 truncate">
        {value ? (typeof value === "string" ? value : value) : "--"}
      </p>
    </div>
  );
};

export default SettingsField;
