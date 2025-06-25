import { useEffect, useState } from "react";
import { TimeTrackingTabContentProps } from "../../../../types/types";
import EmptyState from "../../EmptyState";
import TabHeader from "../TabHeader";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../../routes/routesPath";
function TimeTrackingTabContent({
  timeSheetRecords,
}: TimeTrackingTabContentProps) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState(timeSheetRecords);
  console.log(timeSheetRecords.length);

  useEffect(() => {
    const filtered = timeSheetRecords.filter((record) =>
      record.employeeName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, filteredData]);

  return (
    <div className="min-h-screen p-4 space-y-2 bg-gray-100 dark:bg-gray-600">
      <TabHeader title="Time Tracking" search={search} setSearch={setSearch} />
      {timeSheetRecords.length === 0 ? (
        <div className="flex items-center justify-center w-full bg-white rounded-lg dark:bg-gray-600 h-fullheight">
          <EmptyState
            title="No records yet"
            description="Looks like you’re yet to receive any time sheet record"
          />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100 rounded-lg gap-y-4 size-full dark:bg-gray-600 ">
          <div className="text-white bg-white dark:bg-gray-500 grow">
            time track table{" "}
            {filteredData.length > 0 ? (
              <div className="flex flex-col gap-2 p-4 ">
                {filteredData.map((record, index) => (
                  <Link
                    to={`${RoutePaths.TEAM_MANAGEMENT_TIME_TRACKING}/${record.id}`}
                    key={index}
                  >
                    {record.employeeName} {record.status}
                  </Link>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeTrackingTabContent;
