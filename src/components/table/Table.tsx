import React from "react";
import TableContent from "./TableContent";
import TableFilterHeader from "./TableFilterHeader";
import TableHeader, { TableColumn } from "./TableHeader";

interface TableProps<T = any> {
  data: T[];
  columns: TableColumn[];
  search: string;
  setSearch: (value: string) => void;
  showModal: () => void;

  // Table configuration
  selectedTab?: string;
  searchPlaceholder?: string;
  showCheckbox?: boolean;
  showFilterHeader?: boolean;

  // Selection functionality
  selectedItems?: string[];
  onSelectItem?: (id: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;

  // Interaction
  onRowClick?: (item: T) => void;
  renderCell?: (item: T, column: TableColumn) => React.ReactNode;

  // Empty state customization
  emptyTitle?: string;
  emptyDescription?: string;
  getItemId?: (item: T) => string;

  // Filter header props
  SearchIcon?: React.ComponentType;
  FilterIcon?: React.ComponentType;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  search,
  setSearch,
  showModal,
  selectedTab = "Data",
  searchPlaceholder = "Search...",
  showCheckbox = true,
  showFilterHeader = true,
  selectedItems = [],
  onSelectItem,
  onSelectAll,
  onRowClick,
  renderCell,
  emptyTitle,
  emptyDescription,
  getItemId,
  SearchIcon,
  FilterIcon,
}: TableProps<T>) => {
  const allSelected = data.length > 0 && selectedItems.length === data.length;

  return (
    <div>
      <div className="p-4">
        {showFilterHeader && (
          <div className="">
            <TableFilterHeader
              selectedTab={selectedTab}
              search={search}
              setSearch={setSearch}
              showModal={showModal}
              searchPlaceholder={searchPlaceholder}
              SearchIcon={SearchIcon}
              FilterIcon={FilterIcon}
            />
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-600">
        <TableHeader
          columns={columns}
          showCheckbox={showCheckbox}
          onSelectAll={onSelectAll}
          allSelected={allSelected}
        />
        <TableContent
          data={data}
          columns={columns}
          search={search}
          showCheckbox={showCheckbox}
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
          onRowClick={onRowClick}
          renderCell={renderCell}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          getItemId={getItemId}
        />
      </div>
    </div>
  );
};

export default Table;
