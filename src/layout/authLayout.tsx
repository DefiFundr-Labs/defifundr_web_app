import { ChevronLeft } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen flex-row-reverse">
            {/* Left Sidebar with Image */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-purple-900/80" />
                <img
                    src="/auth-bg.png"
                    alt="Cryptocurrency"
                    className="object-cover w-full h-full"
                />
                <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-5xl font-bold mb-4">Pay Anyone,<br />Anywhere.</h2>
                    <p className="text-xl">
                        Experience Fast, Secure Crypto & Fiat Payroll &<br />
                        Invoicing with Deifundr
                    </p>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex flex-col w-full lg:w-1/2">
                {/* Header */}
                <header className="p-6 flex justify-between items-center">
                    <img src="/logo.png" alt="Deifundr Logo" className="h-8" />

                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 flex items-center gap-2 border p-2 rounded-md hover:text-gray-800"
                    >
                        <ChevronLeft />  Back
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 px-6 max-w-md mx-auto w-full">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="p-6 text-center text-sm text-gray-500">
                    <div className="flex justify-between items-center gap-4">
                        <span>© 2025, all rights reserved</span>
                        <div className="flex gap-2">
                            <a href="/#" className="hover:text-gray-700">Privacy Policy</a>
                            <a href="/#" className="hover:text-gray-700">Terms and condition</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
