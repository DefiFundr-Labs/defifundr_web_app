import { CancelIcon } from "../../assets/svg/svg";
import useModal from "../../hooks/useModal";
import ReviewAndSignModal from "./ReviewAndSignModal";

function ContractReviewModal() {
  const { showEnhancedModal, hideModal } = useModal();

  const openReviewAndSignModal = () => {
    showEnhancedModal(<ReviewAndSignModal />, {
      size: "lg",
      showCloseButton: false,
    });
  };
  return (
    <div className="relative flex flex-col h-svh sm:h-fit">
      <div className="pb-4 space-y-2 bg-white sm:pb-8 dark:bg-gray-500">
        <div className="flex flex-row gap-2.5 sm:flex-col sm:gap-8">
          <button onClick={hideModal} className="self-start ">
            <div className="hidden sm:flex">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.4532 6.66675L15.9998 14.1201L8.5465 6.66675L6.6665 8.54675L14.1198 16.0001L6.6665 23.4534L8.5465 25.3334L15.9998 17.8801L23.4532 25.3334L25.3332 23.4534L17.8798 16.0001L25.3332 8.54675L23.4532 6.66675Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className=" sm:hidden">
              <CancelIcon />
            </div>
          </button>
          <p className="text-lg font-semibold text-gray-500 text-nowrap sm:text-center sm:text-3xl dark:text-gray-150 ">
            Design Services Agreement
          </p>
        </div>
        <p className="text-xs font-medium text-center text-gray-400 text-pretty dark:text-gray-200">
          This Design Service Agreement (the "Agreement") is made and entered
          into on 21 Dec 2022 by and between [Client Name] ("Client") and
          [Designer name] ("Contractor").
        </p>
      </div>
      <div className="overflow-y-scroll mx-2 mt-2 sm:mx-0 sm:mt-0 rounded-lg sm:rounded-none custom-scrollbar sm:!py-6 sm:max-h-80 py-4">
        <ol className="pl-4 space-y-4 list-decimal ">
          <li className="space-y-2">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
              Purpose
            </p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
              The purpose of this Agreement is to outline the terms and
              conditions for the branding and web design services to be provided
              by Contractor to Client.
            </p>
          </li>

          <li className="space-y-2">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
              Scope of work
            </p>
            <div>
              <div>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                  Contractor will provide the following services to Client:
                </p>
                <ul className="pl-5 space-y-1 text-xs font-medium text-gray-400 list-disc dark:text-gray-200">
                  <li>
                    Branding services including brand strategy consultation,
                    logo design, brand guidelines, and other branding materials
                    as agreed upon by both parties.
                  </li>
                  <li>
                    Web design services, including the design and development of
                    a new website for the Client.
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li className="space-y-2">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
              Deliverables
            </p>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                Contractor will deliver the following to Client:
              </p>
              <ul className="pl-5 space-y-1 text-xs font-medium text-gray-400 list-disc dark:text-gray-200">
                <li>A completed, fully-functional website.</li>
                <li>
                  All source files for the website, including design files and
                  code.
                </li>
                <li>Any branding materials as agreed upon by both parties.</li>
              </ul>
            </div>
          </li>

          <li className="space-y-2">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
              Payment Terms
            </p>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                The Client will pay the Contractor the total agreed sum,
                outlined in the project package, for the completion of the scope
                of work outlined in this Agreement. This fee shall be paid in
                the following installments:
              </p>
              <ul className="pl-5 space-y-1 text-xs font-medium text-gray-400 list-disc dark:text-gray-200">
                <li>50% payment due on acceptance of agreement.</li>
                <li>25% payment due on completion of brand design work.</li>
                <li>25% payment due on completion of web design work.</li>
              </ul>
            </div>
          </li>

          <li className="space-y-2">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
              Ongoing Costs
            </p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
              Client will be responsible for any ongoing subscription costs
              associated with the website, including hosting and any necessary
              updates or maintenance.
            </p>
          </li>
        </ol>
      </div>

      <div className="w-full py-6 bg-white sm:py-8 dark:bg-gray-500">
        <button
          onClick={() => {
            openReviewAndSignModal();
          }}
          className="w-full p-2 font-medium text-white rounded-full h-14 bg-primary-200 hover:opacity-90"
        >
          Sign contract
        </button>
      </div>
    </div>
  );
}

export default ContractReviewModal;
