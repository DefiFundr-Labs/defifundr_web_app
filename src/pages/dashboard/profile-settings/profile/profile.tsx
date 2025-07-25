import { Link } from "react-router-dom";
import {
  EditIcon,
  InfoIcon,
  SetupIcon,
  ShareIcon,
} from "../../../../assets/svg/svg";
import { RoutePaths } from "../../../../routes/routesPath";
import SettingsField from "../../../../components/dashboard/SettingsField";
import EditImageModal from "../../../../components/modal/EditImageModal";
import { useState } from "react";
import useModal from "../../../../hooks/useModal";
import { getProfile } from "../../../../utils/constant";

const Profile = () => {
  const savedProfile = getProfile();

  const generalInformation = [
    {
      title: "Name",
      value: savedProfile.name,
    },
    {
      title: "Account email",
      value: savedProfile.email,
    },
    {
      title: "Password",
      value: "••••••••••••",
    },
  ];

  const legalData = [
    "Help & Support",
    "Terms and conditions",
    "Privacy notice",
  ];

  const [imageSrc, setImageSrc] = useState<string>("");
  const { showCustomModal, hideModal } = useModal();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    // show modal after setting imageSrc
    showCustomModal(
      // TODO: touch th modal
      <EditImageModal
        imageSrc={url}
        onSave={async (blob) => {
          const croppedUrl = URL.createObjectURL(blob);
          setImageSrc(croppedUrl);
          hideModal();
        }}
      />,
      "lg"
    );
  };

  const name = "Peter";

  return (
    <>
      <div className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="size-15 overflow-hidden rounded-full bg-primary-500 dark:bg-primary-50 text-4xl font-semibold text-primary-200 dark:text-primary-400 flex items-center justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="profile image"
                className="object-cover size-full"
              />
            ) : (
              name[0].toUpperCase()
            )}
          </div>

          <div>
            <p className="text-xl font-semibold mb-1 text-gray-500 dark:text-gray-150">
              {name}
            </p>
            <p className="text-sm font-medium text-gray-300 ">
              dapoye8379@deusa7.com
            </p>
          </div>
        </div>

        <button className="flex relative items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <ShareIcon />
          Upload image
        </button>
      </div>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        {/* TODO: make this a component */}
        <div className="flex justify-between items-center w-full">
          <h3 className="font-semibold text-gray-500 dark:text-gray-150">
            General
          </h3>

          <Link
            to={RoutePaths.EDIT_PROFILE_SETTINGS}
            className="flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
          >
            <EditIcon /> Edit
          </Link>
        </div>

        <div>
          {generalInformation.map((profile) => (
            <SettingsField
              key={profile.title}
              title={profile.title}
              value={profile.value}
            />
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        {/* TODO: make this a component */}
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="font-semibold text-gray-500 dark:text-gray-150">
              Security
            </h3>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
              Two-factor authentication (2FA)
            </p>
          </div>

          <Link
            to={RoutePaths.TWO_FA_SETTINGS}
            className="flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
          >
            <SetupIcon /> Setup
          </Link>
        </div>

        <div className="rounded-lg border border-gray-50 dark:border-gray-250 bg-warning-300 dark:bg-warning-400 p-4 flex gap-4">
          <span className="shrink-0 text-warning-500">
            <InfoIcon size={24} />
          </span>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-150">
            Two-factor authentication is an additional security measure to
            protect your account. Once set up, depending on your authentication
            method, each time you access your account you will have to provide a
            verification code using an authentication application or through
            your email.
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <h3 className="font-semibold text-gray-500 dark:text-gray-150">
          Legal
        </h3>

        <div className="flex gap-1 items-center flex-wrap">
          {legalData.map((item) => (
            <span
              key={item}
              className="rounded-2xl bg-gray-100 dark:bg-gray-600 py-2 px-4 text-sm font-medium text-gray-400 dark:text-gray-200"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
