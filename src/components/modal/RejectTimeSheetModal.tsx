import { useState } from "react";

function RejectTimeSheetModal({
  handleReject,
}: {
  handleReject?: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  const onReject = () => {
    handleReject?.(reason);
  };

  return (
    <div className="w-screen h-svh sm:h-fit sm:w-full">
      <div className="p-2 space-y-8">
        <form className="w-full p-4 dark:bg-gray-500">
          <div className="form-control">
            <label htmlFor="reason">Reason(s)</label>
            <textarea
              name="reason"
              className="resize-none"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        </form>
        <button
          className="w-full dark:bg-primary-200 h-14 rounded-full text-base font-medium dark:text-white cursor-pointer dark:hover:bg-primary-100 transition ease-in-out duration-200"
          type="button"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
export default RejectTimeSheetModal;
