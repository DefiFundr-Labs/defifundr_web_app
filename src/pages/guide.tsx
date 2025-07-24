import { useState } from "react";
import { ThemeToggle } from "../common/ThemeToggler";
import OTPInput from "../components/OtpInput";
import useModal from "../hooks/useModal";
import { TableColumn } from "../components/table/TableHeader";
import Table from "../components/table/Table";

// Mock data for different table types
const milestoneData = [
  {
    id: "1",
    employee: {
      name: "James Akinbola",
      role: "Front-end developer",
      avatar: "/api/placeholder/32/32",
    },
    milestoneNo: "2 of 4",
    milestoneName: "Complete onboarding flow with prototype",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Pending",
    submitted: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "2",
    employee: {
      name: "James Akinbola",
      role: "Front-end developer",
      avatar: "/api/placeholder/32/32",
    },
    milestoneNo: "2 of 4",
    milestoneName: "Complete onboarding flow with prototype",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Rejected",
    submitted: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "3",
    employee: {
      name: "James Akinbola",
      role: "Front-end developer",
      avatar: "/api/placeholder/32/32",
    },
    milestoneNo: "2 of 4",
    milestoneName: "Complete onboarding flow with prototype",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Approved",
    submitted: "25th Oct 2025 | 2:00pm",
  },
];

const invoiceData = [
  {
    id: "1",
    invoiceNo: "#INV-2025-010",
    title: "For Mar 31st - Apr 6th 2025",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Pending",
    issueDate: "25th Oct 2025",
  },
  {
    id: "2",
    invoiceNo: "#INV-2025-010",
    title: "For Mar 31st - Apr 6th 2025",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Overdue",
    issueDate: "25th Oct 2025",
  },
  {
    id: "3",
    invoiceNo: "#INV-2025-010",
    title: "For Mar 31st - Apr 6th 2025",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Paid",
    issueDate: "25th Oct 2025",
  },
];

const expenseData = [
  {
    id: "1",
    employee: {
      name: "James Akinbola",
      role: "Front-end developer",
      avatar: "/api/placeholder/32/32",
    },
    expenseName: "Electricity and data",
    expenseDate: "20th Oct 2025",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Pending",
    submitted: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "2",
    employee: {
      name: "James Akinbola",
      role: "Front-end developer",
      avatar: "/api/placeholder/32/32",
    },
    expenseName: "Electricity and data",
    expenseDate: "20th Oct 2025",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Rejected",
    submitted: "25th Oct 2025 | 2:00pm",
  },
  {
    id: "3",
    employee: {
      name: "James Akinbola",
      role: "Front-end developer",
      avatar: "/api/placeholder/32/32",
    },
    expenseName: "Electricity and data",
    expenseDate: "20th Oct 2025",
    amount: "$1,200.00",
    paidIn: "USDT",
    status: "Approved",
    submitted: "25th Oct 2025 | 2:00pm",
  },
];

