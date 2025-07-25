import { ClipLoader } from "react-spinners";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import { CancelIcon, DeleteTemplateIcon } from "../../assets/svg/svg";

interface DeleteTemplateProps {
  onDelete: () => void;
  jobTitle: string;
}

const DeleteTemplate = ({ onDelete, jobTitle }: DeleteTemplateProps) => {
  const [loading, setLoading] = useState(false);

  const { hideModal } = useModal();

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      onDelete();
      setLoading(false);
      hideModal();
    }, 500);
  };
  return (
    <div className="space-y-14">
      <button onClick={hideModal} className="text-gray-500 cursor-pointer">
        <CancelIcon size={32} />
      </button>

      <div className="flex flex-col items-center gap-8">
        <DeleteTemplateIcon />

        <div className="text-center">
          <p className="text-3xl mb-2 font-bold text-gray-500 dark:text-gray-150 ">
            Warning
          </p>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
            You’re about to delete{" "}
            <span className="text-primary-200 dark:text-primary-400">
              {jobTitle}
            </span>
            <br />
            template. Continue with action?{" "}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-3 h-14">
        <button
          onClick={hideModal}
          className="button !w-full py-3 rounded-full border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="button !w-full py-3 rounded-full bg-primary-200 text-white hover:bg-primary-100 transition-colors duration-200"
        >
          {loading ? <ClipLoader color="white" size={20} /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteTemplate;
