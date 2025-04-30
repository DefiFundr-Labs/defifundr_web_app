import { Check } from "lucide-react";
import { AuthFormHeader } from "../../common/auth/AuthFormHeader";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <form className="space-y-8 lg:space-y-12">
      <AuthFormHeader
        title="Welcome to DefiFundr!"
        description="Let’s get to know you! Provide the details below to continue"
      />

      <div className="space-y-6">
        <div className="form-control ">
          <label
            htmlFor="firstName"
            className="text-gray-600 dark:text-gray-150 font-medium text-xs mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Provide your first name"
            className="!text-sm !text-gray-400 dark:!text-gray-200 dark:bg-gray-500 !border-0 focus:!border !font-medium placeholder:text-gray-200 dark:placeholder:text-gray-300 px-3.5"
            required
          />
        </div>

        <div className="form-control ">
          <label
            htmlFor="lastName"
            className="text-gray-600 dark:text-gray-150 font-medium text-xs mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Provide your last name"
            required
            className="!text-sm !text-gray-400 dark:!text-gray-200 dark:bg-gray-500 !border-0 focus:!border !font-medium placeholder:text-gray-200 dark:placeholder:text-gray-300 px-3.5"
          />
        </div>

        <div className="form-control ">
          <label
            htmlFor="email"
            className="text-gray-600 dark:text-gray-150 font-medium text-xs mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="!text-sm !text-gray-400 dark:!text-gray-200 dark:bg-gray-500 !border-0 focus:!border !font-medium placeholder:text-gray-200 dark:placeholder:text-gray-300 px-3.5"
            id="email"
            placeholder="Provide your last name"
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative size-5">
          <input
            type="checkbox"
            id="policy"
            className="size-5 peer rounded border-2 border-gray-150 checked:border-0 appearance-none checked:bg-primary-200"
          />
          <div className="absolute pointer-events-none hidden peer-checked:flex inset-0 justify-center items-center">
            <Check className="size-3 stroke-3 text-white dark:text-gray-600" />
          </div>
        </div>
        <label
          htmlFor="policy"
          className="text-xs font-medium text-gray-400 dark:text-gray-200"
        >
          By creating an account, I agree to our{" "}
          <Link
            to=""
            className="font-bold text-primary-200 dark:text-primary-400 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to=""
            className="font-bold text-primary-200 dark:text-primary-400 hover:underline "
          >
            Privacy Policy
          </Link>{" "}
          and confirm that I am 18 years and older.
        </label>
      </div>

      <button
        type="submit"
        className="!w-full h-14 button button--secondary !text-base dark:!bg-primary-200 dark:hover:!bg-primary-200/80"
      >
        Continue
      </button>
    </form>
  );
};

export default CreateAccount;
