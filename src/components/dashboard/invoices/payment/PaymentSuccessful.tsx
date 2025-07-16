import { PaymentSuccessfulIcon } from "../../../../assets/svg/svg";
import { motion } from "framer-motion";

const PaymentSuccessful = () => {
  return (
    <>
      <motion.div
        className="mx-auto w-fit"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.6,
        }}
      >
        <PaymentSuccessfulIcon />
      </motion.div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-150 mb-2">
          Succesful!
        </h3>
        <p className="text-gray-400 dark:text-gray-200 text-sm">
          <span className="text-primary-200 dark:text-primary-400">5 USDC</span>{" "}
          was successfully sent to{" "}
          <span className="text-gray-500 dark:text-gray-150">
            0x6885afa...6f23b3
          </span>
        </p>
      </div>
    </>
  );
};

export default PaymentSuccessful;
