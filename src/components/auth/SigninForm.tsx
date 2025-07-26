import { ConnectWallet } from "./ConnectWallet";

import { RoutePaths } from "../../routes/routesPath";
import { Link, useNavigate } from "react-router-dom";
import { useZodForm } from "../../hooks/useZodForm";
import { SignInSchemaType, signInSchema } from "../../utils/schema";
import FormInput from "../form/FormInput";
import FormPasswordInput from "../form/FormPasswordInput";

export const SigninForm = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = useZodForm<SignInSchemaType>(signInSchema, {
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInSchemaType) => {
    navigate(RoutePaths.DASHBOARD);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <FormInput
          id="email"
          label="Email address"
          register={register}
          error={errors.email}
          touched={touchedFields.email}
          placeholder="Provide email address"
          type="email"
        />

        <FormPasswordInput
          label="Password"
          register={register}
          error={errors.password}
          touched={touchedFields.password}
          id="password"
          placeholder="Enter password"
        />

        <div className="flex items-end justify-end">
          {/* // TODO: change to use react router link */}
          <a
            href=""
            className="text-sm font-bold transition duration-300 ease-in-out text-primary-200 dark:text-primary-400 dark:hover:text-primary-400/70 hover:text-primary-200/70"
          >
            Forgot password?
          </a>
        </div>
      </div>
      <div className="pt-12 space-y-6">
        <div className="">
          <button
            type="submit"
            className="!w-full h-14 button button--secondary"
          >
            {" "}
            Continue
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="w-full h-px bg-gray-150 dark:bg-gray-200"></div>
            <span className="px-6 text-sm font-medium text-gray-400 uppercase dark:text-gray-200">
              or
            </span>
            <div className="w-full h-px bg-gray-150 dark:bg-gray-200"></div>
          </div>
        </div>
        <ConnectWallet />
        <div className="text-center">
          <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
            New to DefiFundr?
            <span className="pl-2">
              <Link
                to={RoutePaths.CREATE_ACCOUNT}
                className="transition duration-300 ease-in-out text-primary-200 dark:text-primary-400"
              >
                Create account
              </Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};
