import { useState } from "react";
import { RemoveAddressIcon } from "../../../assets/svg/svg";
import { ClipLoader } from "react-spinners";
import useModal from "../../../hooks/useModal";

interface RemoveAddressModalProps {
  onDelete: () => void;
  walletName: string;
}

const RemoveAddressModal = ({
  onDelete,
  walletName,
}: RemoveAddressModalProps) => {
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
    <div className="w-full">
      <div className="my-14 gap-y-8 text-center flex flex-col items-center">
        <RemoveAddressIcon />
        <div>
          <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-150 mb-2">
            Remove address
          </h3>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
            Are you sure you want to
            <br />
            delete <span className="text-xs font-bold">{walletName}</span>{" "}
            address
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

export default RemoveAddressModal;
