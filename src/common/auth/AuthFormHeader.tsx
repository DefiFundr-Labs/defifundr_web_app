import { FC } from "react";
import { AuthFormHeaderProps } from "../../types/types";
import Stepper from "../Stepper";
import { useLocation } from "react-router-dom";

interface ExtendedAuthFormHeaderProps extends AuthFormHeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

export const AuthFormHeader: FC<ExtendedAuthFormHeaderProps> = ({
  title,
  description,
  currentStep = 1,
  totalSteps = 4,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Only show stepper for specific routes
  const showStepper = [
    "/auth/create-account",
    "/auth/create-password",
    "/auth/onboarding/select-account-type",
    "/auth/onboarding/add-business-details",
  ].includes(currentPath);

  return (
    <article className="space-y-2 ">
      {showStepper && (
        <Stepper currentStep={currentStep} totalSteps={totalSteps} />
      )}
      <h2 className="text-gray-600 h2 dark:text-gray-150 ">{title}</h2>
      <p className="max-w-md text-xs font-medium text-gray-400 sm:text-base in-dark:text-gray-200">
        {description}
      </p>
    </article>
  );
};
