import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import { ProfilePreferencesIcon, Signout } from "../../assets/svg/svg";
import { Link, useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routes/routesPath";
import Profile from "../../assets/images/ProfilePic.png";

const ConnectWalletHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  const handleLogOut = () => {
    navigate(RoutePaths.SIGNIN);
    // Add your disconnect logic here
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full gap-3 p-2 transition-colors rounded-lg max-w-64 dark:hover:bg-gray-700"
      >
        <div className="w-10 h-10 rounded-full   bg-[#EAE0D7] overflow-hidden flex items-center justify-center">
          <img src={Profile} alt="" className="w-full h-full" />
        </div>
        <div className="flex-1 text-left">
          <h2 className="leading-[120%] text-sm font-medium">Peter</h2>
          <p className="text-xs text-gray-300">Administrator</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 px-1 py-1 mt-2 bg-white border shadow-lg border-gray-150 top-12 w-50 dark:bg-gray-800 rounded-xl dark:border-gray-700">
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
          <button
            onClick={handleLogOut}
            className="flex items-center w-full gap-3 px-2 pt-2 pb-3 text-left transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Signout />

            <span className="text-sm text-gray-900 dark:text-gray-100">
              Sign out
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletHeader;
