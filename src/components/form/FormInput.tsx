import { FieldValues } from "react-hook-form";
import { FormInputProps } from "../../types/types";
import { useFormError } from "../../hooks/useFormError";
import ErrorMessage from "./ErrorMessage";

const FormInput = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  className = "",
  placeholder,
  required = false,
  type = "text",
  touched,
  validationRules,
  labelClass,
  readOnly,
}: FormInputProps<T>) => {
  const { message, hasError } = useFormError(error, touched);

  return (
    <div className="form-control">
      {label !== "" && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={(hasError ? "!border-error-500 " : "") + className}
        required={required}
        {...register(id, validationRules)}
        readOnly={readOnly}
      />

      <ErrorMessage isVisible={hasError} errorMessage={message} />
    </div>
  );
};

export default FormInput;
