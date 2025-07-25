import { ChangeEvent, useState } from "react";
import SettingsField from "../../../components/dashboard/SettingsField";

type NotificationKey =
  | "contractRequests"
  | "contractsUpdates"
  | "contractsTerminations"
  | "timeOffRequests"
  | "timesheets"
  | "milestones"
  | "invoiceUpdates"
  | "expenseSubmissions";

const employmentFields: { label: string; key: NotificationKey }[] = [
  { label: "Contract requests", key: "contractRequests" },
  { label: "Contract updates", key: "contractsUpdates" },
  { label: "Contract terminations", key: "contractsTerminations" },
];

const teamManagementFields: {
  label: string;
  key: NotificationKey;
  required?: boolean;
}[] = [
  { label: "Time off requests", key: "timeOffRequests" },
  { label: "Timesheets", key: "timesheets" },
  { label: "Milestones", key: "milestones" },
  {
    label: "Invoice updates, approvals & reminders",
    key: "invoiceUpdates",
    required: true,
  },
  { label: "Expense submissions", key: "expenseSubmissions", required: true },
];

const Notification: React.FC = () => {
  const [notification, setNotification] = useState<
    Record<NotificationKey, boolean>
  >({
    contractRequests: true,
    contractsUpdates: true,
    contractsTerminations: true,
    timeOffRequests: true,
    timesheets: true,
    milestones: true,
    invoiceUpdates: false,
    expenseSubmissions: false,
  });

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setNotification((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <p className="font-semibold text-gray-500 ">Employment</p>

        <div>
          {employmentFields.map(({ label, key }) => (
            <SettingsField
              title={label}
              value={
                <input
                  type="checkbox"
                  id={key}
                  onChange={handleToggle}
                  className="cursor-pointer w-9 h-5 bg-gray-150 checked:bg-primary-200 shrink-0  before:block before:size-4 before:bg-white before:rounded-full rounded-full appearance-none relative before:shadow before:shadow-black/50 before:absolute before:left-0.5 before:top-0.5 checked:before:translate-x-full before:transform before:transition-transform before:duration-200 before:ease-in-out "
                  checked={notification[key]}
                />
              }
              key={label}
            />
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <p className="font-semibold text-gray-500 ">Team management</p>

        <div>
          {teamManagementFields.map(({ label, key, required }) => (
            <SettingsField
              title={label}
              value={
                required ? (
                  "Required"
                ) : (
                  <input
                    type="checkbox"
                    id={key}
                    onChange={handleToggle}
                    className="cursor-pointer w-9 h-5 bg-gray-150 checked:bg-primary-200 shrink-0  before:block before:size-4 before:bg-white before:rounded-full rounded-full appearance-none relative before:shadow before:shadow-black/50 before:absolute before:left-0.5 before:top-0.5 checked:before:translate-x-full before:transform before:transition-transform before:duration-200 before:ease-in-out "
                    checked={notification[key]}
                  />
                )
              }
              key={label}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Notification;
