import React from "react";
import EmptyState from "../dashboard/EmptyState";
import { Line } from "../../assets/svg/svg";

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  showOnMobile?: boolean;
  mobileOrder?: number;
}

interface TableContentProps<T = any> {
  data: T[];
  columns: TableColumn[];
  search?: string;
  showCheckbox?: boolean;
  selectedItems?: string[];
  onSelectItem?: (id: string, checked: boolean) => void;
  onRowClick?: (item: T) => void;
  renderCell?: (item: T, column: TableColumn) => React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  getItemId?: (item: T) => string;
}

const TableContent = <T extends Record<string, any>>({
  data,
  columns,
  search = "",
  showCheckbox = true,
  selectedItems = [],
  onSelectItem,
  onRowClick,
  renderCell,
  emptyTitle,
  emptyDescription,
  getItemId = (item) => item.id || item._id || String(Math.random()),
}: TableContentProps<T>) => {
  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const defaultRenderCell = (item: T, column: TableColumn) => {
    const value = item[column.key];

    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "number") return value.toLocaleString();
    return String(value);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-b-lg dark:bg-gray-600">
        <div className="flex flex-col items-center justify-center py-16">
          <EmptyState
            title={search ? emptyTitle || "No results found" : emptyTitle || "No data yet"}
            description={
              search
                ? `No items match "${search}". Try adjusting your search.`
                : emptyDescription || "Data will be displayed here when available"
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-b-lg dark:bg-gray-500">
      {/* Desktop table view */}
      <div className="hidden lg:block">
        {data.map((item, index) => {
          const itemId = getItemId(item);
          const isSelected = selectedItems.includes(itemId);

          return (
            <div
              key={itemId}
              className={`flex items-center px-4 py-6 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 ${
                index !== data.length - 1 ? "border-b border-gray-150 dark:border-gray-500" : ""
              } ${onRowClick ? "cursor-pointer" : ""}`}
              onClick={() => onRowClick?.(item)}
            >
              {showCheckbox && (
                <div className="w-6 mr-4 flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelectItem?.(itemId, e.target.checked);
                    }}
                  />
                </div>
              )}
              <div
                className="grid items-center flex-1 gap-4"
                style={{
                  gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" "),
                }}
              >
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={`${getAlignmentClass(column.align)} text-gray-500 dark:text-white whitespace-nowrap`}
                  >
                    {renderCell ? renderCell(item, column) : defaultRenderCell(item, column)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile card view */}
      <div className="bg-gray-100 lg:hidden">
        {data.map((item, index) => {
          const itemId = getItemId(item);

          const mobileColumns = columns
            .filter((col) => col.showOnMobile !== false)
            .sort((a, b) => (a.mobileOrder ?? 0) - (b.mobileOrder ?? 0));

          const cellContents = mobileColumns.map((column) =>
            renderCell ? renderCell(item, column) : defaultRenderCell(item, column)
          );

          return (
            <div
              key={itemId}
              className={`p-4 ${
                index !== data.length - 1 ? "rounded bg-white mb-2" : "rounded bg-white"
              } ${onRowClick ? "cursor-pointer" : ""} hover:bg-gray-50 dark:hover:bg-gray-700`}
              onClick={() => onRowClick?.(item)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{cellContents[0]}</p>
                  <div className="flex gap-2 items-center">
                    <p className="text-xs font-medium text-gray-300 leading-none">{cellContents[1]}</p>
                    <Line />
                    <p>{cellContents[2]}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs">{cellContents[3]}</p>
                  <p className="text-xs text-gray-400">{cellContents[4]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableContent;
