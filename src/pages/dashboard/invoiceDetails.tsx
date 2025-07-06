import { useState } from "react";

import {
  DocumentIcon,
  EthIcon,
  Location,
  Mail,
  Phone,
  UsdtIcon,
} from "../../assets/svg/svg";
import InvoiceDetailTable from "../../components/dashboard/invoices/InvoiceDetailTable";
import { InvoiceDetailTableProps, InvoiceStatus } from "../../types/types";
import ServiceCard from "../../components/dashboard/invoices/ServiceCard";
import InvoiceHeader from "../../components/dashboard/invoices/InvoiceHeader";
import InvoiceDetailFooter from "../../components/dashboard/invoices/InvoiceDetailFooter";
import useModal from "../../hooks/useModal";
import MakeInvoicePayment from "../../components/modal/MakeInvoicePayment";
import RejectTimeSheetModal from "../../components/modal/RejectTimeSheetModal";
import {
  billingDetailsData,
  invoiceBreakDownData,
  invoiceServiceData,
} from "../../utils/constant";

const InvoiceDetails = () => {
  const [showCtaButton, setShowCtaButton] = useState<boolean>(true);
  const [status, setStatus] = useState<InvoiceStatus>("Pending");
  const [reason, setReason] = useState("");

  const { showCustomModal, hideModal } = useModal();

  const handleOnApprove = () => {
    setShowCtaButton(false);
    setStatus("Approved");
  };
  const handleReject = () => {
    showCustomModal(
      <RejectTimeSheetModal
        handleReject={(reason) => {
          setReason(reason);
          setStatus("Rejected");
          setShowCtaButton(false);

          hideModal();
        }}
      />,
      "md"
    );
  };

  const handlePayment = () => {
    showCustomModal(
      <MakeInvoicePayment
        handlePayment={() => {
          setStatus("Paid");
          hideModal();
        }}
      />,
      "md"
    );
  };

  const statusTable: InvoiceDetailTableProps[] = [
    {
      headers: ["Status", "Invoice no"],
      body: [{ status: status }, { text: "#INV-2025-001" }],
    },
    {
      headers: ["Type", "Paid in"],
      body: [
        { text: "Contract Monthly Payment" },
        { icon: <UsdtIcon />, iconLabel: "USDT" },
      ],
    },
    {
      headers: ["Title", "Network"],
      body: [
        { text: "For Mar 31st - Apr 6th 2025" },
        { icon: <EthIcon />, iconLabel: "Ethereum" },
      ],
    },
    {
      headers: ["Issue Date", "Due Date"],
      body: [{ text: "15 April 2025" }, { text: "29 April 2025" }],
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-600">
      <InvoiceHeader
        title="#INV-607"
        showCtaButton={showCtaButton}
        onApprove={handleOnApprove}
        handleReject={handleReject}
        status={status}
        handlePayment={handlePayment}
      />

      <section className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4 max-w-4xl w-full pb-22 lg:pb-4">
        <div className="lg:col-span-2 flex flex-col items-center justify-center bg-white dark:bg-gray-500 p-6 rounded-lg gap-4">
          <div className="rounded-full bg-primary-500 dark:bg-primary-50 p-7 text-primary-200 dark:text-primary-400">
            <DocumentIcon />
          </div>

          <span className="space-y-1 text-center">
            <p className="text-gray-500 dark:text-gray-150 text-xl font-semibold">
              581 USDT
            </p>
            <p className="font-medium text-gray-400  dark:text-gray-200">
              ≈$582.20
            </p>
          </span>
        </div>

        {/* billing cards info */}
        {billingDetailsData.map((details) => (
          <div
            className="p-6 rounded-lg bg-white dark:bg-gray-500 space-y-4"
            key={details.tag}
          >
            <span className="py-1 px-2 rounded-full bg-primary-500 dark:bg-primary-50 border border-info-300 text-primary-200 dark:text-primary-400 font-semibold text-xs inline-block">
              {details.tag}
            </span>

            <div>
              <p className="font-semibold text-gray-600 dark:text-gray-150 mb-1">
                {details.name}
              </p>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-150 space-y-2">
                <div className="flex flex-wrap items-center">
                  <span className="flex items-center gap-1 mr-6">
                    <Mail />
                    {details.mail}
                  </span>

                  <span className="flex items-center gap-1">
                    <Phone />
                    {details.phone}
                  </span>
                </div>

                <span className="flex items-start gap-1">
                  <Location />
                  {details.location}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Details */}
        <div className="p-6 rounded-lg bg-white dark:bg-gray-500 space-y-4">
          <span className="py-1 px-2 rounded-full bg-primary-500 dark:bg-primary-50 border border-info-300 text-primary-200 dark:text-primary-400 font-semibold text-xs inline-block">
            Details
          </span>

          <div className="space-y-2">
            {statusTable.map((detail, idx) => (
              <InvoiceDetailTable
                headers={detail.headers}
                body={detail.body}
                key={idx}
              />
            ))}
            {reason && (
              <div>
                <div className="bg-gray-100 text-gray-400 font-medium text-xs py-1 px-2">
                  Reason for rejection
                </div>
                <p className="py-1 px-2 text-sm font-semibold text-gray-500">
                  {reason}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Breakdown */}
        <div className="p-6 rounded-lg bg-white dark:bg-gray-500 space-y-4">
          <span className="py-1 px-2 rounded-full bg-primary-500 dark:bg-primary-50 border border-info-300 text-primary-200 dark:text-primary-400 font-semibold text-xs inline-block">
            Invoice Breakdown
          </span>

          {invoiceBreakDownData.map((invoice, idx) => (
            <div
              className={
                "grid grid-cols-2 gap-1 p-2 font-medium text-xs items-center " +
                ((idx + 1) % 2 !== 0 ? "bg-gray-100 dark:bg-gray-600" : "")
              }
              key={invoice.value}
            >
              <p className=" text-gray-400 dark:text-gray-200">
                {invoice.title}
              </p>

              <span className="text-right">
                <p className="text-gray-500 dark:text-gray-150 font-semibold text-sm">
                  {invoice.value}
                </p>
                {invoice.subValue && (
                  <p className="text-gray-400 dark:text-gray-200">
                    {invoice.subValue}
                  </p>
                )}
              </span>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-1 p-2 font-medium text-xs items-center bg-gray-100 dark:bg-gray-600">
            <p className=" text-gray-400 dark:text-gray-150">Total Amount</p>

            <span className="text-right">
              <p className="text-gray-500 font-semibold text-xl dark:text-gray-150">
                $582.20
              </p>
            </span>
          </div>
        </div>

        {/* Payment Memo */}
        <div className="p-6 rounded-lg bg-white dark:bg-gray-500 space-y-4 lg:col-span-2">
          <span className="py-1 px-2 rounded-full bg-primary-500 dark:bg-primary-50 border border-info-300 text-primary-200 dark:text-primary-400 font-semibold text-xs inline-block">
            Payment Memo
          </span>

          <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
            Thank you for your business. Please remit payment according to the
            terms outlined in this invoice. If you have any questions regarding
            this invoice or the payment process, do not hesitate to contact us.
          </p>
        </div>

        {invoiceServiceData.map((service, idx) => (
          <ServiceCard {...service} key={idx} />
        ))}
      </section>

      <InvoiceDetailFooter
        showButton={showCtaButton}
        status={status}
        onPayment={handlePayment}
        onApprove={handleOnApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default InvoiceDetails;