const Guide = () => {
  const [milestoneSearch, setMilestoneSearch] = useState("");
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [expenseSearch, setExpenseSearch] = useState("");
  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);

  const handleOTPComplete = (code: string) => {
    console.log("OTP completed:", code);
    showSuccessModal(
      "OTP Verified",
      `Your OTP (${code}) has been verified successfully.`
    );
  };

  const {
    showInfoModal,
    showSuccessModal,
    showConfirmModal,
    showModalWithButtons,
    showContentOnlyModal,
    showEnhancedModal,
  } = useModal();

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusClasses = (status: string) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case "approved":
        case "paid":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "rejected":
        case "overdue":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusClasses(
          status
        )}`}
      >
        {status}
      </span>
    );
  };

  // Currency badge component
  const CurrencyBadge = ({ currency }: { currency: string }) => (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
      <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
      {currency}
    </span>
  );

  // Employee cell component
  const EmployeeCell = ({ employee }: { employee: any }) => (
    <div className="flex items-center">
      <img
        className="w-8 h-8 rounded-full"
        src={employee.avatar}
        alt={employee.name}
      />
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {employee.name}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {employee.role}
        </div>
      </div>
    </div>
  );

  // Table configurations
  const milestoneColumns: TableColumn[] = [
    { key: "employee", header: "Employee", width: "200px" },
    { key: "milestoneNo", header: "Milestone no.", width: "120px" },
    { key: "milestoneName", header: "Milestone name", width: "250px" },
    { key: "amount", header: "Amount", width: "120px", align: "right" },
    { key: "paidIn", header: "Paid in", width: "100px" },
    { key: "status", header: "Status", width: "100px" },
    { key: "submitted", header: "Submitted", width: "180px" },
  ];

  const invoiceColumns: TableColumn[] = [
    { key: "invoiceNo", header: "Invoice No.", width: "150px" },
    { key: "title", header: "Title", width: "300px" },
    { key: "amount", header: "Amount", width: "120px", align: "right" },
    { key: "paidIn", header: "Paid in", width: "100px" },
    { key: "status", header: "Status", width: "100px" },
    { key: "issueDate", header: "Issue date", width: "150px" },
  ];

  const expenseColumns: TableColumn[] = [
    { key: "employee", header: "Employee", width: "200px" },
    { key: "expenseName", header: "Expense name", width: "200px" },
    { key: "expenseDate", header: "Expense date", width: "150px" },
    { key: "amount", header: "Amount", width: "120px", align: "right" },
    { key: "paidIn", header: "Paid in", width: "100px" },
    { key: "status", header: "Status", width: "100px" },
    { key: "submitted", header: "Submitted", width: "180px" },
  ];

  // Custom cell renderers
  const renderMilestoneCell = (item: any, column: TableColumn) => {
    switch (column.key) {
      case "employee":
        return <EmployeeCell employee={item.employee} />;
      case "paidIn":
        return <CurrencyBadge currency={item.paidIn} />;
      case "status":
        return <StatusBadge status={item.status} />;
      default:
        return item[column.key];
    }
  };

  const renderInvoiceCell = (item: any, column: TableColumn) => {
    switch (column.key) {
      case "paidIn":
        return <CurrencyBadge currency={item.paidIn} />;
      case "status":
        return <StatusBadge status={item.status} />;
      default:
        return item[column.key];
    }
  };

  const renderInvoiceMobileCell = (item: any) => (
    <div className="flex justify-between gap-4">
      <div className="space-y-2 flex-1 min-w-0">
        <p className="truncate font-semibold text-gray-500">{item.invoiceNo}</p>
        <span className="flex items-center gap-2 ">
          <p className="text-xs font-medium text-gray-300">{item.amount}</p>

          <div className="w-px self-stretch bg-gray-150" />

          <CurrencyBadge currency={item.paidIn} />
        </span>
      </div>
      <div className="space-y-2 shrink-0  flex flex-col items-end justify-between">
        <StatusBadge status={item.status} />

        <p className="text-xs font-medium text-gray-400">25th Oct 2025</p>
      </div>
    </div>
  );

  const renderMileStoneMobileCell = (item: any) => (
    <div className="flex justify-between gap-4">
      <div className="space-y-2 flex-1 min-w-0">
        <p className="truncate font-semibold text-gray-500">
          {item.milestoneName}
        </p>
        <span className="flex items-center gap-2 ">
          <p className="text-xs font-medium text-gray-300">{item.amount}</p>

          <div className="w-px self-stretch bg-gray-150" />

          <CurrencyBadge currency={item.paidIn} />
        </span>
      </div>
      <div className="space-y-2 shrink-0  flex flex-col items-end justify-between">
        <StatusBadge status={item.status} />

        <p className="text-xs font-medium text-gray-400">25th Oct 2025</p>
      </div>
    </div>
  );

  const renderExpenseMobileCell = (item: any) => (
    <div className="flex justify-between gap-4">
      <div className="space-y-2 flex-1 min-w-0">
        <p className="truncate font-semibold text-gray-500">
          {item.expenseName}
        </p>
        <span className="flex items-center gap-2 ">
          <p className="text-xs font-medium text-gray-300">{item.amount}</p>

          <div className="w-px self-stretch bg-gray-150" />

          <CurrencyBadge currency={item.paidIn} />
        </span>
      </div>
      <div className="space-y-2 shrink-0  flex flex-col items-end justify-between">
        <StatusBadge status={item.status} />

        <p className="text-xs font-medium text-gray-400">25th Oct 2025</p>
      </div>
    </div>
  );

  const renderExpenseCell = (item: any, column: TableColumn) => {
    switch (column.key) {
      case "employee":
        return <EmployeeCell employee={item.employee} />;
      case "paidIn":
        return <CurrencyBadge currency={item.paidIn} />;
      case "status":
        return <StatusBadge status={item.status} />;
      default:
        return item[column.key];
    }
  };

  // Selection handlers
  const handleMilestoneSelect = (id: string, checked: boolean) => {
    setSelectedMilestones((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleInvoiceSelect = (id: string, checked: boolean) => {
    setSelectedInvoices((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleExpenseSelect = (id: string, checked: boolean) => {
    setSelectedExpenses((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleMilestoneSelectAll = (checked: boolean) => {
    setSelectedMilestones(checked ? milestoneData.map((item) => item.id) : []);
  };

  const handleInvoiceSelectAll = (checked: boolean) => {
    setSelectedInvoices(checked ? invoiceData.map((item) => item.id) : []);
  };

  const handleExpenseSelectAll = (checked: boolean) => {
    setSelectedExpenses(checked ? expenseData.map((item) => item.id) : []);
  };

  const handleDelete = () => {
    console.log("Delete action confirmed");
    showSuccessModal("Deleted", "Item has been successfully deleted.");
  };

  // Modal examples (keeping existing code)
  const handleNoButtonsModal = () => {
    const content = (
      <div className="py-8 text-center">
        <div className="mb-4 text-6xl">🎉</div>
        <h3 className="mb-2 text-xl font-bold">Congratulations!</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your action was completed successfully.
        </p>
      </div>
    );

    showContentOnlyModal(content, {
      size: "md",
      showCloseButton: true,
    });
  };

  const handleCustomButtonsModal = () => {
    const buttons = [
      {
        text: "Save Draft",
        variant: "secondary" as const,
        onClick: () => console.log("Draft saved"),
      },
      {
        text: "Publish Now",
        variant: "primary" as const,
        onClick: () => console.log("Published"),
      },
      {
        text: "Schedule",
        variant: "success" as const,
        onClick: () => console.log("Scheduled"),
      },
    ];

    showModalWithButtons(
      "Publish Article",
      "How would you like to handle this article?",
      buttons,
      { size: "lg" }
    );
  };

  const handleForceActionModal = () => {
    const buttons = [
      {
        text: "Accept",
        variant: "primary" as const,
        onClick: () => console.log("Accepted"),
      },
      {
        text: "Decline",
        variant: "danger" as const,
        onClick: () => console.log("Declined"),
      },
    ];

    showModalWithButtons(
      "Terms & Conditions",
      "You must accept our terms and conditions to continue.",
      buttons,
      {
        size: "md",
        showCloseButton: false,
      }
    );
  };

  const handleEnhancedModal = () => {
    const content = (
      <div className="space-y-6">
        <div className="flex items-center justify-center w-20 h-20 p-4 mx-auto rounded-full bg-primary-200">
          <span className="text-4xl">📧</span>
        </div>

        <div className="text-center">
          <h3 className="mb-2 text-xl font-bold">Check your email</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            We've sent a verification link to your email address.
          </p>
        </div>

        <ul className="space-y-2 text-sm text-left">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check your spam or junk folder</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Wait a few minutes for delivery</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Make sure your email address is correct</span>
          </li>
        </ul>
      </div>
    );

    showEnhancedModal(content, {
      title: "Email Verification",
      size: "md",
      showButtons: true,
      buttons: [
        {
          text: "Resend Email",
          variant: "secondary",
          onClick: () => console.log("Resending email..."),
        },
        {
          text: "Change Email",
          variant: "primary",
          onClick: () => console.log("Opening email change form..."),
        },
      ],
      showCloseButton: false,
    });
  };

  const handleLoadingModal = () => {
    const content = (
      <div className="py-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary-200"></div>
        <h3 className="mb-2 text-lg font-medium">Processing...</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we process your request.
        </p>
      </div>
    );

    showContentOnlyModal(content, {
      size: "sm",
      showCloseButton: false,
    });

    setTimeout(() => {
      showSuccessModal("Complete!", "Your request has been processed.");
    }, 3000);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="h2">Form Controls Guide</h1>
        <ThemeToggle />
      </div>

      {/* OTP Section */}
      <div className="p-6 mb-12 bg-gray-100 rounded-lg dark:bg-gray-500">
        <h2 className="mb-6 h3">OTP Verification</h2>
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <OTPInput onComplete={handleOTPComplete} />
          </div>
        </div>
      </div>

      {/* Table Examples Section */}
      <div className="mb-12 space-y-8">
        <h2 className="mb-6 h3">Table Examples</h2>

        {/* Milestone Requests Table */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Milestone Requests Table</h3>
          <Table
            data={milestoneData}
            columns={milestoneColumns}
            search={milestoneSearch}
            setSearch={setMilestoneSearch}
            showModal={() => console.log("Show milestone filter modal")}
            selectedTab="Milestone requests"
            searchPlaceholder="Search by milestone..."
            selectedItems={selectedMilestones}
            onSelectItem={handleMilestoneSelect}
            onSelectAll={handleMilestoneSelectAll}
            renderCell={renderMilestoneCell}
            onRowClick={(item) => console.log("Clicked milestone:", item)}
            renderMobileCell={renderMileStoneMobileCell}
          />
        </div>

        {/* Invoice History Table */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Invoice History Table</h3>
          <Table
            data={invoiceData}
            columns={invoiceColumns}
            search={invoiceSearch}
            setSearch={setInvoiceSearch}
            showModal={() => console.log("Show invoice filter modal")}
            selectedTab="Invoice history"
            searchPlaceholder="Search by title..."
            selectedItems={selectedInvoices}
            onSelectItem={handleInvoiceSelect}
            onSelectAll={handleInvoiceSelectAll}
            renderCell={renderInvoiceCell}
            onRowClick={(item) => console.log("Clicked invoice:", item)}
            renderMobileCell={renderInvoiceMobileCell}
          />
        </div>

        {/* Expense Requests Table */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Expense Requests Table</h3>
          <Table
            data={expenseData}
            columns={expenseColumns}
            search={expenseSearch}
            setSearch={setExpenseSearch}
            showModal={() => console.log("Show expense filter modal")}
            selectedTab="Expense requests"
            searchPlaceholder="Search by employee..."
            selectedItems={selectedExpenses}
            onSelectItem={handleExpenseSelect}
            onSelectAll={handleExpenseSelectAll}
            renderCell={renderExpenseCell}
            onRowClick={(item) => console.log("Clicked expense:", item)}
            renderMobileCell={renderExpenseMobileCell}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column - Text & Number inputs */}
        <div className="space-y-6">
          <h2 className="mb-4 h3">Text Inputs</h2>

          <div className="form-control">
            <label htmlFor="name">Regular Text Input</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>

          <div className="form-control">
            <label htmlFor="email">Email Input</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password Input</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount">Number Input (No Spinners)</label>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              className="appearance-none"
            />
          </div>

          <div className="form-control">
            <label htmlFor="message">Textarea</label>
            <textarea
              id="message"
              placeholder="Enter your message"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Right column - Select, Radio & Checkbox */}
        <div className="space-y-6">
          <h2 className="mb-4 h3">Selection Controls</h2>

          <div className="form-control">
            <label htmlFor="category">Default Select Dropdown</label>
            <select id="category">
              <option value="">Select a category</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="disabledSelect">Disabled Select</label>
            <select id="disabledSelect" disabled>
              <option value="">Select is disabled</option>
              <option value="option1">Option 1</option>
            </select>
          </div>

          <div className="form-control form-control--invalid">
            <label htmlFor="errorSelect">Select with Error</label>
            <select id="errorSelect">
              <option value="">Please select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <div className="error-message">This field is required</div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 h4">Checkboxes</h3>
            <div className="space-y-3">
              <div className="form-control--checkbox">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                />
                <label htmlFor="agreeToTerms">
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="form-control--checkbox">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                  defaultChecked
                />
                <label htmlFor="subscribe">Subscribe to newsletter</label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 h4">Radio Buttons</h3>
            <div className="space-y-3">
              <div className="form-control--checkbox">
                <input
                  type="radio"
                  id="radioOption1"
                  name="radioGroup"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                  defaultChecked
                />
                <label htmlFor="radioOption1">Option 1</label>
              </div>
              <div className="form-control--checkbox">
                <input
                  type="radio"
                  id="radioOption2"
                  name="radioGroup"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                />
                <label htmlFor="radioOption2">Option 2</label>
              </div>
              <div className="form-control--checkbox">
                <input
                  type="radio"
                  id="radioOption3"
                  name="radioGroup"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                />
                <label htmlFor="radioOption3">Option 3</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button examples */}
      <div className="mt-8 space-y-4">
        <h2 className="mb-4 h3">Button Examples</h2>
        <div className="flex flex-wrap gap-4">
          <button className="button button--primary">Primary Button</button>
          <button className="button button--secondary">Secondary Button</button>
          <button className="button button--primary" disabled>
            Disabled Button
          </button>
        </div>
      </div>

      {/* Modal Examples */}
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="h2">Modal Examples</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button
            className="button button--primary"
            onClick={() =>
              showInfoModal("Information", "This is an informational message.")
            }
          >
            Basic Info Modal
          </button>

          <button
            className="button button--primary"
            onClick={() =>
              showConfirmModal(
                "Confirm Delete",
                "Are you sure you want to delete this item?",
                handleDelete,
                "Delete",
                "Cancel"
              )
            }
          >
            Confirm Modal
          </button>

          <button
            className="button button--primary"
            onClick={handleNoButtonsModal}
          >
            No Buttons Modal
          </button>

          <button
            className="button button--primary"
            onClick={handleCustomButtonsModal}
          >
            Custom Buttons Modal
          </button>

          <button
            className="button button--primary"
            onClick={handleForceActionModal}
          >
            Force Action Modal
          </button>

          <button
            className="button button--primary"
            onClick={handleEnhancedModal}
          >
            Enhanced Modal
          </button>

          <button
            className="button button--primary"
            onClick={handleLoadingModal}
          >
            Loading Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
