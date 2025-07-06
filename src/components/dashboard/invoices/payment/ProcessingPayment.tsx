import { PaymentProcessingIcon } from "../../../../assets/svg/svg";

const ProcessingPayment = () => {
  return (
    <>
      <div className="mx-auto w-fit animate-spin">
        <PaymentProcessingIcon />
      </div>

      <div className="text-center max-w-3/4 mx-auto">
        <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-150 mb-2">
          Sending...
        </h3>
        <p className="text-gray-400 dark:text-gray-200 text-sm">
          <span className="text-primary-200 dark:text-primary-400">5 USDC</span>{" "}
          to{" "}
          <span className="text-gray-500 dark:text-gray-150">
            0x6885afa...6f23b3
          </span>
        </p>
      </div>
    </>
  );
};

export default ProcessingPayment;
