import { useState } from "react";
import { InfoIcon } from "../../../../assets/svg/svg";
import TitleHeader from "../../../../common/dashboard/TitleHeader";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../../routes/routesPath";

const methods = [
  {
    title: "Authenticator app",
    desc: "You use an app to generate verification codes",
    key: "app",
  },
  {
    title: "Email verification",
    desc: "You’ll receive your verification codes by email",
    key: "email",
  },
];

const TwoFASetup = () => {
  const [authMethod, setAuthMethod] = useState("app");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      if (authMethod === "app")
        navigate(RoutePaths.SCAN_TWO_FA_QR_CODE_SETTINGS);
      else navigate(RoutePaths.VERIFY_TWO_FA_EMAIL_SETTINGS);

      setLoading(false);
    }, 500);
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      {/* TODO: check the name of the title */}
      <TitleHeader title="2FA Setup" isBackButton />
      <div className="p-4">
        <div className="bg-white dark:bg-gray-500 rounded-lg max-w-125 w-full p-4 lg:p-6 space-y-8 mx-auto">
          <h3 className="font-semibold text-xl text-gray-400">
            Choose 2FA method
          </h3>

          <div className="flex gap-2.5 p-4 rounded-lg border bg-primary-500 border-gray-150">
            <span className="text-primary-200 shrink-0">
              <InfoIcon size={24} />
            </span>
            <p className="text-sm font-medium text-gray-500">
              For security reasons, only one 2FA method can be enabled at a
              time.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 ">
            <div className="space-y-2">
              {methods.map((method) => (
                <div
                  key={method.title}
                  className={
                    "rounded-lg bg-gray-100 flex gap-1 justify-between p-6 cursor-pointer " +
                    (authMethod === method.key
                      ? "border border-primary-200"
                      : "")
                  }
                  onClick={() => setAuthMethod(method.key)}
                >
                  <span>
                    <p className="font-semibold text-xl text-gray-500 mb-1">
                      {method.title}
                    </p>
                    <p className="text-sm font-medium text-gray-400">
                      {method.desc}
                    </p>
                  </span>

                  <div className="relative flex-shrink-0 size-5">
                    <input
                      type="radio"
                      id="standardServiceAgreement"
                      name="agreement"
                      className="z-10 border rounded-full appearance-none border-gray-150 peer size-5 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                      checked={authMethod === method.key}
                    />
                    <div className="absolute inset-1/2 mx-auto size-3.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className="bg-primary-200 disabled:bg-primary-200/90 hover:bg-primary-200/90 rounded-full text-white font-medium h-14 w-full flex items-center justify-center"
            >
              {loading ? (
                <ClipLoader color="white" size={20} />
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFASetup;
