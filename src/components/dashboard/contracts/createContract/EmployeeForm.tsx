import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../form/FormInput";
import FormSelectInput from "../../../form/FormSelectInput";
import FormNavigation from "./FormNavigation";
import { ChevronRight } from "../../../../assets/svg/svg";
import useModal from "../../../../hooks/useModal";
import { PhoneCodeSelector } from "../../../form/PhoneCodeSelector";
import { useDispatch } from "react-redux";
import { updateEmployeeDetails } from "../../../../redux/slice/createContactFormSlice";
import { SelectEmployeeModal } from "../../../modal/SelectEmployeeModal";

const EMPLOYEE_FORM_DATA_KEY = "contract_form_employee_details";

type EmployeeFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  postal: string;
  phoneCode: string;
  image: string;
};

interface EmployeeFormProps {
  setStepper: (value: number) => void;
}

const countryOptions = [
  { name: "Nigeria", code: "+234" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "India", code: "+91" },
];

const nameRegex = /^[a-zA-Z]{2,}(?:[\s'-][a-zA-Z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmployeeForm: FC<EmployeeFormProps> = ({ setStepper }) => {
  const dispatch = useDispatch();
  const [phoneCode, setPhoneCode] = useState("");
  const [selectEmployee, setSelectedEmployee] =
    useState<EmployeeFormValues | null>(null);
  const savedEmployeeData = localStorage.getItem(EMPLOYEE_FORM_DATA_KEY);
  const parsedEmployeeData: EmployeeFormValues | null = savedEmployeeData
    ? JSON.parse(savedEmployeeData)
    : null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues: parsedEmployeeData || {},
  });

  useEffect(() => {
    if (parsedEmployeeData?.phoneCode) {
      setPhoneCode(parsedEmployeeData.phoneCode);
    }
  }, []);

  const { showContentOnlyModal } = useModal();

  const onNext = (data: EmployeeFormValues) => {
    dispatch(
      updateEmployeeDetails({
        ...data,
        phoneNumber: data.phoneCode + data.phoneNumber,
        postalCode: data.postal,
        index: 0,
      })
    );
    setStepper(4);
  };

  const openSelectModal = () => {
    showContentOnlyModal(
      <SelectEmployeeModal
        selectedEmployee={selectEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    );
  };

  useEffect(() => {
    const subscription = watch((values) => {
      const updatedData = { ...values, phoneCode };
      localStorage.setItem(EMPLOYEE_FORM_DATA_KEY, JSON.stringify(updatedData));
    });
    return () => subscription.unsubscribe();
  }, [watch, phoneCode]);

  useEffect(() => {
    setValue("phoneCode", phoneCode);
  }, [phoneCode, setValue]);
  useEffect(() => {
    if (selectEmployee) {
      // Set values for all form fields
      setValue("firstName", selectEmployee.firstName);
      setValue("lastName", selectEmployee.lastName);
      setValue("email", selectEmployee.email);
      setValue("phoneNumber", selectEmployee.phoneNumber);
      setValue("address", selectEmployee.address);
      setValue("city", selectEmployee.city);
      setValue("country", selectEmployee.country);
      setValue("postal", selectEmployee.postal);
      setPhoneCode(selectEmployee.phoneCode);
      console.log(selectEmployee, selectEmployee.phoneNumber);
    }
  }, [selectEmployee, setValue]);
  return (
    <div className="space-y-6">
      <button
        onClick={openSelectModal}
        className="py-3.5 px-4.5 bg-primary-500 w-full flex items-center justify-between rounded-lg font-semibold text-sm text-primary-200 cursor-pointer"
      >
        <span>Select saved employee</span>
        <ChevronRight />
      </button>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <FormInput
            id="firstName"
            register={register}
            label="First name"
            error={errors.firstName}
            validationRules={{
              required: "First Name is required",
              validate: (value: string | number) => {
                const isValid = nameRegex.test(String(value));
                return isValid ? true : "Invalid first Name";
              },
            }}
          />
        </div>
        <FormInput
          id="lastName"
          register={register}
          label="Last name"
          error={errors.lastName}
          validationRules={{
            required: "Last Name is required",
            validate: (value: string | number) => {
              const isValid = nameRegex.test(String(value));
              return isValid ? true : "Invalid last Name";
            },
          }}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          id="email"
          register={register}
          label="Email address"
          error={errors.email}
          validationRules={{
            required: "Email is required",
            validate: (value: string | number) => {
              const isValid = emailRegex.test(String(value));
              return isValid ? true : "Invalid email address";
            },
          }}
        />

        <div className="form-control">
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className="flex items-center justify-center gap-2">
            <div className="w-fit">
              <PhoneCodeSelector value={phoneCode} onChange={setPhoneCode} />
            </div>
            <div className="w-full">
              <FormInput
                id="phoneNumber"
                label=""
                register={register}
                error={errors.phoneNumber}
                validationRules={{
                  required: "Phone number is required",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        <FormSelectInput
          id="country"
          label="Country"
          register={register}
          options={countryOptions.map((c) => c.name)}
          error={errors.country}
          validationRules={{
            required: "Country is required",
          }}
        />
        <FormInput
          id="address"
          register={register}
          label="Address"
          error={errors.address}
          validationRules={{
            required: "Address is required",
          }}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          id="city"
          register={register}
          label="City"
          error={errors.city}
          validationRules={{
            required: "City is required",
          }}
        />
        <FormInput
          id="postal"
          type="number"
          register={register}
          label="Postal / zip code"
          className="appearance-none dark:bg-gray-600"
          error={errors.postal}
          validationRules={{
            required: "Postal is required",
          }}
        />
      </div>

      <FormNavigation
        isNextDisable={false}
        handlePrev={() => setStepper(2)}
        handleNext={handleSubmit(onNext)}
      />
    </div>
  );
};
