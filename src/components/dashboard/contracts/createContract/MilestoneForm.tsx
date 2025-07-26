import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { RootState } from "../../../../redux/store";
import {
  removeMilestone,
  type MilestoneDetails,
} from "../../../../redux/slice/createContactFormSlice";
import useModal from "../../../../hooks/useModal";
import { AddMilestoneModal } from "../../../modal/AddMilestoneModal";
import {
  CalendarIcon,
  CoinIcon,
  EditIcon,
  TrashCanIcon,
} from "../../../../assets/svg/svg";

interface MilestoneItemProps {
  milestone: MilestoneDetails;
  index: number;
  onEdit: (milestone: MilestoneDetails) => void;
  onRemove: (id: number) => void;
}

const MilestoneItem = ({ milestone, onEdit, onRemove }: MilestoneItemProps) => {
  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    return isNaN(num)
      ? "0.00"
      : num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  return (
    <div className="gap-2 p-4 bg-gray-100 rounded-lg dark:bg-gray-600">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <p className="text-base font-semibold text-gray-500 capitalize dark:text-gray-150">
            {milestone.title}
          </p>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-gray-300">
              <CoinIcon />
              <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                {formatAmount(milestone.amount)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-gray-300">
              <CalendarIcon />
              <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                {milestone.dueDate}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(milestone)}
            className="flex items-center justify-center text-gray-500 transition duration-200 ease-in-out rounded-full cursor-pointer size-8 bg-gray-150 dark:bg-gray-250 dark:text-gray-100 hover:bg-gray-150/70 hover:text-gray-600"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={() => onRemove(milestone.id)}
            className="flex items-center justify-center transition duration-200 ease-in-out rounded-full cursor-pointer size-8 bg-error-400 dark:bg-error-300 text-error-500 hover:text-error-500/70 hover:bg-error-500/20"
          >
            <TrashCanIcon />
          </button>
        </div>
      </div>
      <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
        {milestone.description}
      </p>
    </div>
  );
};

export const MilestoneForm = () => {
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const contractDetails = useSelector(
    (state: RootState) => state.contractForm.contractDetails
  );
  const milestones = contractDetails.milestoneDetails || [];
  const [, setEditingMilestone] = useState<MilestoneDetails | null>(null);

  const handleAddMilestone = () => {
    setEditingMilestone(null);
    showModal({
      title: "Add New Milestone",
      customComponent: (
        <AddMilestoneModal
          onSuccess={() => {
            // Modal will close automatically
          }}
        />
      ),
      showButtons: false,
      showCloseButton: true,
      size: "lg",
    });
  };

  const handleEditMilestone = (milestone: MilestoneDetails) => {
    setEditingMilestone(milestone);
    showModal({
      title: "Edit Milestone",
      customComponent: (
        <AddMilestoneModal
          editingMilestone={milestone}
          onSuccess={() => {
            setEditingMilestone(null);
          }}
        />
      ),
      showButtons: false,
      showCloseButton: true,
      size: "lg",
    });
  };

  const handleRemoveMilestone = (id: number) => {
    dispatch(removeMilestone(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <p className="text-base font-semibold text-gray-500 text-nowrap dark:text-gray-150">
          Milestone details
        </p>
        <hr className="w-full border-b border-gray-150 dark:border-gray-250" />
      </div>

      {/* Milestones List */}
      <div
        className={`space-y-4 rounded-lg ${
          milestones.length === 0
            ? "bg-gray-100 dark:bg-gray-600 h-25 items-center w-full flex justify-center"
            : "items-center flex justify-center flex-col w-full"
        }`}
      >
        {milestones.length === 0 ? (
          <div className="text-center rounded-lg">
            <button
              type="button"
              onClick={handleAddMilestone}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold transition-colors rounded-full cursor-pointer text-primary-200 hover:text-primary-100 group dark:text-primary-400"
            >
              <Plus className="w-4 h-4 text-primary-200 group-hover:text-primary-100 dark:text-primary-400" />
              Add milestone
            </button>
          </div>
        ) : (
          <>
            <div className="grid w-full gap-4">
              {milestones.map((milestone, index) => (
                <MilestoneItem
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  onEdit={handleEditMilestone}
                  onRemove={handleRemoveMilestone}
                />
              ))}
            </div>

            {/* Add Another Milestone Button */}
            <button
              type="button"
              onClick={handleAddMilestone}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold transition-colors rounded-full cursor-pointer text-primary-200 hover:text-primary-100 group dark:text-primary-400"
            >
              <Plus className="w-4 h-4 text-primary-200 group-hover:text-primary-100 dark:text-primary-400" />
              <span className="font-medium">Add milestone</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
