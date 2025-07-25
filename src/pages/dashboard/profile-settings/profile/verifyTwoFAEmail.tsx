import TitleHeader from "../../../../common/dashboard/TitleHeader";
import Stepper from "../../../../common/Stepper";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../../routes/routesPath";
import TwoFAOtp from "../../../../components/dashboard/profile-settings/TwoFAOtp";
import { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";

const VerifyTwoFAEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(RoutePaths.PROFILE_SETTINGS);
    }, 1000);
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      <TitleHeader title="Verify your email address" isBackButton />

      <div className="p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-500 rounded-lg max-w-125 w-full p-4 lg:p-6 space-y-11 mx-auto"
        >
          <section>
            <p className="text-xl font-semibold text-gray-400 sm:text-xl dark:text-gray-200">
              Verify code
            </p>
            <p className="text-xs font-medium text-gray-300">
              Please enter the verification code sent to <br />
              your email account za**ab@gmail.com
            </p>
            <Stepper totalSteps={2} currentStep={2} />
          </section>

          <TwoFAOtp isResendOtp />

          <div className="flex flex-col items-center gap-y-8">
            <button
              disabled={loading}
              className="button h-14 !w-full py-3 rounded-full bg-primary-200 text-white hover:bg-primary-100 transition-colors duration-200"
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Verify"}
            </button>

            <button
              type="button"
              className="text-primary-200 cursor-pointer font-semibold "
            >
              Didn’t get the code?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyTwoFAEmail;
