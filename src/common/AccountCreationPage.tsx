import { motion } from "framer-motion";
import AccountCreationForm from "./AccountCreationForm";
import AnimatedBackground from "./AnimatedBackground";

function AccountCreationPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left side - Registration Form Section */}
      <div className="w-full md:w-1/2 p-6 md:p-12 bg-white flex items-center justify-center">
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

      {/* Right side - Animated Background Section (hidden on mobile) */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        {/* Background gradient */}

        <AnimatedBackground />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Pay Anyone,
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            Anywhere.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-center text-gray-200"
          >
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
            DeftFundr
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default AccountCreationPage;
