import { Outlet } from "react-router-dom";
import { AuthHeader } from "../common/auth/AuthHeader";
import { AuthFooter } from "../common/auth/AuthFooter";
import { HeroSection } from "../common/HeroSection";
import { motion } from "framer-motion";

export default function AuthLayout() {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
            {/* Left side - Content Section */}
            <div className="w-full md:w-1/2 bg-white flex flex-col">
                <AuthHeader />
                <div className="flex flex-1 items-center p-8 md:p-12 justify-center">
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

            {/* Right side - Hero Section (hidden on mobile) */}
            <div className="hidden md:flex w-1/2 relative overflow-hidden">
                <HeroSection />
            </div>
        </div>
    );
}
