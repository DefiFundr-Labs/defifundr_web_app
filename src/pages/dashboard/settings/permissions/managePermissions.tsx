import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TitleHeader from "../../../../common/dashboard/TitleHeader";
import { CancelIcon, InfoIcon } from "../../../../assets/svg/svg";
import useModal from "../../../../hooks/useModal";
import PermissionsInfoModal from "../../../../components/modal/settings/PermissionsInfoModal";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllUserPermission,
  updateUserPermission,
} from "../../../../utils/constant";
import { UserPermissionsData } from "../../../../types/types";

const permissionList = [
  "Administrator",
  "Team manager",
  "Expenses administrator",
  "External recruiter",
  "Invoice administrator",
  "Payroll administrator",
  "Time off administrator",
];

const ManagePermissions = () => {
  const { id } = useParams();

  const [user, setUser] = useState<UserPermissionsData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = getAllUserPermission();
    const savedUserPermission = saved.find(
      (user) => id && user.id === Number(id)
    );

    if (savedUserPermission) setUser(savedUserPermission);
    else
      setUser({
        id: saved.length + 1,
        email: "",
        name: "",
        permissions: [],
      });
  }, [id]);

  const { showCustomModal } = useModal();
  const navigate = useNavigate();

  const handleShowModal = () => {
    showCustomModal(<PermissionsInfoModal />, "lg");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      setLoading(true);

      updateUserPermission(user);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1000);
    }
  };

  const handleTogglePermission = (permission: string) => {
    if (user) {
      const permissions = user.permissions;
      const isSelected = permissions.includes(permission);

      if (isSelected)
        setUser((user) => {
          if (user)
            return {
              ...user,
              permissions: user.permissions.filter(
                (item) => item !== permission
              ),
            };
        });
      else
        setUser((user) => {
          if (user)
            return { ...user, permissions: [...permissions, permission] };
        });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((user) => {
      if (user)
        return {
          ...user,
          [e.target.id]: e.target.value,
        };
    });
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      <TitleHeader title="Permissions" isBackButton />

      <div className="p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-500 rounded-lg max-w-125 w-full p-4 lg:p-6 space-y-10 mx-auto"
        >
          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                id="name"
                placeholder="--"
                value={user?.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                id="email"
                placeholder="--"
                value={user?.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-150 mb-2">
                <p className=" font-medium gap-1">Permissions</p>

                <button
                  type="button"
                  onClick={handleShowModal}
                  className="hidden lg:flex items-center gap-1 font-semibold "
                >
                  <span className="text-warning-500">
                    <InfoIcon />
                  </span>
                  More info
                </button>
              </div>

              <div className="flex gap-x-1 gap-y-2 flex-wrap">
                {permissionList.map((permission) => (
                  <button
                    key={permission}
                    className={
                      "flex items-center gap-1 h-8 px-4 rounded-full text-sm font-medium " +
                      (user?.permissions.includes(permission)
                        ? "bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400"
                        : "bg-gray-100 dark:bg-gray-600 text-gray-300 ")
                    }
                    type="button"
                    onClick={() => handleTogglePermission(permission)}
                  >
                    {permission}
                    {user?.permissions.includes(permission) && (
                      <span>
                        <CancelIcon />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="bg-primary-200 hover:bg-primary-200/90 rounded-full text-white font-medium h-14 w-full"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagePermissions;
