import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import {
  FoxIcon,
  ProfilePreferencesIcon,
  UnlinkIcon,
} from "../../assets/svg/svg";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../routes/routesPath";

// Mock wallet icons - replace with actual imports
const StarkNetIcon = () => (
  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
    <span className="text-xs font-bold text-white">S</span>
  </div>
);

const PhantomIcon = () => (
  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
    <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full">
      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
    </div>
  </div>
);

const ConnectWalletHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsOpen(false);
    // Add your disconnect logic here
  };

  const handleConnectWallet = (walletName: string) => {
    console.log(`Connecting to ${walletName}`);
    setIsOpen(false);
    // Add your wallet connection logic here
  };

  if (!isConnected) {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-white transition-colors rounded-lg bg-primary-200 hover:bg-primary-300"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full gap-3 p-2 transition-colors rounded-lg max-w-64 dark:hover:bg-gray-700"
      >
        <div className="w-10 h-10 rounded-full border-primary-200 border bg-[#EAE0D7] p-2 flex items-center justify-center">
          <FoxIcon />
        </div>
        <div className="flex-1 text-left">
          <h2 className="leading-[120%] text-sm font-medium">0xAbcd...1234!</h2>
          <p className="text-xs text-gray-300">Ethereum Mainnet</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 px-1 py-1 mt-2 bg-white border shadow-lg border-gray-150 top-full w-50 dark:bg-gray-800 rounded-xl dark:border-gray-700">
          {/* Disconnect Option */}
          <div className="pb-1 0">
            <button
              onClick={handleDisconnect}
              className="flex items-center w-full gap-3 px-2 pt-2 pb-3 text-left transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <UnlinkIcon />

              <span className="text-sm text-gray-900 dark:text-gray-100">
                Disconnect
              </span>
            </button>
          </div>

          {/* Connect Other Wallets Section */}
          <div className="">
            <p className="px-2 mb-1 text-xs text-gray-500 dark:text-gray-200">
              Or connect other wallets
            </p>

            {/* Starknet Option */}
            <Link
              to={RoutePaths.PROFILE_SETTINGS}
              // onClick={() => handleConnectWallet("Starknet")}
              onClick={() => setIsOpen(false)}
              className="flex items-center w-full gap-3 px-2 py-2 mb-2 text-left transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ProfilePreferencesIcon />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Profile & preferences
              </span>
            </Link>

            {/* Phantom Option */}
            <button
              onClick={() => handleConnectWallet("Phantom")}
              className="flex items-center w-full gap-3 px-2 py-2 text-left transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <PhantomIcon />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                Phantom
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletHeader;
