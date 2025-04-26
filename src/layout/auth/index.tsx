import { Outlet } from "react-router-dom";

import { AuthFooter } from "../../common/auth/AuthFooter";

import { motion } from "framer-motion";
import { AuthHero } from "../../common/auth/AuthHero";
import { LogoCollapsed } from "../../assets/svgs/svg";

export default function AuthLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white md:flex-row">
      {/* Right side - Hero Section (hidden on mobile) */}
      <div className="relative hidden w-1/2 overflow-hidden md:flex">
        <AuthHero />
      </div>
      {/* Left side - Content Section */}
      <div className="flex flex-col w-full bg-white md:w-1/2">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-black rounded-lg drop-shadow-md lg:hidden md:hidden">
            <div className="text-white ">
              <LogoCollapsed />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-1 p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Outlet />
          </motion.div>
        </div>
        <AuthFooter />
      </div>
    </div>
  );
}
