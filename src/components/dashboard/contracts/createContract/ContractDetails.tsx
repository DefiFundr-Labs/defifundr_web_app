import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DatePicker from "../../../form/DatePicker";
import FormInput from "../../../form/FormInput";
import CurrencyDropdown from "../../../form/CurrencyDropdown";
import FormSelectInput from "../../../form/FormSelectInput";
import FormNavigation from "./FormNavigation";
import { EthereumIcon, UstdCoinIcon } from "../../../../assets/svg/svg";
import { RootState } from "../../../../redux/store";
import { updateContractForm } from "../../../../redux/slice/createContactFormSlice";
import { MilestoneForm } from "./MilestoneForm";
import { useFormLocalStorage } from "../../../../utils/useFormLocalStorage";

type ContractDetailsFormValues = {
  endDate?: string;
  startDate: string;
  noticePeriod: number;
  network: string;
  asset: string;
  totalAmount: string;
  invoiceFrequency: string;
  issueInvoice: string;
  paymentDue: string;
  firstPaymentType: "full" | "custom";
  firstPaymentDate: string;
  firstPaymentAmount: string;
  taxType: string;
  accountNumber: string;
  taxRate: string;
  requireDeposit: boolean;
  rateUnit: string;
};

interface ContractDetailsProps {
  setStepper: (step: number) => void;
}

const networkOptions = [
  { symbol: <EthereumIcon />, name: "Ethereum" },
  { symbol: <EthereumIcon />, name: "Stellar" },
  { symbol: <EthereumIcon />, name: "Bitcoin" },
];

const assetOptions = [{ symbol: <UstdCoinIcon />, name: "USDT" }];

const invoiceFrequencyOptions = ["Weekly", "Bi-weekly", "Monthly", "Quarterly"];

const issueInvoiceOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "1st of month",
  "15th of month",
  "Last day of month",
];

const paymentDueOptions = [
  "Immediately",
  "7 days",
  "14 days",
  "30 days",
  "45 days",
  "60 days",
];

const taxTypeOptions = ["VAT", "GST", "HST", "PST"];

const rateUnitOptions = ["Hourly", "Daily", "Weekly", "Per Deliverable"];
const CONTRACT_DETAILS_STORAGE_KEY = "contract_form_contract_details";

const savedData = localStorage.getItem(CONTRACT_DETAILS_STORAGE_KEY);
const parsedData: ContractDetailsFormValues | null = savedData
  ? JSON.parse(savedData)
  : null;

