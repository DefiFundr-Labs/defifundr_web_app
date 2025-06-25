import { useNavigate } from "react-router-dom";
import { PdfDocumentIcon } from "../../../assets/svg/svg";
import Stepper from "../../../common/Stepper";

export const ComplianceForm = () => {
  const navigate = useNavigate();
  const handlePrev = () => {
    // Logic for handling the previous step
  };
  const handleCreate = () => {
    // Logic for creating the contract
    navigate("/dashboard/contract/review-and-sign");
  };
  return (
    <div className="max-w-4xl p-6 bg-white rounded-lg dark:bg-gray-600 ">
      <div>
        <p className="text-base font-semibold text-gray-400 sm:text-xl dark:text-gray-200">
          Compliance
        </p>
        <Stepper currentStep={5} totalSteps={6} />
      </div>
      <form className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 form-control--checkbox">
              {/* Radio button container */}
              <div className="relative flex-shrink-0 size-4">
                <input
                  type="radio"
                  id="standardServiceAgreement"
                  name="agreement"
                  className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                />
                <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Label text */}
              <label
                htmlFor="standardServiceAgreement"
                className="pt-2 text-xs font-medium leading-4 text-gray-600 dark:text-gray-200"
              >
                Use our standard service agreement
              </label>
            </div>
            <div className="flex gap-2 sm:items-center form-control--checkbox">
              {/* Radio button container */}
              <div className="relative flex-shrink-0 size-4">
                <input
                  type="radio"
                  id="customAgreement"
                  name="agreement"
                  className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                />
                <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Label text */}
              <label
                htmlFor="customAgreement"
                className="text-xs font-medium leading-4 text-gray-600 sm:pt-2 dark:text-gray-200"
              >
                Use your own custom agreement (For custom uploaded contracts,
                project details will appear in an addendum section attached to
                your PDF file.){" "}
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
                  <div className="flex items-center gap-1.5 text-xs font-medium  text-gray-300">
                    <p>PDF format</p>
                    <span className="rounded-full size-1 dark:bg-gray-300"></span>
                    <p>13MB</p>
                  </div>
                </div>
              </div>
              <div>
                <button className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer dark:text-primary-400 dark:bg-primary-50 bg-primary-500 text-primary-200">
                  Preview
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-150">
              Additional terms (optional)
            </p>
            <div className=" form-control">
              <label
                htmlFor="terms"
                className="text-xs font-medium text-gray-400 dark:text-gray-150"
              >
                Terms
              </label>
              <textarea
                name="terms"
                id="terms"
                className="resize-none h-28"
              ></textarea>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-150">
                Add additional terms to cover special scenarios. These terms
                will be applied to the Service Agreement Template or uploaded
                contract and override existing contract terms.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <div className="flex-1 h-14">
            <button
              type="button"
              className="button--outline button !w-full !h-full"
            >
              Prev{" "}
            </button>
          </div>
          <div className="flex-1 h-14">
            <button
              type="button"
              onClick={handleCreate}
              className="button--secondary button !w-full !h-full"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
