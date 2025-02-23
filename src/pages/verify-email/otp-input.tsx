import React, { useState, useRef, KeyboardEvent } from "react";

interface OTPInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

const OTPInput = ({ length = 6, onChange }: OTPInputProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newOtp.every((digit) => digit !== "")) {
      onChange?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      newOtp[index] = "";
      setOtp(newOtp);
      onChange?.(newOtp.join(""));
    }
  };

  const handlePaste = (e: { preventDefault: () => void; clipboardData: { getData: (arg0: string) => string; }; }) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length).replace(/\D/g, "");
    if (pasteData.length === length) {
      setOtp(pasteData.split(""));
      onChange?.(pasteData);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {otp.map((digit, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            value={digit}
            maxLength={1}
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "-"}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => {
                inputRefs.current[index] = el;
            }}
            placeholder="-"
            className="w-12 h-12 md:w-16 md:h-16 3xl:w-20 3xl:h-20 text-xl text-center border-1 border-[#C6CCD5] rounded-md focus:border-blue-500 focus:outline-none"
          />
          {index === 2 && <span className="text-xl text-[#9CA6B6]">-</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPInput;
