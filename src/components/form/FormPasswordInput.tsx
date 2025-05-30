import { FieldValues } from "react-hook-form";
import { FormInputProps } from "../../types/types";
import { useState } from "react";
import { EyeOff, EyeOn } from "../../assets/svg/svg";
import { useFormError } from "../../hooks/useFormError";
import ErrorMessage from "./ErrorMessage";

const FormPasswordInput = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  error,
  required = false,
  className = "",
  touched,
}: Omit<FormInputProps<T>, "type">) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { message, hasError } = useFormError(error, touched);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="form-control ">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          aria-invalid={error ? "true" : "false"}
          required={required}
          className={(hasError ? "!border-error-500 " : "") + className}
        />
        <div>
          <button
            type="button"
            className="absolute transform -translate-y-1/2 right-4.5 top-1/2 focus:outline-none cursor-pointer"
            aria-label="Toggle password visibility"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <EyeOn /> : <EyeOff />}
          </button>
        </div>
      </div>
      <ErrorMessage isVisible={hasError} errorMessage={message} />
    </div>
  );
};

export default FormPasswordInput;
