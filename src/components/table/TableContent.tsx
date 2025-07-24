import React from "react";
import EmptyState from "../dashboard/EmptyState";
import { TableColumn } from "./TableHeader";

interface TableContentProps<T = any> {
  data: T[];
  columns: TableColumn[];
  search?: string;
  showCheckbox?: boolean;
  selectedItems?: string[];
  onSelectItem?: (id: string, checked: boolean) => void;
  onRowClick?: (item: T) => void;
  renderCell?: (item: T, column: TableColumn) => React.ReactNode;
  renderMobileCell: (item: T) => React.ReactNode;
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
  renderMobileCell,
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

    if (value === null || value === undefined) {
      return "-";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "number") {
      return value.toLocaleString();
    }

    return String(value);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-b-lg dark:bg-gray-600">
        <div className="flex flex-col items-center justify-center py-16">
          <EmptyState
            title={
              search
                ? emptyTitle || "No results found"
                : emptyTitle || "No data yet"
            }
            description={
              search
                ? `No items match "${search}". Try adjusting your search.`
                : emptyDescription ||
                  "Data will be displayed here when available"
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-b-lg dark:bg-gray-600">
      {/* Desktop table view */}
      <div className="hidden md:block">
        {data.map((item, index) => {
          const itemId = getItemId(item);
          const isSelected = selectedItems.includes(itemId);

          return (
            <div
              key={itemId}
              className={`flex items-center px-4 py-4 text-sm hover:bg-gray-50   dark:hover:bg-gray-700 ${
                index !== data.length - 1
                  ? "border-b border-gray-150 dark:border-gray-500"
                  : ""
              } ${onRowClick ? "cursor-pointer" : ""}`}
              onClick={() => onRowClick?.(item)}
            >
              {showCheckbox && (
                <div className="w-6 mr-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                  gridTemplateColumns: columns
                    .map((col) => col.width || "1fr")
                    .join(" "),
                }}
              >
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={`${getAlignmentClass(
                      column.align
                    )} text-gray-900 dark:text-white`}
                  >
                    {renderCell
                      ? renderCell(item, column)
                      : defaultRenderCell(item, column)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile card view */}
      <div className="md:hidden">
        {data.map((item, index) => {
          const itemId = getItemId(item);
          // const isSelected = selectedItems.includes(itemId);

          return (
            <div
              key={itemId}
              className={`py-4 px-2 ${
                index !== data.length - 1
                  ? "border-b border-gray-150 dark:border-gray-500"
                  : ""
              } ${
                onRowClick ? "cursor-pointer" : ""
              } hover:bg-gray-50 dark:hover:bg-gray-700`}
              onClick={() => onRowClick?.(item)}
            >
              {/* {showCheckbox && (
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelectItem?.(itemId, e.target.checked);
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    Select
                  </span>
                </div>
              )} */}
              {renderMobileCell(item)}
              {/* <div className="space-y-2">
                  {columns.map((column) => {
                    const cellContent = renderCell
                      ? renderCell(item, column)
                      : defaultRenderCell(item, column);
                    if (!cellContent || cellContent === "-") return null;

                    return (
                      <div
                        key={column.key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {column.header}
                        </span>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {cellContent}
                        </div>
                      </div>
                    );
                  })}
                </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableContent;
