import { useEffect, useRef, useState } from "react";
import { PinIcon } from "../../assets/svg/svg";
import { OtpInputProps } from "../../types/types";
import { useController } from "react-hook-form";
import { useFormError } from "../../hooks/useFormError";
import ErrorMessage from "../form/ErrorMessage";

function OtpInput({ control, error }: OtpInputProps) {
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [mask, setMask] = useState(Array(otpLength).fill(false));
  const [countdown, setCountdown] = useState(300);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [touched, setTouched] = useState(false);

  const { message, hasError } = useFormError(error, touched);

  const { field } = useController({
    name: "otp",
    control,
    defaultValue: "",
  });

  useEffect(() => {
    const resendTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          clearInterval(resendTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(resendTimer);
  }, []);

  useEffect(() => {
    const combinedOtp = otp.join("");
    field.onChange(combinedOtp);
  }, [otp, field]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      // Mark as touched on first input
      if (!touched && newOtp.every((digit) => digit !== "")) {
        setTouched(true);
      }

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
      }, 1000);

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

      // Mark as touched on first input
      if (!touched) {
        setTouched(true);
      }
      // Focus the last input after paste
      inputRefs.current[length - 1]?.focus();

      // Fire onComplete callback
    }
  };

  return (
    <div className="space-y-2 ">
      <label className="text-gray-150" htmlFor="otp-0" aria-label="OTP label">
        OTP Verification
      </label>

      <div className="flex justify-between relative">
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
              className={
                `otp-input  peer dark:!bg-gray-500  ${
                  mask[index] == true ? "filled text-transparent  " : ""
                } !placeholder:font-bold !placeholder:text-5xl ` +
                (hasError ? "!border-error-500 " : "!border-none ")
              }
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
        <ErrorMessage isVisible={hasError} errorMessage={message} />
      </div>

      <div className="flex items-end justify-center pt-4">
        <button
          type="button"
          disabled={isResendDisabled}
          className="text-sm font-bold transition duration-300 ease-in-out cursor-pointer text-primary-200 dark:text-primary-400 dark:hover:text-primary-400/70 hover:text-primary-200/70 disabled:text-gray-200 dark:disabled:text-gray-300"
        >
          Resend code{" "}
          {countdown > 0 && (
            <span className="text-primary-200 dark:text-primary-400">
              {Math.floor(countdown / 60)}:{countdown % 60}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default OtpInput;
