import { Check } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface FormCheckboxProps {
  id: string;
  label: React.ReactNode;
  register: UseFormRegister<any>;
  hasError?: boolean;
  errorMessage?: string;
}

const FormCheckbox = ({
  id,
  label,
  register,
  hasError = false,
  errorMessage,
}: FormCheckboxProps) => {
  return (
    <div className="relative flex gap-2">
      <div className="relative size-5">
        <input
          type="checkbox"
          id={id}
          className={
            "border-2 rounded appearance-none size-5 peer checked:border-0 checked:bg-primary-200 " +
            (hasError ? "border-error-500" : "border-gray-150")
          }
          {...register(id)}
        />
        <div className="absolute inset-0 items-center justify-center hidden pointer-events-none peer-checked:flex">
          <Check className="text-white size-3 stroke-3 dark:text-gray-600" />
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="text-xs font-medium text-gray-400 dark:text-gray-200"
        >
          {label}
        </label>
        {hasError && errorMessage && (
          <ErrorMessage errorMessage={errorMessage} />
        )}
      </div>
    </div>
  );
};

export default FormCheckbox;
