import { useEffect, useState } from "react";
import { TimeTrackingTabContentProps } from "../../../../types/types";
import EmptyState from "../../EmptyState";
// import Table from "../../../table/Table";
function TimeTrackingTabContent({
  timeSheetRecords,
}: TimeTrackingTabContentProps) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(timeSheetRecords);
  console.log(timeSheetRecords.length);

  useEffect(() => {
    const filtered = timeSheetRecords.filter((record) =>
      record.employeeName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, filteredData]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-500 ">
      {filteredData.length === 0 ? (
        <EmptyState
          title="No records yet"
          description="Looks like you’re yet to receive any time sheet record"
        />
      ) : (
        <div className=" size-full">
          <p className="text-white">time track table </p>
        </div>
      )}
    </div>
  );
}

export default TimeTrackingTabContent;
