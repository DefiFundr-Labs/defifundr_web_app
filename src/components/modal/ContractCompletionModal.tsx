import { Check, CopyIcon } from "lucide-react";
import { useState } from "react";
import { CalendarCheckIcon } from "../../assets/svg/svg";

function ContractCompletionModal() {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipBoard = () => {
    navigator.clipboard
      .writeText("https://app.deffundr.co/id=96abbf24-34f6-4")
      .then(() => {
        setIsCopied(true);
      })
      .catch(() => {
        setIsCopied(false);
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopied(false);
        }, 500);
      });
  };
  return (
    <div className="pt-14 space-y-14">
      <div className="flex flex-col items-center space-y-9 ">
        <div className="p-3 rounded-full bg-radial from-primary-200 to-white/75 sm:size-30 ">
          <div className="flex items-center justify-center rounded-full bg-primary-100 size-full">
            <CalendarCheckIcon />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-bold text-gray-500 sm:text-3xl dark:text-gray-150">
            Contract created
          </p>
          <p className="max-w-xs text-xs font-medium text-center text-gray-400 dark:text-gray-200 text-pretty">
            The contract link has been shared with your client, and you can
            always resend it again from your contract page
          </p>
        </div>
        <div className="py-3.5 px-4.5 flex gap-2 dark:bg-gray-600 rounded-lg items-center bg-gray-100">
          <p className="text-sm font-semibold text-gray-500 truncate dark:text-gray-150">
            https://app.deffundr.co/id=96abbf24-34f6-4
          </p>
          <button
            onClick={handleCopyToClipBoard}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full cursor-pointer dark:bg-primary-50 dark:text-primary-400 bg-primary-500 text-primary-200"
          >
            <span>Copy</span>
            {isCopied ? (
              <Check size={16} className="dark:text-primary-200" />
            ) : (
              <CopyIcon className="dark:text-primary-200" size={16} />
            )}
          </button>
        </div>
      </div>
      <button className="w-full font-medium text-white rounded-full bg-primary-200 h-14">
        All done
      </button>
    </div>
  );
}

export default ContractCompletionModal;
