import { useState, useRef, useEffect, ReactNode } from "react";
import { Dispatch, SetStateAction } from "react";
import { ChevronDown } from "lucide-react";
import { FormInputProps } from "../../types/types";
import { FieldValues } from "react-hook-form";

type Currency = {
  symbol: ReactNode;
  name: string;
};

interface CurrencyDropdownProps<T extends FieldValues>
  extends FormInputProps<T> {
  selectedCurrency: string;
  setSelectedCurrency: Dispatch<SetStateAction<string>>;
  currencies: Currency[];
  setValue: any;
  trigger: any;
}

const CurrencyDropdown = <T extends FieldValues>({
  id,
  label,
  placeholder,
  trigger,
  setValue,
  selectedCurrency,
  setSelectedCurrency,
  currencies,
}: CurrencyDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = currencies.find((c) => c.name === selectedCurrency);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (currency: string) => {
    setSelectedCurrency(currency);
    setValue(id, currency, { shouldValidate: true });
    trigger(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full min-h-14 " ref={dropdownRef}>
      {label && <label htmlFor={id}>{label}</label>}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center px-3.5 py-3 justify-between space-x-1 rounded-lg border  bg-gray-100 dark:bg-transparent dark:border-gray-400  text-sm font-medium text-gray-400 transition-all duration-200  focus:outline-none ${
          isOpen ? "border-primary-200" : "border-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          {selectedOption ? (
            <div className="flex items-center gap-1">
              <span>{selectedOption?.symbol}</span>
              <span>{selectedOption?.name}</span>
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 w-full mt-1 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg top-full">
          {currencies.map((currency) => (
            <button
              key={currency.name}
              onClick={() => handleSelect(currency.name)}
              className={`flex w-full items-center gap-3 px-4.5 py-3.5 min-h-14 text-left transition-colors hover:bg-gray-100 ${
                selectedCurrency === currency.symbol ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-1">
                <div className="font-medium text-gray-900 dark:text-gray-200">
                  {currency.symbol}
                </div>
                <div className="text-xs  text-gray-900 dark:text-gray-200 text-nowrap">
                  {currency.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
