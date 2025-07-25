import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stepper from "../../../../common/Stepper";
import ContractType from "./ContractType";
import { ProjectDetailsForm } from "./ProjectDetailsForm";
import { EmployeeForm } from "./EmployeeForm";
import { ContractDetails } from "./ContractDetails";
import { RootState } from "../../../../redux/store";
import {
  loadFromStorage,
  setFormStep,
} from "../../../../redux/slice/createContactFormSlice";
import { useFormLocalStorage } from "../../../../utils/useFormLocalStorage";
import { ComplianceForm } from "../ComplianceForm";
import { ReviewSign } from "../../../../pages/dashboard/contract/reviewAndSign";
import { PdfDocumentIcon } from "../../../../assets/svg/svg";
import { ReviewAndSign } from "../ReviewAndSign";

export const MultiStepForm = () => {
  const dispatch = useDispatch();
  const contractForm = useSelector((state: RootState) => state.contractForm);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { loadSavedData, loadStepFromStorage, saveStepToStorage } =
    useFormLocalStorage();

  // Initialize form from localStorage on mount
  useEffect(() => {
    const initializeForm = () => {
      const savedData = loadSavedData();
      const savedStep = loadStepFromStorage();

      if (savedData) {
        dispatch(loadFromStorage(savedData));
      }

      if (savedStep !== null) {
        setStep(savedStep);
        dispatch(setFormStep(savedStep));
      }

      setIsLoading(false);
    };

    initializeForm();
  }, [dispatch, loadSavedData, loadStepFromStorage]);

  // Save step whenever it changes
  const handleStepChange = (newStep: number) => {
    setStep(newStep);
    dispatch(setFormStep(newStep));
    saveStepToStorage(newStep);
  };

  const titles = [
    "Choose contract type",
    "Project details",
    "Employee details",
    "Contract details",
    "Compliance",
    "Review & Sign",
  ];

  const [contractType, setContractType] = useState(
    contractForm.contractType || ""
  );

  // Update contractType when Redux state changes (from localStorage)
  useEffect(() => {
    if (contractForm.contractType) {
      setContractType(contractForm.contractType);
    }
  }, [contractForm.contractType]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl p-4 space-y-8 bg-white rounded-lg sm:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-4 space-y-8 bg-white rounded-lg sm:p-6 dark:bg-gray-500">
      <div className="space-y-2 sm:space-y-4">
        <h2 className="text-base font-semibold text-gray-400 sm:text-xl dark:text-gray-200">
          {titles[step - 1]}
        </h2>
        <Stepper currentStep={step} totalSteps={6} />
      </div>

      <div>
        {step === 1 && (
          <ContractType
            setContractType={setContractType}
            contractType={contractType}
            setStepper={handleStepChange}
          />
        )}
        {step === 2 && <ProjectDetailsForm setStepper={handleStepChange} />}
        {step === 3 && <EmployeeForm setStepper={handleStepChange} />}
        {step === 4 && <ContractDetails setStepper={handleStepChange} />}
        {step === 5 && <ComplianceForm setStepper={handleStepChange} />}
        {step === 6 && <ReviewAndSign handleStepper={handleStepChange} />}
      </div>
    </div>
  );
};
