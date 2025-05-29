import { SearchIcon } from "../../../assets/svg/svg";
import { contractsData, MetricsData } from "../../../utils/constant";
import EmptyState from "../EmptyState";
import ContractCard from "./ContractCard";
import ContractsMetrics from "./ContractsMetrics";

const Contracts = () => {
  const isContractData = contractsData.length === 0;
  return (
    <>
      {!isContractData && (
        <div className="flex gap-2 w-full overflow-auto lg:overflow-hidden scroll-hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-4">
          {MetricsData.map((metric) => (
            <ContractsMetrics
              icon={metric.icon}
              subValue={metric.subValue}
              title={metric.title}
              value={metric.value}
              key={metric.title}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-20 justify-between">
        <p className="font-semibold text-gray-600 dark:text-gray-150">
          History
        </p>

        <div className="h-9 rounded-xl py-2.5 px-3.5 bg-white dark:bg-gray-600 justify-center items-center flex max-w-72 w-full">
          <input
            type="search"
            className="text-xs font-medium placeholder:text-gray-300 w-full "
            placeholder="Search..."
          />

          <SearchIcon />
        </div>
      </div>
      {isContractData ? (
        <div className="rounded-lg bg-white dark:bg-gray-600 flex-1 flex-col flex justify-center items-center">
          <EmptyState
            title="No contracts made yet"
            description="Contracts you create will be displayed here"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
          {contractsData.map((contract) => (
            <ContractCard
              amount={contract.amount}
              period={contract.period}
              status={contract.status}
              title={contract.title}
              key={contract.title}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Contracts;
