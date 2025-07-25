import { Link } from "react-router-dom";
import { BillingEmailIcon, EditIcon, TrashIcon } from "../../../assets/svg/svg";
import { RoutePaths } from "../../../routes/routesPath";
import { useEffect, useState } from "react";
import { getAllUserPermission } from "../../../utils/constant";
import { UserPermissionsData } from "../../../types/types";
import { Plus } from "lucide-react";
import BillingEmailModal from "../../../components/modal/settings/BillingEmailModal";
import useModal from "../../../hooks/useModal";

const Permissions = () => {
  const [permissions, setPermissions] = useState<UserPermissionsData[]>([]);
  const [billingEmail, setBillingEmail] = useState("");

  const { showCustomModal, hideModal } = useModal();

  useEffect(() => {
    const savedUserPermission = getAllUserPermission();
    setPermissions(savedUserPermission);
  }, []);

  const handlePermissionRemoval = (id: number) => {
    let updatedPermission;
    setPermissions((permissions) => {
      updatedPermission = permissions.filter((p) => p.id !== id);
      return updatedPermission;
    });
    localStorage.setItem("permissions", JSON.stringify(updatedPermission));
  };

  const handleBillingAddress = () =>
    showCustomModal(
      <BillingEmailModal
        onSave={(email: string) => {
          setBillingEmail(email);
          hideModal();
        }}
        initialEmail={billingEmail}
      />,
      "lg"
    );

  return (
    <>
      {/* BIlling email address */}
      <div className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <div className="flex justify-between items-center w-full gap-1">
          <h3 className="font-semibold text-gray-500 dark:text-gray-150">
            BIlling email address
          </h3>

          <button
            onClick={handleBillingAddress}
            className="flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
          >
            {billingEmail ? (
              <>
                <EditIcon /> Edit
              </>
            ) : (
              <>
                <Plus size={16} /> Add
              </>
            )}
          </button>
        </div>

        <div className="p-4 border rounded-lg border-gray-150 dark:border-gray-250">
          {billingEmail ? (
            <div className="flex items-center gap-4">
              <BillingEmailIcon />
              <div>
                <p className="text-xs font-medium text-gray-300 mb-2">
                  Email address
                </p>

                <p className="text-gray-500 dark:text-gray-150 font-semibold">
                  {billingEmail}
                </p>
              </div>
            </div>
          ) : (
            <p className="mx-auto max-w-sm w-full font-medium text-xs text-gray-400 dark:text-gray-200 text-center">
              You don't have any billing email addresses set up currently,
              therefore, invoices will be sent to company administrators by
              default.
            </p>
          )}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-semibold text-gray-500 dark:text-gray-150">
            Permissions
          </h3>

          <Link
            to={RoutePaths.PERMISSIONS_SETTINGS}
            className="flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
          >
            <EditIcon /> Set permission
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-600 ">
              <th className="py-4 pl-4 text-gray-400 dark:text-gray-200 font-medium text-sm">
                Name
              </th>
              <th className="p-4 text-gray-400 dark:text-gray-200 font-medium text-sm">
                Permissions
              </th>
              <th />
            </thead>
            <tbody>
              {permissions.map((userPermission) => (
                <tr
                  className="border-b border-gray-150 dark:border-gray-250 "
                  key={userPermission.id}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-600" />

                      <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-150 mb-1">
                          {userPermission.name}
                        </p>
                        <p className="font-medium text-xs text-gray-400 dark:text-gray-200">
                          {userPermission.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 items-center flex-wrap">
                      {userPermission.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="rounded-full text-nowrap bg-primary-500 dark:bg-primary-50 border border-warning-500 py-1 px-2 text-sm font-semibold text-primary-200"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`${RoutePaths.PERMISSIONS_SETTINGS}/${userPermission.id}`}
                        className="size-8 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-150 dark:hover:bg-gray-50 text-gray-400 dark:text-gray-200 flex items-center justify-center cursor-pointer"
                      >
                        <EditIcon />
                      </Link>
                      {/* TODO:all my button styles */}
                      <button
                        onClick={() =>
                          handlePermissionRemoval(userPermission.id)
                        }
                        className="size-8 rounded-full bg-error-400 dark:bg-error-300 flex items-center justify-center cursor-pointer"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Permissions;
