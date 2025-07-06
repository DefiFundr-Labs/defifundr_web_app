import {
  InvoiceDetailTableProps,
  InvoiceStatus,
  InvoiceTableCell,
} from "../../../types/types";

const InvoiceDetailTable = ({ body, headers }: InvoiceDetailTableProps) => {
  const getStatusBadge = (status: InvoiceStatus) => {
    const statusStyles: Record<InvoiceStatus, string> = {
      Pending:
        "border-warning-500 bg-warning-300 dark:bg-warning-400 text-warning-500",
      Paid: "border-success-500 bg-success-300 dark:bg-success-400 text-success-500",
      Approved: "border-info-300 bg-info-500 dark:bg-info-400 text-info-300",
      Rejected:
        "border-error-500 bg-error-400 dark:bg-error-300 text-error-500",
    };

    return (
      <span
        className={`py-1 px-2 border text-xs font-semibold w-fit rounded-full ${
          statusStyles[status] || statusStyles["Pending"]
        }`}
      >
        {status}
      </span>
    );
  };

  const renderCell = (cell: InvoiceTableCell, alignment: "left" | "right") => {
    const { text, icon, status, iconLabel } = cell;
    if (status) return getStatusBadge(status);
    else if (icon)
      return (
        <span
          className={`flex items-center gap-2 ${
            alignment === "right" ? "justify-end" : "justify-start"
          }`}
        >
          {icon}

          <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
            {iconLabel}
          </p>
        </span>
      );
    else return text;
  };

  return (
    <table className="w-full">
      <thead className="bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-200  ">
        <th className="py-1 px-2 text-left text-xs font-medium">
          {headers[0]}
        </th>
        <th className="text-right py-1 px-2 text-xs font-medium">
          {headers[1]}
        </th>
      </thead>
      <tbody>
        <tr className="text-sm font-semibold text-gray-500 dark:text-gray-150 ">
          <td className="px-2 py-1">{renderCell(body[0], "left")}</td>
          <td className="px-2 py-1 text-right">
            {renderCell(body[1], "right")}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default InvoiceDetailTable;
