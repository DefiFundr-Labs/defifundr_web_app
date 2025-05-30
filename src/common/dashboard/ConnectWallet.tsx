import { useState } from "react";
import { FoxIcon } from "../../assets/svg/svg"; // Adjust import path as needed

interface WalletProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string>("");

  // Dummy wallet providers - you can replace these with actual wallet icons
  const walletProviders: WalletProvider[] = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: <FoxIcon />,
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-lg">
          <span className="text-xs font-bold text-white">WC</span>
        </div>
      ),
    },
    {
      id: "coinbase",
      name: "Coinbase",
      icon: (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
          <span className="text-xs font-bold text-white">CB</span>
        </div>
      ),
    },
  ];

  const handleConnectWallet = () => {
    // Simulate wallet connection with a longer address
    setIsConnected(true);
    setConnectedWallet("0xAbcd1234567890abcdef1234567890abcdef1234");
  };

  // Helper function to truncate wallet address in the middle
  const truncateAddress = (address: string, startChars = 6, endChars = 4) => {
    if (address.length <= startChars + endChars) return address;
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setConnectedWallet("");
  };

  if (isConnected) {
    // Connected state (Image 2)
    return (
      <div className="p-4 mx-auto bg-primary-200 rounded-2xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Wallet Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-white shadow-md rounded-2xl">
            <FoxIcon />
          </div>

          {/* Wallet Address */}
          <div className="w-full text-center">
            <p className="px-2 text-white">
              {truncateAddress(connectedWallet)}
            </p>
            <p className="text-xs text-primary-400">Ethereum Mainnet</p>
          </div>

          {/* Disconnect Button */}
          <button
            onClick={handleDisconnectWallet}
            className="button !text-white  !bg-black "
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    );
  }

  // Connect state (Image 1)
  return (
    <div className="p-4 mx-auto bg-primary-200 rounded-2xl ">
      <div className="flex flex-col items-center space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="mb-1 text-white">Connect Your Wallet</h2>
          <p className="text-xs leading-[100%] text-primary-400">
            Sign in with any of the available wallet providers
          </p>
        </div>

        {/* Wallet Provider Icons */}
        <div className="flex justify-center space-x-2">
          {walletProviders.map((provider) => (
            <button
              key={provider.id}
              className="flex items-center justify-center transition-transform duration-200 w-7 h-7 rounded-xl hover:scale-105"
              onClick={handleConnectWallet}
              title={provider.name}
            >
              {provider.icon}
            </button>
          ))}
        </div>

        {/* Connect Button */}
        <button
          onClick={handleConnectWallet}
          className="button !text-white  !bg-black "
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;
