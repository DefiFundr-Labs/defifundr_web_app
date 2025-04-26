import React, { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete = () => {},
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(300);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input if current input is filled
      if (value !== "" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if OTP is complete
      if (newOtp.every((digit) => digit !== "") && onComplete) {
        onComplete(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Go to previous input on backspace if current input is empty
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
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

  const handleResendOTP = () => {
    if (!isResendDisabled) {
      // Reset OTP inputs
      setOtp(Array(length).fill(""));

      // Reset timer
      setCountdown(300);
      setIsResendDisabled(true);

      // Focus first input
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="space-y-6">
      {/* OTP input fields */}
      <div className="flex justify-between">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`otp-input ${digit ? "filled" : ""}`}
            aria-label={`Digit ${index + 1} of verification code`}
          />
        ))}
      </div>

      {/* Resend OTP option */}
      <div className="otp-resend-container">
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
      </div>
    </div>
  );
};

export default OTPInput;
