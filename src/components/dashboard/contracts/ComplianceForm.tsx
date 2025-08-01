import { useForm } from "react-hook-form";
import { PdfDocumentIcon } from "../../../assets/svg/svg";
import FormNavigation from "./createContract/FormNavigation";
import { ComplianceDetails } from "../../../types/types";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateComplianceDetails } from "../../../redux/slice/createContactFormSlice";

const COMPLIANCE_FORM_STORAGE_KEY = "complianceForm";
interface ComplianceFormProps {
  setStepper: (step: number) => void;
}
export const ComplianceForm: FC<ComplianceFormProps> = ({ setStepper }) => {
  const complianceFromRedux = useSelector(
    (state: RootState) => state.contractForm.complianceDetails
  );
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, reset } = useForm<ComplianceDetails>();

  useEffect(() => {
    const savedData = localStorage.getItem(COMPLIANCE_FORM_STORAGE_KEY);
    if (savedData) {
      reset(JSON.parse(savedData));
    } else if (Array.isArray(complianceFromRedux) && complianceFromRedux[0]) {
      reset(complianceFromRedux[0]);
    } else {
      reset({
        agreementType: "",
        agreement: null,
        additionalAgreement: "",
      });
    }
  }, [reset, complianceFromRedux]);

  const formValues = watch();

  useEffect(() => {
    localStorage.setItem(
      COMPLIANCE_FORM_STORAGE_KEY,
      JSON.stringify(formValues)
    );
  }, [formValues]);

  const handlePrev = () => {
    setStepper(4);
  };

  const next = (data: ComplianceDetails) => {
    dispatch(
      updateComplianceDetails({
        index: 0,
        ...data,
      })
    );
    setStepper(6);
  };

  return (
    <form className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 form-control--checkbox">
            <div className="relative flex-shrink-0 size-4">
              <input
                type="radio"
                {...register("agreementType")}
                value="standard"
                id="standardServiceAgreement"
                className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
              />
              <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <label
              htmlFor="standardServiceAgreement"
              className="pt-2 text-xs font-medium leading-4 text-gray-600 dark:text-gray-200"
            >
              Use our standard service agreement
            </label>
          </div>

          <div className="flex gap-2 sm:items-center form-control--checkbox">
            <div className="relative flex-shrink-0 size-4">
              <input
                type="radio"
                {...register("agreementType")}
                value="custom"
                id="customAgreement"
                className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
              />
              <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <label
              htmlFor="customAgreement"
              className="text-xs font-medium leading-4 text-gray-600 sm:pt-2 dark:text-gray-200"
            >
              Use your own custom agreement
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium leading-4 text-gray-600 dark:text-gray-200">
            Agreement file
          </p>
          <div className="border border-gray-150 dark:border-gray-250 py-4.5 px-3.5 rounded-lg flex max-w-lg justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PdfDocumentIcon />
              <div className="space-y-1">
                <p className="text-base font-semibold text-gray-600 dark:text-gray-150">
                  Standard Agreement
                </p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
                  <p>PDF format</p>
                  <span className="rounded-full size-1 dark:bg-gray-300"></span>
                  <p>13MB</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer dark:text-primary-400 dark:bg-primary-50 bg-primary-500 text-primary-200"
            >
              Preview
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-150">
            Additional terms (optional)
          </p>
          <div className="form-control">
            <label
              htmlFor="additionalAgreement"
              className="text-xs font-medium text-gray-400 dark:text-gray-150"
            >
              Terms
            </label>
            <textarea
              {...register("additionalAgreement")}
              id="additionalAgreement"
              className="resize-none h-28"
            />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-150">
              Add additional terms to cover special scenarios. These terms will
              be applied to the Service Agreement Template or uploaded contract
              and override existing contract terms.
            </p>
          </div>
        </div>
      </div>

      <FormNavigation
        isNextDisable={false}
        handlePrev={handlePrev}
        handleNext={handleSubmit(next)}
      />
    </form>
  );
};
