import React from "react";

interface SelectCardProps {
  name: string;
  type: string;
  value: string;
  text: string;
  isChecked: boolean;
  handleOnClick: React.ChangeEventHandler<HTMLInputElement>;
}

function SelectCard({
  name,
  value,
  handleOnClick,
  text,
  type,
  isChecked,
}: SelectCardProps) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name={type}
        value={value}
        onChange={handleOnClick}
        className="hidden peer"
        checked={isChecked}
      />
      <div className="relative p-6 space-y-2 transition-colors bg-gray-100 border border-transparent rounded-lg peer-checked:border-primary-200 dark:peer-checked:bg-primary-50 dark:peer-checked:border-primary-400  peer-checked:bg-primary-500 dark:bg-gray-600">
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-150">
          {name}
        </p>
        <p className="max-w-xs text-sm font-medium text-gray-400 dark:text-gray-200">
          {text}
        </p>
      </div>
    </label>
  );
}

export default SelectCard;
