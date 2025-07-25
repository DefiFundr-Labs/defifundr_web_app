import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addMilestone,
  updateMilestone,
  type MilestoneDetails,
} from "../../redux/slice/createContactFormSlice";
import FormInput from "../form/FormInput";
import DatePicker from "../form/DatePicker";
import ErrorMessage from "../form/ErrorMessage";

type MilestoneFormData = {
  title: string;
  description: string;
  amount: string;
  dueDate: string;
};

interface AddMilestoneModalProps {
  onClose?: () => void;
  onSuccess?: () => void;
  editingMilestone?: MilestoneDetails | null;
}

export const AddMilestoneModal = ({
  onClose,
  onSuccess,
  editingMilestone,
}: AddMilestoneModalProps) => {
  const dispatch = useDispatch();
  const isEditing = !!editingMilestone;

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<MilestoneFormData>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      dueDate: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set form values when editing
  useEffect(() => {
    if (editingMilestone) {
      reset({
        title: editingMilestone.title || "",
        description: editingMilestone.description || "",
        amount: editingMilestone.amount || "",
        dueDate: editingMilestone.dueDate || "",
      });
    }
  }, [editingMilestone, reset]);

  // Watch form values for validation
  const title = watch("title");
  const amount = watch("amount");

  const onSubmit = async (data: MilestoneFormData) => {
    setIsSubmitting(true);

    try {
      if (isEditing && editingMilestone) {
        // Update existing milestone
        const updates: Partial<MilestoneDetails> = {
          title: data.title,
          description: data.description,
          amount: data.amount,
          dueDate: data.dueDate || undefined,
        };

        dispatch(
          updateMilestone({
            id: editingMilestone.id,
            updates,
          })
        );
      } else {
        // Create new milestone
        const newMilestone: MilestoneDetails = {
          id: Date.now() + Math.random(), // Ensure unique ID
          title: data.title,
          description: data.description,
          amount: data.amount,
          dueDate: data.dueDate || undefined,
          createdAt: new Date().toISOString(),
        };

        dispatch(addMilestone(newMilestone));
      }

      // Success callback
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "adding"} milestone:`,
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim() !== "" && amount.trim() !== "";

  return (
    <div className="w-full max-w-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {isEditing ? "Edit Milestone" : "Add Milestone"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isEditing
            ? "Update the milestone details below."
            : "Define a milestone with specific deliverables and payment amount."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Milestone Title */}
        <FormInput
          id="title"
          label="Milestone title"
          register={register}
          placeholder="e.g., Design wireframes and prototypes"
          validationRules={{
            required: "Milestone title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters long",
            },
            maxLength: {
              value: 100,
              message: "Title must not exceed 100 characters",
            },
          }}
          error={errors.title}
          touched={touchedFields.title}
        />

        {/* Amount */}
        <FormInput
          id="amount"
          label="Payment amount"
          type="number"
          register={register}
          placeholder="0.00"
          validationRules={{
            required: "Payment amount is required",
            min: {
              value: 0.01,
              message: "Amount must be greater than 0",
            },
            max: {
              value: 1000000,
              message: "Amount cannot exceed 1,000,000",
            },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Please enter a valid amount (up to 2 decimal places)",
            },
          }}
          error={errors.amount}
          touched={touchedFields.amount}
        />

        {/* Due Date */}
        <DatePicker
          id="dueDate"
          label="Due date (optional)"
          register={register}
          setValue={setValue}
          trigger={trigger}
          placeholder="Select date"
          validationRules={{
            validate: (value) => {
              if (value && value !== "") {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                  return "Due date cannot be in the past";
                }
              }
              return true;
            },
          }}
          error={errors.dueDate}
          touched={touchedFields.dueDate}
        />

        {/* Description */}
        <div className="form-control">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              maxLength: {
                value: 900,
                message: "Description must not exceed 900 characters",
              },
            })}
            placeholder="Any additional details or requirements..."
            className="w-full min-h-16 max-h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-transparent resize-none text-sm"
            rows={2}
          />
          {errors.description && (
            <ErrorMessage
              isVisible={true}
              errorMessage={errors.description.message}
            />
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex-1 px-4 py-3 text-sm font-medium text-white bg-primary-200 rounded-full hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting
              ? `${isEditing ? "Updating" : "Adding"}...`
              : `${isEditing ? "Update" : "Add"} Milestone`}
          </button>
        </div>
      </form>
    </div>
  );
};
