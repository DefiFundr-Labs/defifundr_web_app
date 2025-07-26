import React, { useState, useRef } from "react";
import { PinIcon } from "../../../../assets/svg/svg";

interface InvoiceOtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

const InvoiceOtpInput: React.FC<InvoiceOtpInputProps> = ({
  length = 6,
  onComplete = () => {},
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [mask, setMask] = useState(Array(6).fill(false));

  //   const [countdown, setCountdown] = useState(300);
  //   const [isResendDisabled, setIsResendDisabled] = useState(true);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           setIsResendDisabled(false);
  //           clearInterval(timer);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, []);

  //   const formatTime = (seconds: number) => {
  //     const minutes = Math.floor(seconds / 60);
  //     const remainingSeconds = seconds % 60;
  //     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  //   };

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];

      newOtp[index] = value;
      setOtp(newOtp);
      setTimeout(() => {
        if (value !== "") {
          setMask((prev) => {
            const newMask = [...prev];
            newMask[index] = true;
            return newMask;
          });
        }
      }, 400);

      // Auto-focus next input if current input is filled
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if OTP is complete
      if (newOtp.every((digit) => digit !== "")) {
        // handle submit here
        //   onComplete(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setMask((prev) => {
      const newMask = [...prev];
      newMask[index] = false;
      return newMask;
    });
    // Go to previous input on backspace if current input is empty
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      setMask((prev) => {
        const newMask = [...prev];
        newMask[index] = false;
        return newMask;
      });
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content matches the expected OTP format
    const regex = new RegExp(`^\\d{${length}}$`);
    if (regex.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus the last input after paste
      inputRefs.current[length - 1]?.focus();

      // Fire onComplete callback
      if (onComplete) {
        onComplete(pastedData);
      }
    }
  };

  //   const handleResendOTP = () => {
  //     if (!isResendDisabled) {
  //       // Reset OTP inputs
  //       setOtp(Array(length).fill(""));

  //       // Reset timer
  //       setCountdown(300);
  //       setIsResendDisabled(true);

  //       // Focus first input
  //       inputRefs.current[0]?.focus();
  //     }
  //   };

  return (
    <div className="space-y-6">
      <label
        className="text-gray-500 dark:text-gray-150"
        htmlFor="otp-0"
        aria-label="OTP label"
      >
        Enter 2FA code
      </label>

      {/* OTP input fields */}
      <div className="flex justify-between gap-1.5">
        {otp.map((digit, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              inputMode="numeric"
              maxLength={1}
              value={digit}
              name={`otp-${index}`}
              id={`otp-${index}`}
              aria-label={`OTP digit ${index + 1}`}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`otp-input  peer dark:!bg-gray-500  ${
                mask[index] == true ? "filled text-transparent  " : ""
              } !placeholder:font-bold !placeholder:text-5xl `}
            />
            <div
              aria-hidden="true"
              className={` ${
                mask[index] == true ? "block" : "hidden"
              } absolute  top-1/2 left-1/2 -translate-1/2 `}
            >
              <PinIcon />
            </div>
          </div>
        ))}
      </div>

      {/* Resend OTP option */}
      {/* <div className="otp-resend-container">
        <span className="otp-timer">
          {isResendDisabled
            ? `Resend OTP in ${formatTime(countdown)}`
            : "No OTP Yet?"}
        </span>
        <button
          onClick={handleResendOTP}
          disabled={isResendDisabled}
          className="otp-resend-button"
        >
          Resend OTP
        </button>
      </div> */}
    </div>
  );
};

export default InvoiceOtpInput;
