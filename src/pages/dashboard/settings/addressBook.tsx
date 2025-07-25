import { useState } from "react";
import {
  PixelatedArt1,
  PixelatedArt2,
  PixelatedArt3,
  PixelatedArt4,
  PixelatedArt5,
  PixelatedArt6,
  PixelatedArt7,
  PixelatedArt8,
  TrashIcon,
} from "../../../assets/svg/svg";
import RemoveAddressModal from "../../../components/modal/settings/RemoveAddressModal";
import useModal from "../../../hooks/useModal";

const walletItems = [
  {
    id: 1,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt1 />,
  },
  {
    id: 2,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt2 />,
  },
  {
    id: 3,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt3 />,
  },
  {
    id: 4,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt4 />,
  },
  {
    id: 5,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt5 />,
  },
  {
    id: 6,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt6 />,
  },
  {
    id: 7,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt7 />,
  },
  {
    id: 8,
    name: "James’s wallet",
    chain: "Ethereum",
    address: "0xC524b945DDB20f703338f4696102D10bbC12629C",
    avatar: <PixelatedArt8 />,
  },
];

const AddressBook = () => {
  const [walletData, setWalletData] = useState(walletItems);

  const { showCustomModal } = useModal();

  const handleDelete = (id: number, name: string) =>
    showCustomModal(
      <RemoveAddressModal
        onDelete={() => {
          setWalletData((wallets) =>
            wallets.filter((wallet) => wallet.id !== id)
          );
        }}
        walletName={name}
      />,
      "lg"
    );

  return (
    <div className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
      <h2 className="text-gray-500 font-semibold dark:text-gray-150">
        Address book
      </h2>

      <div className="grid  grid-cols-1 gap-4 lg:grid-cols-2">
        {walletData.map((wallet) => (
          <div
            className="border border-gray-150 dark:border-gray-250 rounded-lg p-4 flex gap-3 items-center"
            key={wallet.id}
          >
            <div className="size-10 shrink-0 rounded-lg overflow-hidden bg-gray-250">
              {wallet.avatar}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex flex-wrap justify-between items-center gap-1">
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
                    {wallet.name}
                  </p>
                  <span className="border border-gray-150 dark:border-gray-250 h-5 px-1 bg-gray-100 dark:bg-gray-600 rounded-sm text-gray-300 font-medium text-xs">
                    {wallet.chain}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(wallet.id, wallet.name)}
                  className="flex items-center gap-1 text-xs font-medium text-error-500"
                >
                  <TrashIcon /> Remove
                </button>
              </div>

              <p className="text-xs font-medium text-gray-300 mt-2 truncate">
                {wallet.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
