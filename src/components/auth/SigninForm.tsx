import { useState } from "react";
import { ConnectWallet } from "./ConnectWallet";

import { EyeOff, EyeOn } from "../../assets/svg/svg";
import { RoutePaths } from "../../routes/routesPath";
import { Link } from "react-router-dom";

export const SigninForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="form-control ">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Provide email address"
          />
        </div>
        <div className="form-control ">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter password"
            />
            <div>
              <button
                type="button"
                className="absolute transform -translate-y-1/2 right-4.5 top-1/2 focus:outline-none cursor-pointer"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <EyeOn /> : <EyeOff />}
              </button>
            </div>
          </div>
        </div>
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