export const ContractDetails = ({ setStepper }: ContractDetailsProps) => {
  const dispatch = useDispatch();
  const contractForm = useSelector((state: RootState) => state.contractForm);
  const contractType = contractForm.contractType;
  const milestones = contractForm.contractDetails.milestoneDetails || [];
  const [localStorageData, setLocalStorageData] = useState<
    typeof contractForm | null
  >(null);
  const { loadSavedData } = useFormLocalStorage();
  useEffect(() => {
    setLocalStorageData(loadSavedData());
  }, []);
  const combinedContractDetails = localStorageData?.contractDetails
    ? localStorageData.contractDetails
    : contractForm.contractDetails;

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ContractDetailsFormValues>({
    mode: "onBlur",
    defaultValues: parsedData || {
      startDate: combinedContractDetails.startDate,
      endDate: combinedContractDetails.endDate,
      noticePeriod: combinedContractDetails.noticePeriod,
      network: combinedContractDetails.paymentDetails.network,
      asset: combinedContractDetails.paymentDetails.asset,
      totalAmount: combinedContractDetails.paymentDetails.amount,
      invoiceFrequency: combinedContractDetails.invoiceDetails.invoiceFrequency,
      issueInvoice: combinedContractDetails.invoiceDetails.issueInvoiceOn,
      paymentDue: combinedContractDetails.invoiceDetails.paymentDue,
      firstPaymentType: combinedContractDetails.firstInvoice.type,
      firstPaymentDate: combinedContractDetails.firstInvoice.date,
      firstPaymentAmount: combinedContractDetails.firstInvoice.amount,
      taxType: combinedContractDetails.taxDetails?.taxType || "",
      accountNumber: combinedContractDetails.taxDetails?.accountNumber || "",
      taxRate: combinedContractDetails.taxDetails?.taxRate || "",
      requireDeposit: combinedContractDetails.requireDeposit || false,
      rateUnit: combinedContractDetails.rateUnit || "hourly",
    },
  });
  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(
        CONTRACT_DETAILS_STORAGE_KEY,
        JSON.stringify(values)
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const startDateValue = watch("startDate");
  const firstPaymentType = watch("firstPaymentType");

  const [selectedNetwork, setSelectedNetwork] = useState(
    contractForm.contractDetails.paymentDetails.network ||
      networkOptions[0].name
  );
  const [selectedAsset, setSelectedAsset] = useState(
    contractForm.contractDetails.paymentDetails.asset || assetOptions[0].name
  );

  // Auto-calculate total amount for milestone contracts
  useEffect(() => {
    if (isMilestoneContract && milestones.length > 0) {
      const total = milestones.reduce(
        (sum, milestone) => sum + parseFloat(milestone.amount || "0"),
        0
      );
      setValue("totalAmount", total.toFixed(2));
    }
  }, [milestones, setValue]);

  const onSubmit = (data: ContractDetailsFormValues) => {
    // Update Redux store with form data
    setValue("network", selectedNetwork);
    setValue("asset", selectedAsset);
    dispatch(
      updateContractForm({
        contractDetails: {
          ...contractForm.contractDetails,
          startDate: data.startDate,
          endDate: data.endDate,
          noticePeriod: data.noticePeriod,
          paymentDetails: {
            network: data.network,
            asset: data.asset,
            amount: data.totalAmount,
          },
          invoiceDetails: {
            invoiceFrequency: data.invoiceFrequency,
            issueInvoiceOn: data.issueInvoice,
            paymentDue: data.paymentDue,
          },
          firstInvoice: {
            type: data.firstPaymentType,
            date: data.firstPaymentDate,
            amount: data.firstPaymentAmount,
          },
          taxDetails: {
            taxType: data.taxType,
            accountNumber: data.accountNumber,
            taxRate: data.taxRate,
          },
          requireDeposit: data.requireDeposit,
          rateUnit: data.rateUnit,
        },
      })
    );

    setStepper(5);
  };

  const isMilestoneContract =
    contractType.toLowerCase() === "milestone".toLowerCase();

  const isFormValid = () => {
    const requiredFields = [watch("startDate"), watch("noticePeriod")];

    if (isMilestoneContract) {
      // For milestone contracts, ensure at least one milestone exists
      return (
        requiredFields.every(
          (field) => field && field.toString().trim() !== ""
        ) &&
        milestones.length > 0 &&
        milestones.every((milestone) => milestone.title && milestone.amount)
      );
    } else {
      // For fixed rate and pay-as-you-go contracts, check total amount and invoice fields
      requiredFields.push(
        watch("totalAmount"),
        watch("invoiceFrequency"),
        watch("issueInvoice"),
        watch("paymentDue")
      );

      if (firstPaymentType === "custom") {
        requiredFields.push(
          watch("firstPaymentDate"),
          watch("firstPaymentAmount")
        );
      }

      return requiredFields.every(
        (field) => field && field.toString().trim() !== ""
      );
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Contract Dates Section */}
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <DatePicker
            label="Start date"
            id="startDate"
            register={register}
            setValue={setValue}
            error={errors.startDate}
            touched={touchedFields.startDate}
            placeholder="--"
            trigger={trigger}
            validationRules={{
              required: "Start date is required",
              validate: (val) => {
                const dateStr = String(val);
                if (dateStr && dateStr !== "--") {
                  const date = new Date(dateStr);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  if (isNaN(date.getTime())) {
                    return "Invalid start date";
                  }

                  if (date < today) {
                    return "Start date cannot be in the past";
                  }
                }
                return true;
              },
            }}
          />

          <DatePicker
            label="End date (optional)"
            id="endDate"
            register={register}
            setValue={setValue}
            error={errors.endDate}
            touched={touchedFields.endDate}
            trigger={trigger}
            placeholder="--"
            validationRules={{
              validate: (val) => {
                const dateStr = String(val);
                if (dateStr && dateStr !== "--" && startDateValue) {
                  const startDate = new Date(String(startDateValue));
                  const endDate = new Date(dateStr);

                  if (isNaN(startDate.getTime())) {
                    return "Pick a starting date first";
                  } else if (isNaN(endDate.getTime())) {
                    return "Invalid end date";
                  }

                  return (
                    endDate >= startDate || "End date must be after start date"
                  );
                }
                return true;
              },
            }}
          />
        </div>

        <div className="space-y-2 sm:max-w-102">
          <FormInput
            register={register}
            id="noticePeriod"
            label="Termination notice period (days)"
            type="number"
            validationRules={{
              required: "Termination notice period is required",
              min: { value: 0, message: "Must be 0 or greater" },
              max: { value: 365, message: "Cannot exceed 365 days" },
            }}
            error={errors.noticePeriod}
            touched={touchedFields.noticePeriod}
          />
          <p className="text-xs font-medium text-gray-400">
            Either party may terminate this contract by the specified notice,
            after which the contract will end.
          </p>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className="text-base font-semibold text-gray-500 text-nowrap dark:text-gray-150">
            Payment details
          </p>
          <hr className="w-full border-b border-gray-150 dark:border-gray-250" />
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="w-full">
            <CurrencyDropdown
              currencies={networkOptions}
              id="network"
              label="Network"
              selectedCurrency={selectedNetwork}
              setSelectedCurrency={setSelectedNetwork}
              setValue={setValue}
              trigger={trigger}
              placeholder="Ethereum"
              register={register}
            />
          </div>
          <div className="flex items-center w-full gap-2">
            <div className="max-w-30">
              <CurrencyDropdown
                currencies={assetOptions}
                id="asset"
                label="Asset"
                selectedCurrency={selectedAsset}
                setSelectedCurrency={setSelectedAsset}
                setValue={setValue}
                trigger={trigger}
                register={register}
                placeholder=""
              />
            </div>
            <div className="w-full">
              <FormInput
                id="totalAmount"
                label="=1974.849"
                register={register}
                type="number"
                labelClass="text-right"
                className="appearance-none"
                placeholder="$ 2000.00"
                readOnly={isMilestoneContract}
                validationRules={{
                  required: isMilestoneContract ? false : "Amount is required",
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0",
                  },
                }}
                error={errors.totalAmount}
                touched={touchedFields.totalAmount}
              />
            </div>
          </div>
        </div>

        {/* Rate Unit Selection for Pay-as-you-go */}
        {contractType.toLowerCase() === "pay as you go".toLowerCase() && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-150">
              Rate unit (Payment is based on the exact number of units
              submitted.)
            </p>
            <div className="flex gap-2">
              {rateUnitOptions.map((unit) => (
                <label
                  key={unit}
                  htmlFor={unit.toLowerCase()}
                  className="relative cursor-pointer w-fit flex !h-fit"
                >
                  <input
                    type="radio"
                    {...register("rateUnit")}
                    value={unit.toLowerCase()}
                    id={unit.toLowerCase()}
                    className="appearance-none cursor-pointer peer"
                  />
                  <div className="px-4 py-2 text-sm font-semibold text-gray-300 transition-colors bg-gray-100 rounded-full peer-checked:bg-primary-500 peer-checked:text-primary-200 dark:peer-checked:bg-primary-50 dark:bg-gray-600 dark:text-gray-300 dark:peer-checked:text-primary-400 peer-checked:font-semibold">
                    {unit}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Milestone Details Section (for milestone contracts) */}
      {isMilestoneContract && (
        <>
          <MilestoneForm />

          {/* Require Deposit Toggle */}
          <div className="flex items-center gap-2 ">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-200 ">
              Require a Deposit
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("requireDeposit")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-200"></div>
            </label>
          </div>
        </>
      )}

      {/* Invoice Details Section (for fixed rate and pay-as-you-go contracts) */}
      {(contractType.toLowerCase() === "fixed rate".toLowerCase() ||
        contractType.toLowerCase() === "pay as you go".toLowerCase()) && (
        <>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <p className="text-base font-semibold text-gray-500 text-nowrap dark:text-gray-150">
                Invoice details
              </p>
              <hr className="w-full border-b border-gray-150 dark:border-gray-250" />
            </div>
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="w-full">
                  <FormSelectInput
                    id="invoiceFrequency"
                    register={register}
                    label="Invoice frequency"
                    options={invoiceFrequencyOptions}
                    validationRules={{
                      required: "Invoice frequency is required",
                    }}
                    error={errors.invoiceFrequency}
                    touched={touchedFields.invoiceFrequency}
                  />
                </div>
                <div className="w-full">
                  <FormSelectInput
                    register={register}
                    id="issueInvoice"
                    label="Issue Invoice on"
                    options={issueInvoiceOptions}
                    validationRules={{
                      required: "Issue invoice timing is required",
                    }}
                    error={errors.issueInvoice}
                    touched={touchedFields.issueInvoice}
                  />
                </div>
              </div>

              <div className="sm:max-w-103">
                <FormSelectInput
                  options={paymentDueOptions}
                  label="Payment due"
                  id="paymentDue"
                  register={register}
                  validationRules={{
                    required: "Payment due timing is required",
                  }}
                  error={errors.paymentDue}
                  touched={touchedFields.paymentDue}
                />
              </div>
            </div>
          </div>

          {/* First Invoice Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <p className="text-base font-semibold text-gray-500 text-nowrap dark:text-gray-150">
                First Invoice
              </p>
              <hr className="w-full border-b border-gray-150 dark:border-gray-250" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex gap-4">
                  <div className="flex gap-2 sm:items-center form-control--checkbox">
                    {/* Radio button container */}
                    <div className="relative flex-shrink-0 size-4">
                      <input
                        type="radio"
                        {...register("firstPaymentType")}
                        value="full"
                        id="full-amount"
                        className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                      />
                      <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    {/* Label text */}
                    <label
                      htmlFor="full-amount"
                      className="text-xs font-medium leading-4 text-gray-600 sm:pt-2 dark:text-gray-200"
                    >
                      Full amount
                    </label>
                  </div>

                  <div className="flex gap-2 sm:items-center form-control--checkbox">
                    {/* Radio button container */}
                    <div className="relative flex-shrink-0 size-4">
                      <input
                        type="radio"
                        {...register("firstPaymentType")}
                        value="custom"
                        id="custom-amount"
                        className="absolute z-10 border rounded-full appearance-none border-gray-150 peer size-4 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                      />
                      <div className="absolute inset-1/2 size-2.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    {/* Label text */}
                    <label
                      htmlFor="custom-amount"
                      className="text-xs font-medium leading-4 text-gray-600 sm:pt-2 dark:text-gray-200"
                    >
                      Custom amount
                    </label>
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-400">
                  You would receive the full monthly amount for your first
                  payment.
                </p>
              </div>

              {firstPaymentType === "custom" && (
                <div className="flex flex-col w-full gap-6 sm:flex-row">
                  <div className="w-full">
                    <DatePicker
                      id="firstPaymentDate"
                      register={register}
                      label="Date"
                      setValue={setValue}
                      trigger={trigger}
                      validationRules={{
                        required:
                          firstPaymentType === "custom"
                            ? "First payment date is required"
                            : false,
                        validate: (value) => {
                          if (firstPaymentType === "custom" && value) {
                            const dateStr = String(value);
                            const selectedDate = new Date(dateStr);
                            const startDate = new Date(String(startDateValue));

                            if (isNaN(selectedDate.getTime())) {
                              return "Invalid date";
                            }

                            if (startDateValue && selectedDate < startDate) {
                              return "First payment date cannot be before start date";
                            }
                          }
                          return true;
                        },
                      }}
                      error={errors.firstPaymentDate}
                      touched={touchedFields.firstPaymentDate}
                    />
                  </div>
                  <div className="w-full">
                    <FormInput
                      type="number"
                      id="firstPaymentAmount"
                      label="Amount"
                      register={register}
                      placeholder="0.00"
                      validationRules={{
                        required:
                          firstPaymentType === "custom"
                            ? "First payment amount is required"
                            : false,
                        min: {
                          value: 0.01,
                          message: "Amount must be greater than 0",
                        },
                        validate: (value) => {
                          if (firstPaymentType === "custom" && value) {
                            const totalAmount = parseFloat(
                              watch("totalAmount") || "0"
                            );

                            const firstAmount = parseFloat(String(value));

                            if (firstAmount > totalAmount) {
                              return "First payment cannot exceed total amount";
                            }
                          }
                          return true;
                        },
                      }}
                      error={errors.firstPaymentAmount}
                      touched={touchedFields.firstPaymentAmount}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tax Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <p className="text-base font-semibold text-gray-500 text-nowrap dark:text-gray-150">
                Add inclusive tax (optional)
              </p>
              <hr className="w-full border-b border-gray-150 dark:border-gray-250" />
            </div>
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="w-full">
                  <FormSelectInput
                    id="taxType"
                    register={register}
                    label="Tax type"
                    options={taxTypeOptions}
                    placeholder="e.g VAT, GST, HST, PST"
                  />
                </div>
                <div className="w-full">
                  <FormInput
                    register={register}
                    id="accountNumber"
                    label="ID / account number"
                    placeholder="Account number"
                    validationRules={{
                      validate: (value) => {
                        const taxType = watch("taxType");
                        if (taxType && !value) {
                          return "Account number is required when tax type is selected";
                        }
                        return true;
                      },
                    }}
                    error={errors.accountNumber}
                    touched={touchedFields.accountNumber}
                  />
                </div>
              </div>

              <div className="sm:max-w-103">
                <FormSelectInput
                  options={["5%", "10%", "15%", "18%", "20%", "25%"]}
                  label="Tax rate"
                  id="taxRate"
                  register={register}
                  placeholder="Select rate"
                  validationRules={{
                    validate: (value) => {
                      const taxType = watch("taxType");
                      if (taxType && !value) {
                        return "Tax rate is required when tax type is selected";
                      }
                      return true;
                    },
                  }}
                  error={errors.taxRate}
                  touched={touchedFields.taxRate}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <FormNavigation
        isNextDisable={!isFormValid()}
        handlePrev={() => setStepper(3)}
        handleNext={handleSubmit(onSubmit)}
      />
    </form>
  );
};
