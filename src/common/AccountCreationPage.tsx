import { motion } from "framer-motion";
import AccountCreationForm from "./AccountCreationForm";
import AnimatedBackground from "./AnimatedBackground";
import { HeroSection } from "./HeroSection";
import { AuthFooter } from "../common/auth/AuthFooter";
import { AuthHeader } from "../common/auth/AuthHeader";

function AccountCreationPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left side - Registration Form Section */}
      <div className="w-full md:w-1/2 bg-white ">
        <AuthHeader />
        <div className="flex flex-1 items-center p-12 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h1>
              <p className="text-gray-600">
                Securely access your account and manage payroll with ease
              </p>
            </div>
            <AccountCreationForm />
          </motion.div>
        </div>
        <AuthFooter />
      </div>

      {/* Right side - Animated Background Section (hidden on mobile) */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <HeroSection />
      </div>
    </div>
  );
}

export default AccountCreationPage;
