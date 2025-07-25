import { useForm } from "react-hook-form";
import FormSelectInput from "../../../form/FormSelectInput";
import FormInput from "../../../form/FormInput";
import FormNavigation from "./FormNavigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { updateContractForm } from "../../../../redux/slice/createContactFormSlice";
import useModal from "../../../../hooks/useModal";
import { ScopeTemplateModal } from "../../../modal/ScopeTemplateModal";
import { jobScopes } from "../../../../data/jobScope";
import { JobScopeProps } from "../../../../types/types";

type ProjectDetailsFormValues = {
  projectTitle: string;
  jobRole: string;
  scope: string;
};

type ProjectDetailsProps = {
  setStepper: (nextStep: number) => void;
};

const FORM_DATA_KEY = "contract_form_data_project_details";

export const ProjectDetailsForm: FC<ProjectDetailsProps> = ({ setStepper }) => {
  const dispatch = useDispatch();

  const savedData = localStorage.getItem(FORM_DATA_KEY);
  const parsedSavedData: ProjectDetailsFormValues | null = savedData
    ? JSON.parse(savedData)
    : null;

  const { register, handleSubmit, watch, setValue } =
    useForm<ProjectDetailsFormValues>({
      defaultValues: {
        projectTitle: parsedSavedData?.projectTitle || "",
        jobRole: parsedSavedData?.jobRole || "",
        scope: parsedSavedData?.scope || "",
      },
    });

  const [selectedJobScope, setSelectedJobScope] =
    useState<JobScopeProps | null>(
      parsedSavedData
        ? { scope: parsedSavedData.scope, jobRole: parsedSavedData.jobRole }
        : null
    );

  const { showContentOnlyModal } = useModal();

  const openSelectModal = () => {
    showContentOnlyModal(
      <ScopeTemplateModal
        selectedJobScope={selectedJobScope}
        setSelectedJobScope={setSelectedJobScope}
      />,
      {
        showButtons: true,
        size: "md",
        buttons: [
          {
            text: "Create new template",
            variant: "primary",
            className: "bg-primary-400",
            onClick: () => {
              console.log("Creating new template...");
            },
          },
        ],
        showCloseButton: true,
      }
    );
  };

  // Watch form values and save to localStorage automatically
  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Update selected scope from modal
  useEffect(() => {
    if (selectedJobScope) {
      setValue("scope", selectedJobScope.scope);
      setValue("jobRole", selectedJobScope.jobRole);
    }
  }, [selectedJobScope, setValue]);

  const handleNext = (data: ProjectDetailsFormValues) => {
    dispatch(updateContractForm(data));
    setStepper(3);
  };

  const jobRoleOptions = jobScopes.map((scope) => scope.jobRole);

  const jobRole = watch("jobRole");
  const projectTitle = watch("projectTitle");
  const scope = watch("scope");

  return (
    <form className="space-y-6">
      <div className="flex flex-col items-center w-full gap-6 sm:flex-row">
        <div className="w-full form-control">
          <FormInput
            label="Project title"
            register={register}
            id="projectTitle"
            placeholder="Project title"
          />
        </div>

        <div className="w-full form-control">
          <FormSelectInput
            id="jobRole"
            label="Job role"
            options={jobRoleOptions}
            register={register}
            placeholder="Select"
          />
        </div>
      </div>

      <div className="form-control">
        <div className="flex items-center justify-between">
          <label htmlFor="scope">Scope of work</label>
          <button
            className="cursor-pointer text-primary-200"
            onClick={openSelectModal}
            type="button"
          >
            Select
          </button>
        </div>
        <textarea
          id="scope"
          placeholder="Scope details"
          className="resize-none min-h-36 max-h-36"
          {...register("scope")}
        />
      </div>

      <FormNavigation
        handlePrev={() => setStepper(1)}
        handleNext={handleSubmit(handleNext)}
        isNextDisable={!(jobRole && projectTitle && scope)}
      />
    </form>
  );
};
