import { Invoice, Calendar } from "../../../assets/svg/svg";

type ContractProps = {
  title: string;
  price: number;
  status: "active" | "completed";
  startDate: string;
  endDate: string;
  rate: "fixed" | "hourly";
};
const ContractCard = ({ title, price, status, startDate, endDate, rate }: ContractProps) => {
    const formattedPrice = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(price);
function formatDateWithSuffix(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(2);

  return `${day}${daySuffix} ${month} ${year}`;
}
const formattedRange = `${formatDateWithSuffix(startDate)} - ${formatDateWithSuffix(endDate)}`;

  return (
    <div className="border border-gray-150 dark:border-gray-700 rounded-lg p-4 w-full xs:w-71">
        <div className="flex justify-between items-center">
            <div className="size-10 bg-primary-500 dark:bg-gray-800 flex items-center justify-center rounded-md overflow-hidden">
                <Invoice />
            </div>
            <p className="text-gray-600 dark:text-gray-150 text-sm font-semibold">USD {formattedPrice}</p>
        </div>
        <h2 className="mt-4 font-semibold text-gray-600 dark:text-gray-150">{title}</h2>
        <p className="text-xs text-gray-300  font-medium mb-4 mt-2 flex items-center gap-2">
            <Calendar />
            {formattedRange}
        </p>
        <hr className="border border-gray-150 dark:border-gray-700"/>
        <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-150 font-semibold">
                {rate === "fixed" ? "Fixed rate" : "Hourly rate"}
            </p>
            <p
             className={`px-2 font-medium text-sm rounded-sm ${
              status === "active" ? "bg-success-300 text-success-500 dark:bg-success-400" : "bg-gray-100 text-info-300 dark:bg-info-400"
             }`}
            >
              {status === "active" ? "Active" : "Completed"}
            </p>
        </div>
    </div>
  )
}

export default ContractCard
