import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { FormPrivacyProps } from "../../types/types";
import { FieldValues } from "react-hook-form";
import { useFormError } from "../../hooks/useFormError";
import ErrorMessage from "./ErrorMessage";

const FormPrivacy = <T extends FieldValues>({
  register,
  touched,
  error,
  id,
}: FormPrivacyProps<T>) => {
  const { hasError, message } = useFormError(error, touched);

  return (
    <div className="relative flex gap-2">
      <div className="relative size-5">
        <input
          type="checkbox"
          id="agreeToTerms"
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
      <label
        htmlFor="agreeToTerms"
        className="text-xs font-medium text-gray-400 dark:text-gray-200"
      >
        By creating an account, I agree to our{" "}
        <Link
          to=""
          className="font-bold text-primary-200 dark:text-primary-400 hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to=""
          className="font-bold text-primary-200 dark:text-primary-400 hover:underline "
        >
          Privacy Policy
        </Link>{" "}
        and confirm that I am 18 years and older.
      </label>

      <ErrorMessage errorMessage={message} isVisible={hasError} />
    </div>
  );
};

export default FormPrivacy;
