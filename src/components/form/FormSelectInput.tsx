import { FieldValues } from "react-hook-form";
import { FormSelectInputProps } from "../../types/types";
import { useFormError } from "../../hooks/useFormError";
import ErrorMessage from "./ErrorMessage";

const FormSelectInput = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  className = "",
  touched,
  options,
  placeholder,
}: FormSelectInputProps<T>) => {
  const { message, hasError } = useFormError(error, touched);

  return (
    <div className="form-control ">
      <label htmlFor="companySize">{label}</label>
      <select
        id="companySize"
        className={
          "invalid:!text-red-200 " +
          className +
          (hasError ? " !border-error-500 " : "")
        }
        {...register(id)}
      >
        {placeholder && (
          <option value="" className="">
            {placeholder}
          </option>
        )}
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <ErrorMessage isVisible={hasError} errorMessage={message} />
    </div>
  );
};

export default FormSelectInput;
