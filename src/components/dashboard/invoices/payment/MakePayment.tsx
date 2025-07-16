import { EthIcon, UsdtIcon } from "../../../../assets/svg/svg";
import { InvoiceDetailTableProps } from "../../../../types/types";
import InvoiceDetailTable from "../InvoiceDetailTable";

const statusTable: InvoiceDetailTableProps[] = [
  {
    headers: ["Asset", "Network"],
    body: [
      { icon: <UsdtIcon />, iconLabel: "USDT" },
      { icon: <EthIcon />, iconLabel: "Ethereum" },
    ],
  },
  {
    headers: ["To", "Fee"],
    body: [{ text: "0x6885afa...6f23b3" }, { text: "0.0005 ETH (≈ $1.31)" }],
  },
];

const MakePayment = () => {
  return (
    <>
      <p className="text-center font-semibold text-xl">Make payment</p>

      <div className="flex-col flex justify-center items-center">
        <UsdtIcon size="56" />

        <p className="text-xl font-semibold text-gray-500 dark:text-gray-150">
          581 USDT
        </p>

        <p className="text-gray-400 dark:text-gray-200 text-base font-medium">
          ≈ $476.19
        </p>
      </div>

      <div className="space-y-2">
        {statusTable.map((detail, idx) => (
          <InvoiceDetailTable
            headers={detail.headers}
            body={detail.body}
            key={idx}
          />
        ))}
      </div>
    </>
  );
};

export default MakePayment;
