import { FieldValues } from "react-hook-form";
import { FormInputProps } from "../../types/types";
import { useFormError } from "../../hooks/useFormError";
import ErrorMessage from "./ErrorMessage";
import { ReactNode } from "react";

interface FormInputWithIconProps<T extends FieldValues>
  extends FormInputProps<T> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onIconClick?: () => void;
  iconClassName?: string;
}

const FormInputWithIcon = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  className = "",
  placeholder,
  required = false,
  type = "text",
  touched,
  leftIcon,
  rightIcon,
  onIconClick,
  iconClassName = "",
}: FormInputWithIconProps<T>) => {
  const { message, hasError } = useFormError(error, touched);

  const inputClasses = `
    ${hasError ? "!border-warning " : ""}
    ${leftIcon ? "pl-10 " : ""}
    ${rightIcon ? "pr-10 " : ""}
    ${className}
  `;

  return (
    <div className="form-control">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="relative">
        {leftIcon && (
          <div
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClassName} ${
              onIconClick ? "cursor-pointer" : ""
            }`}
            onClick={onIconClick}
          >
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          className={inputClasses}
          required={required}
          {...register(id)}
        />
        {rightIcon && (
          <div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClassName} ${
              onIconClick ? "cursor-pointer" : ""
            }`}
            onClick={onIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      <ErrorMessage isVisible={hasError} errorMessage={message} />
    </div>
  );
};

export default FormInputWithIcon;
