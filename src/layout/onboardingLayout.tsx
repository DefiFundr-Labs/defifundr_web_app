import { useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import layout from "../assets/svgs/Background.svg";
import logo from "../assets/svgs/logo.svg";
import arrowLeft from "../assets/svgs/arrow-left.svg";
import { IOnboardingLayout } from "../types/types";

export const OnboardingLayout = ({ children }: IOnboardingLayout) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-full md:w-[49%] lg:w-[42.43%] flex flex-col">
        {/* Header */}
        <div className="items-center justify-between hidden w-full px-10 py-5 lg:flex">
          <motion.button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer"
            whileHover={{ scale: 1.11 }}
          >
            <img src={logo} alt="DefiFundr" className="w-[13.91px] h-6" />
          </motion.button>
          <button
            type="button"
            className="text-black font-normal flex items-center gap-1.5 hover:text-gray-800 border-[0.5px] border-[rgba(0,0,0,0.12)] rounded-md py-2 px-4 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={arrowLeft} alt="" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-[48px] pb-6 lg:pb-[37px] px-4 md:px-6 lg:px-20 overflow-y-auto">
          {children || <Outlet />}
        </div>

        {/* Footer */}
        <div className="hidden md:flex md:flex-col lg:flex-row justify-between items-center px-10 py-5 text-xs font-normal bg-[#F8FAFC]">
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
      <div className="hidden md:flex flex-1 relative bg-[#080717]">
        <img
          src={layout}
          alt="DefiFundr Platform"
          className="object-cover w-full h-full border border-red-500"
        />
        <div className="absolute bottom-15 left-[55px] text-white">
          <p className="md:text-4xl lg:text-[48px] leading-[67.2px] -tracking-[2%] font-bold mb-2">
            Pay Anyone,
            <br />
            Anywhere.
          </p>
          <p className="md:text-sm lg:text-base text-white opacity-70 font-normal leading-[25.6px] tracking-normal">
            Experience Fast, Secure Crypto & Fiat Payroll &<br />
            Invoicing with Defifundr
          </p>
        </div>
      </div>
    </div>
  );
};
