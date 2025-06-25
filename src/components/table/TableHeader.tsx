import React from "react";

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  showOnMobile?: boolean;
  mobileOrder?: number;
}

interface TableHeaderProps {
  columns: TableColumn[];
  showCheckbox?: boolean;
  onSelectAll?: (checked: boolean) => void;
  allSelected?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  showCheckbox = true,
  onSelectAll,
  allSelected = false,
}) => {
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

  return (
    <div className="hidden bg-gray-100  dark:bg-gray-600 lg:block">
      <div className="flex items-center p-4 font-medium text-gray-400 dark:text-gray-300">
        {showCheckbox && (
          <div className="w-6 mr-4 flex items-center justify-center">
            <input
              type="checkbox"
              className="w-6 h-6 "
              checked={allSelected}
              onChange={(e) => onSelectAll?.(e.target.checked)}
            />
          </div>
        )}
        <div
          className={`flex-1 grid gap-4`}
          style={{
            gridTemplateColumns: columns
              .map((col) => col.width || "1fr")
              .join(" "),
          }}
        >
          {columns.map((column) => (
            <div key={column.key} className={getAlignmentClass(column.align)}>
              {column.header}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;