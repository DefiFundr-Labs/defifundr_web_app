import { AppleLogo, GoogleLogo } from "../../assets/svg/svg";

export const ConnectWallet = () => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-label="Sign in with Google"
        className="flex items-center justify-center flex-1 gap-4 py-5 transition duration-300 ease-in-out rounded-full cursor-pointer border-1 dark:text-white border-gray-150 dark:border-gray-300 shrink-0 dark:hover:border-gray-400 hover:border-gray-200"
      >
        <span>Login with</span>
        <GoogleLogo />
      </button>
      <button
        type="button"
        aria-label="Sign in with Apple"
        className="flex items-center justify-center flex-1 gap-4 py-5 transition duration-300 ease-in-out rounded-full cursor-pointer border-1 border-gray-150 dark:border-gray-300 shrink-0 dark:hover:border-gray-400 hover:border-gray-200"
      >
        <span>Login with</span>
        <AppleLogo />
      </button>
    </div>
  );
};
