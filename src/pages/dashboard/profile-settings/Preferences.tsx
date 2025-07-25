import { JSX, useState } from "react";
import {
  ArrowRightIcon,
  DarkModeIcon,
  DeviceIcon,
  LightModeIcon,
  SystemModeIcon,
  TrashIcon,
} from "../../../assets/svg/svg";
import SelectLanguageModal from "../../../components/modal/SelectLanguageModal";
import useModal from "../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTheme, ThemeMode } from "../../../redux/slice/themeSlice";

const appearances = [
  {
    icon: <LightModeIcon />,
    title: "light",
  },
  {
    icon: <DarkModeIcon />,
    title: "dark",
  },
  {
    icon: <SystemModeIcon />,
    title: "system",
  },
];

const devices = [
  {
    title: "Apple iPhone 13",
    location: "Lagos, Nigeria • 102.89.68.30",
    lastLogin: "20th Apr 2025, 04:40 PM",
    isCurrentDevice: true,
  },
  {
    title: "Chrome V122.0.0 • Windows",
    location: "Lagos, Nigeria • 102.89.68.30",
    lastLogin: "20th Apr 2025, 04:40 PM",
    isCurrentDevice: false,
  },
  {
    title: "Edge V133.0.0 • Windows",
    location: "Lagos, Nigeria • 102.89.68.30",
    lastLogin: "20th Apr 2025, 04:40 PM",
    isCurrentDevice: false,
  },
];

const Preferences = () => {
  const { showCustomModal, hideModal } = useModal();
  const [language, setLanguage] = useState("English (UK)");
  const [deviceList, setDeviceList] = useState(devices);

  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.mode);

  const handleThemeChange = (newTheme: ThemeMode) => {
    dispatch(setTheme(newTheme));
  };

  const handleShowModal = () => {
    showCustomModal(
      <SelectLanguageModal
        defaultLanguage={language}
        onSave={(value: string) => {
          setLanguage(value);
          hideModal();
        }}
      />,
      "lg"
    );
  };

  const handleRemoveDevice = (title: string) => {
    setDeviceList((prev) => prev.filter((device) => device.title !== title));
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 flex justify-between lg:flex-row gap-6 items-center">
        <span>
          <p className="font-semibold text-gray-500 mb-1">App language</p>
          <p className="font-medium text-xs text-gray-400">
            Select default app language
          </p>
        </span>

        <button
          className="cursor-pointer font-semibold flex items-center gap-1 text-nowrap text-sm md:text-base "
          onClick={() => handleShowModal()}
        >
          {language}
          <span className="text-primary-200">(Change)</span>
          <ArrowRightIcon />
        </button>
      </section>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <p className="font-semibold text-gray-500 mb-1">Appearance</p>

        <div className="flex gap-11 lg:gap-20">
          {appearances.map((appearance) => (
            <button
              onClick={() => handleThemeChange(appearance.title as ThemeMode)}
              key={appearance.title}
              className="h-full"
            >
              <div
                className={
                  "max-h-20 h-full max-w-32 w-full  rounded-lg overflow-hidden " +
                  (currentTheme === appearance.title
                    ? "border-2 border-primary-200"
                    : appearance.title === "system"
                    ? "border-gray-150"
                    : appearance.title === "dark"
                    ? "border-gray-250"
                    : "border-gray-100")
                }
              >
                {appearance.icon}
              </div>
              <p className="text-sm capitalize font-medium text-gray-500 mt-2 text-center">
                {appearance.title}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <div>
          <p className="font-semibold text-gray-500 mb-1">Device Management</p>
          <p className="text-xs text-gray-400 font-medium ">
            See all devices that have logged into your account. Remove any for
            added security.
          </p>
        </div>

        <div className="space-y-4">
          {deviceList.map((device) => (
            <div className="flex items-center  gap-4" key={device.title}>
              <div className="size-12 flex items-center justify-center bg-primary-500 rounded-lg">
                <DeviceIcon />
              </div>

              <div className="flex-1">
                <div className="flex gap-4 justify-between">
                  <p className="font-semibold text-sm text-gray-500 mb-1">
                    {device.title}
                  </p>

                  {device.isCurrentDevice ? (
                    <p className="text-sm text-primary-200 font-semibold">
                      Current device
                    </p>
                  ) : (
                    <button
                      onClick={() => handleRemoveDevice(device.title)}
                      className="cursor-pointer flex items-center gap-1 text-xs font-medium text-error-500"
                    >
                      <TrashIcon /> Remove
                    </button>
                  )}
                </div>

                <div className="text-xs font-medium text-gray-400 flex md:justify-between md:items-center flex-col md:flex-row md:gap-4">
                  <p>Location: {device.location}</p>
                  <p>Last login: {device.lastLogin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Preferences;
