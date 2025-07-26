import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { CreateContractFormProps } from "../redux/slice/createContactFormSlice";
import { RootState } from "../redux/store";

export const FORM_DATA_KEY = "contract_form_data";
export const FORM_STEP_KEY = "contract_form_step";

export const useFormLocalStorage = () => {
  const currentFormState = useSelector(
    (state: RootState) => state.contractForm
  );

  // Auto-save to localStorage whenever form state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(FORM_DATA_KEY, JSON.stringify(currentFormState));
      } catch (error) {
        console.error("Failed to auto-save to localStorage:", error);
      }
    }, 500); // Debounce saves

    return () => clearTimeout(timeoutId);
  }, [currentFormState]);

  const loadSavedData = useCallback((): CreateContractFormProps | null => {
    try {
      const saved = localStorage.getItem(FORM_DATA_KEY);
      if (saved) {
        const parsedData: CreateContractFormProps = JSON.parse(saved);
        if (
          parsedData &&
          typeof parsedData === "object" &&
          parsedData.contractType
        ) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
    return null;
  }, []);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(FORM_DATA_KEY);
      localStorage.removeItem(FORM_STEP_KEY);
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  }, []);

  const saveStepToStorage = useCallback((step: number) => {
    try {
      localStorage.setItem(FORM_STEP_KEY, step.toString());
    } catch (error) {
      console.error("Failed to save step to localStorage:", error);
    }
  }, []);

  const loadStepFromStorage = useCallback((): number | null => {
    try {
      const savedStep = localStorage.getItem(FORM_STEP_KEY);
      if (savedStep) {
        const stepNumber = parseInt(savedStep, 10);
        if (stepNumber >= 1 && stepNumber <= 6) {
          return stepNumber;
        }
      }
    } catch (error) {
      console.error("Failed to load step from localStorage:", error);
    }
    return null;
  }, []);

  return {
    loadSavedData,
    clearStorage,
    saveStepToStorage,
    loadStepFromStorage,
  };
};
