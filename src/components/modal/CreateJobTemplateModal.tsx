import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import { jobScopes } from "../../data/jobScope";
type TemplateFormValue = {
  jobRole: string;
  scopeOfJob: string;
};
export const CreateJobTemplateModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateFormValue>();

  const onSubmit = (data: TemplateFormValue) => {
    console.log("Saved template:", data);
    const finalValue = {
      jobRole: data.jobRole,
      scope: data.scopeOfJob,
    };
    jobScopes.push(finalValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        label="Job role"
        id="jobRole"
        register={register}
        error={errors.jobRole}
        required
      />

      <div className="form-control">
        <label htmlFor="scopeOfJob" className="mb-1 text-sm text-gray-700">
          Scope of work
        </label>
        <textarea
          id="scopeOfJob"
          className="p-2 border rounded resize-none sm:min-h-36 sm:max-h-36"
          {...register("scopeOfJob", {
            required: "Scope of work is required",
          })}
        ></textarea>
        {errors.scopeOfJob && (
          <small className="mt-0.5 text-xs text-red-500">
            {errors.scopeOfJob.message}
          </small>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white capitalize transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 bg-primary-200 disabled:cursor-not-allowed"
        aria-label="save job template"
      >
        Save template
      </button>
    </form>
  );
};
