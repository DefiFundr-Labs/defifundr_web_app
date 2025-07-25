import { FormEvent, useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../../../utils/constant";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../../../common/dashboard/TitleHeader";
import { ClipLoader } from "react-spinners";
import { EyeOff, EyeOn } from "../../../../assets/svg/svg";

const EditProfile = () => {
  const info = getProfile();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setName(info.name);
    setEmail(info.email);
  }, [info]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    updateProfile({
      email,
      name,
    });

    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1000);
  };

  const toggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prev) => !prev);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setIsConfirmNewPasswordVisible((prev) => !prev);
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      <TitleHeader title="Company information" isBackButton />

      <div className="p-4">
        <form
          className="bg-white dark:bg-gray-500 rounded-lg max-w-125 w-full p-4 lg:p-6 space-y-10 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="--"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="email">Account email address</label>
              <input
                type="email"
                id="email"
                placeholder="--"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <p className=" text-gray-500 font-semibold text-sm">
              Change your password
            </p>

            <div className="form-control">
              <label htmlFor="password">Current password</label>
              <div className="relative">
                <input
                  type={isCurrentPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="--"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute transform -translate-y-1/2 right-4.5 top-1/2 focus:outline-none cursor-pointer"
                  aria-label="Toggle password visibility"
                  onClick={toggleCurrentPasswordVisibility}
                >
                  {isCurrentPasswordVisible ? <EyeOn /> : <EyeOff />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="newPassword">New password</label>

              <div className="relative">
                <input
                  type={isNewPasswordVisible ? "text" : "password"}
                  id="newPassword"
                  placeholder="--"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="absolute transform -translate-y-1/2 right-4.5 top-1/2 focus:outline-none cursor-pointer"
                  aria-label="Toggle password visibility"
                  onClick={toggleNewPasswordVisibility}
                >
                  {isNewPasswordVisible ? <EyeOn /> : <EyeOff />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="confirmNewPassword">Confirm new password</label>
              <div className="relative">
                <input
                  type={isConfirmNewPasswordVisible ? "text" : "password"}
                  id="confirmNewPassword"
                  placeholder="--"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="absolute transform -translate-y-1/2 right-4.5 top-1/2 focus:outline-none cursor-pointer"
                  aria-label="Toggle password visibility"
                  onClick={toggleConfirmNewPasswordVisibility}
                >
                  {isConfirmNewPasswordVisible ? <EyeOn /> : <EyeOff />}
                </button>
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="bg-primary-200 disabled:bg-primary-200/90 hover:bg-primary-200/90 rounded-full text-white font-medium h-14 w-full flex items-center justify-center"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
