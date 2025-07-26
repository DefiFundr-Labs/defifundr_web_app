import { useState } from "react";
import { CopyIcon, InfoIcon } from "../../../../assets/svg/svg";
import TitleHeader from "../../../../common/dashboard/TitleHeader";
import Stepper from "../../../../common/Stepper";
import { QRCodeSVG } from "qrcode.react";

import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../../routes/routesPath";

const address = "OGZISNOGVVOE5DU2INIRORBITNLYTBXB";

const ScanQRCode = () => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async (text: string) => {
    setIsCopied(true);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });

    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  return (
    <div className="bg-gray-100  dark:bg-gray-600">
      <TitleHeader title="Edit profile" isBackButton />

      <div className="p-4">
        <div className="w-full p-4 mx-auto space-y-8 bg-white rounded-lg dark:bg-gray-500 max-w-125 lg:p-6">
          <section>
            <p className="text-xl font-semibold text-gray-400 sm:text-xl dark:text-gray-200">
              Scan QR code
            </p>
            <Stepper totalSteps={2} currentStep={1} />
          </section>

          <QRCodeSVG value={address} size={164} className="mx-auto" />

          <section className="space-y-6">
            <p className="text-sm font-semibold text-center text-gray-500">
              Scan this QR code with your authenticator
              <br /> app to link it to your DefiFundr account
            </p>

            <div className="font-medium text-gray-400">
              <p className="mb-2 text-xs">
                Or manually enter this key in your authenticator app
              </p>

              <span className="flex justify-between py-3.5 px-4 gap-2 items-center bg-gray-100 rounded-lg">
                <p className="text-sm truncate">{address}</p>

                <button
                  onClick={() => handleCopy(address)}
                  className={
                    "cursor-pointer hover:scale-105 flex items-center gap-1 text-sm " +
                    (isCopied ? "text-primary-200" : "text-gray-500")
                  }
                >
                  {isCopied ? "Copied" : "Copy"} <CopyIcon />
                </button>
              </span>
            </div>
          </section>

          <div className="flex gap-4 p-4 border rounded-lg border-gray-50 dark:border-gray-250 bg-warning-300 dark:bg-warning-400">
            <span className="shrink-0 text-warning-500">
              <InfoIcon size={24} />
            </span>

            <span>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
                Don’t have an authenticator app?
              </p>

              <p className="text-xs font-medium text-gray-400">
                You can download one from the App Store or Google Play on your
                mobile device. Some compatible apps include Google
                Authenticator, Microsoft Authenticator, Authy, and more.
              </p>
            </span>
          </div>

          <div className="flex justify-end mt-6 space-x-3 h-14">
            <button
              onClick={() => navigate(-1)}
              className="button !w-full py-3 rounded-full border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Prev
            </button>

            <button
              onClick={() => navigate(RoutePaths.VERIFY_TWO_FA_SETTINGS)}
              className="button !w-full py-3 rounded-full bg-primary-200 text-white hover:bg-primary-100 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQRCode;
