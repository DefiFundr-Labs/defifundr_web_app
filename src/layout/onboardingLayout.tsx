import { ReactNode } from "react";
import layout from "../assets/Background.svg";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";

interface IOnboardingLayout {
  children: ReactNode;
}

export const OnboardingLayout = ({ children }: IOnboardingLayout) => {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-[42.43%] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between w-full px-10 py-5">
          <img src={logo} alt="DefiFundr" className="w-[13.91px] h-6" />
          <button
            type="button"
            className="text-black font-normal flex items-center gap-1.5 hover:text-gray-800 border-[0.5px] border-[rgba(0,0,0,0.12)] rounded-md py-2 px-4"
            onClick={() => console.log("Back clicked")}
          >
            <Icon icon="fe:arrow-left" className="text-[#141B34] w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <div className="flex justify-between items-center px-10 py-5 text-xs font-normal bg-[#F8FAFC]">
          <span className="text-[#757575]">© 2025, all rights reserved</span>
          <div className="space-x-4 text-black">
            <button type="button" className="hover:text-gray-700">
              Privacy Policy
            </button>
            <button type="button" className="hover:text-gray-700">
              Terms and condition
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 relative bg-[#080717]">
        <img
          src={layout}
          alt="DefiFundr Platform"
          className="w-full h-full object-cover border border-red-500"
        />
        <div className="absolute bottom-15 left-[55px] text-white">
          <p className="text-[48px] leading-[67.2px] -tracking-[2%] font-bold mb-2">
            Pay Anyone,
            <br />
            Anywhere.
          </p>
          <p className="text-base text-[rgba(255,255,255,1)] font-normal leading-[25.6px] tracking-normal">
            Experience Fast, Secure Crypto & Fiat Payroll &<br />
            Invoicing with Defifundr
          </p>
        </div>
      </div>
    </div>
  );
};
