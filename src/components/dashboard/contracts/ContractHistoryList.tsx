import { AnimatePresence, motion } from "framer-motion";

function ContractHistoryList() {
  const histories = [
    { amount: "100,000.00", date: "10th Nov, 2023", time: "12:00 PM" },
    { amount: "100,000.00", date: "10th Nov, 2023", time: "12:00 PM" },
    { amount: "100,000.00", date: "10th Nov, 2023", time: "12:00 PM" },
    { amount: "100,000.00", date: "10th Nov, 2023", time: "12:00 PM" },
    { amount: "100,000.00", date: "10th Nov, 2023", time: "12:00 PM" },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="contract-history"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="max-w-[53rem] bg-white dark:bg-gray-600 rounded-lg p-4 sm:p-6 space-y-4"
      >
        <p className="text-base font-semibold text-gray-600 dark:text-gray-150">
          Payment history
        </p>
        <table className="w-full border-collapse">
          <thead className="w-full px-4 py-3 bg-primary-600">
            <tr className="bg-primary-500 dark:bg-primary-600 [&>td]:text-gray-400 [&>td]:text-sm [&>td]:font-medium [&>td]:px-4 [&>td]:py-3">
              <td>Amount (USDT)</td>
              <td className="text-right">Timestamp</td>
            </tr>
          </thead>
          <tbody className="w-full border-collapse">
            {histories.map((hty, index) => (
              <tr
                key={index}
                className="w-full [&>td]:px-4 [&>td]:py-4 dark:border-b-gray-700  border-b-gray-150 [&>td]:border-collapse border-collapse border-b [&>td]:text-sm [&>td]:font-semibold"
              >
                <td className="">{hty.amount}</td>
                <td className="text-right border-collapse">
                  <div className="xs:whitespace-nowrap">
                    <p className="inline ">{hty.date}</p>
                    <span className="px-1">|</span>
                    <p className="inline">{hty.time}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </AnimatePresence>
  );
}

export default ContractHistoryList;
