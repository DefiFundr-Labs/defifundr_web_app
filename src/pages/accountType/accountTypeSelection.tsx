import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { accountTypeOptions } from "../../utils/constant";
import arrowRight from "../../assets/arrow-right.svg";
import { AccountOption, AccountType } from "../../types/types";
import { useNavigate } from "react-router-dom";

export const AccountSelection = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(
    "business"
  );
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const accountOptions: AccountOption[] = useMemo(() => accountTypeOptions, []);

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, accountOptions.length);
  }, [accountOptions]);

  const setRef = (index: number) => (element: HTMLButtonElement | null) => {
    optionRefs.current[index] = element;
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex = (index + 1) % accountOptions.length;
        optionRefs.current[nextIndex]?.focus();
        setFocusedIndex(nextIndex);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const prevIndex = index - 1 < 0 ? accountOptions.length - 1 : index - 1;
        optionRefs.current[prevIndex]?.focus();
        setFocusedIndex(prevIndex);
        break;
      }
      case "Enter":
      case " ": // Space key
        event.preventDefault();
        setSelectedAccount(accountOptions[index].id);
        break;
    }
  };

  const handleContinue = () => {
    if (selectedAccount) {
      console.log("Selected account type:", selectedAccount);
      navigate(`${selectedAccount}`);
    }
  };

  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between h-full"
      >
        <div className="space-y-9">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-[28px] leading-[33.6px] -tracking-[0.37px] text-black font-semibold">
              What kind of account do you{" "}
              <br className="block md:hidden lg:block" />
              want to create?
            </h1>
            <p className="text-[#2D333C] text-base font-medium tracking-normal">
              Choose the account that best represents your usecase
            </p>
          </div>

          <div
            role="radiogroup"
            aria-labelledby="account-type-heading"
            className="space-y-4"
          >
            {accountOptions.map((option, index) => (
              <motion.button
                key={option.id}
                ref={setRef(index)}
                onClick={() => {
                  setSelectedAccount(option.id);
                  setFocusedIndex(index);
                }}
                onFocus={() => setFocusedIndex(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                role="radio"
                aria-checked={selectedAccount === option.id}
                tabIndex={focusedIndex === index ? 0 : -1}
                className={`w-full py-3.5 px-4 rounded-lg border-[0.75px] border-[#C6CCD5] text-left transition-colors opacity-40 focus:outline-none  focus:opacity-100 
                ${
                  selectedAccount === option.id
                    ? "border-[#5A42DE] bg-[#F9F5FF] opacity-100"
                    : "hover:opacity-100"
                }
              `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={false}
                animate={{
                  borderColor:
                    selectedAccount === option.id ? "#3B82F6" : "#E5E7EB",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={option.icon}
                      alt={option.title}
                      className="w-8 h-8"
                    />
                    <div>
                      <div className="font-semibold text-sm tracking-[1%] text-[#2D333C]">
                        {option.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {option.description}
                      </div>
                    </div>
                  </div>
                  <img src={arrowRight} alt="" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          onClick={handleContinue}
          disabled={!selectedAccount}
          className="button bg-gray-blue-900 text-white hover:bg-gray-blue-800 !w-full !py-[15.5px] transition-colors"
          whileHover={selectedAccount ? { scale: 1.01 } : {}}
          whileTap={selectedAccount ? { scale: 0.99 } : {}}
          initial={false}
          animate={{
            y: selectedAccount ? 0 : 10,
            opacity: selectedAccount ? 1 : 0.8,
          }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};
