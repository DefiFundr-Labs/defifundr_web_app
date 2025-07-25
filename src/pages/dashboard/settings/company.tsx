import { Link } from "react-router-dom";
import avatar from "../../../assets/images/Avatar.png";
import {
  ActiveMembersIcon,
  AdministratorsIcon,
  CountriesIcon,
  EditIcon,
  InfoIcon,
} from "../../../assets/svg/svg";
import { getAddressData, getCompanyInformation } from "../../../utils/constant";
import { RoutePaths } from "../../../routes/routesPath";
import Flag from "react-world-flags";
import { Address } from "../../../types/types";
import { countries } from "countries-list";
import SettingsField from "../../../components/dashboard/SettingsField";

const Company = () => {
  const savedInfo = getCompanyInformation();
  const savedAddress = getAddressData();

  const data = [
    {
      icon: <ActiveMembersIcon />,
      title: "Active members",
      desc: "20",
    },
    {
      icon: <CountriesIcon />,
      title: "Countries",
      desc: "04",
    },
    {
      icon: <AdministratorsIcon />,
      title: "Administrators",
      desc: "02",
    },
  ];

  const companyInformationData = [
    {
      title: "Company/Brand name",
      value: savedInfo.companyName,
    },
    {
      title: "Registered name",
      value: savedInfo.registeredName,
    },
    {
      title: "Registration Number/EIN ID",
      value: savedInfo.registrationNumber,
    },
    {
      title: "Country of incorporation",
      value: savedInfo.countryCode,
    },
    {
      title: "Size",
      value: savedInfo.size,
    },
    {
      title: "VAT number",
      value: savedInfo.vatRate,
    },
    {
      title: "Company public website URL",
      value: (
        <span className="text-primary-200 dark:text-primary-400">
          {savedInfo.websiteURL}
        </span>
      ),
    },
  ];

  const billingAddress = savedAddress?.billingAddress;
  const registeredAddress = savedAddress?.registeredAddress;

  const isEmptyAddress = (addr: Address | undefined) =>
    !addr || Object.values(addr).every((v) => !v.trim());

  return (
    <>
      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 flex flex-col lg:flex-row gap-6 items-center">
        <div className="size-22 rounded-full">
          <img src={avatar} alt="avatar image" />
        </div>

        <div className="w-full">
          <h2 className="font-bold text-3xl text-gray-500 dark:text-gray-150 mb-3 text-center lg:text-left">
            Touchpoint 360
          </h2>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start max-xs:justify-between lg:gap-6 w-full ">
            {data.map((itm, index) => (
              <>
                <div
                  key={index}
                  className="flex items-center gap-2 lg:gap-2 flex-col xs:flex-row"
                >
                  <span className=" shrink-0 size-8 lg:size-10 rounded-full bg-primary-500 dark:bg-primary-50 text-primary-200 dark:text-primary-400 flex justify-center items-center">
                    {itm.icon}
                  </span>
                  <div className="text-center lg:text-left">
                    <p className="text-xs font-medium text-gray-300 dark:text-gray-300">
                      {itm.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-150 font-semibold">
                      {itm.desc}
                    </p>
                  </div>
                </div>

                {index !== data.length - 1 && (
                  <div className="self-stretch w-px lg:w-0.5 bg-gray-150 block" />
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        {/* TODO: make this a component */}
        <div className="flex justify-between items-center w-full">
          <h3 className="font-semibold text-gray-500 dark:text-gray-150">
            Company information
          </h3>

          <Link
            to={`${RoutePaths.COMPANY_INFORMATION_SETTINGS}/${savedInfo.companyName}`}
            className="flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
          >
            <EditIcon /> Edit
          </Link>
        </div>

        <div>
          {companyInformationData.map((company) => (
            <SettingsField
              key={company.title}
              title={company.title}
              value={
                typeof company.value === "string" ? (
                  company.title === "Country of incorporation" ? (
                    <span className="flex items-center gap-1">
                      <Flag
                        code={company.value}
                        className="object-cover size-5 rounded-full"
                      />
                      {Object.entries(countries).map(([code, { name }]) =>
                        code === company.value ? name : ""
                      )}
                    </span>
                  ) : (
                    company.value
                  )
                ) : (
                  company.value
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-4">
        <h3 className="font-semibold text-gray-500 dark:text-gray-150">
          Addresses
        </h3>

        <div>
          <p className="font-medium text-sm text-gray-400 dark:text-gray-200 mb-2">
            Billing address
          </p>
          <div className="py-6 px-4 rounded-lg border border-gray-150 dark:border-gray-250">
            {!isEmptyAddress(billingAddress) ? (
              <div className="flex gap-4 lg:gap-2 justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flag
                    code={billingAddress?.country.value}
                    className="object-cover size-10 rounded-full"
                  />
                  <span>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-150 mb-1">
                      {billingAddress?.country.label}
                    </p>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                      {`${billingAddress?.addressLine}, ${billingAddress?.city}, ${billingAddress?.region} |
                      ${billingAddress?.postalCode}`}
                    </p>
                  </span>
                </div>

                <Link
                  to={`${RoutePaths.BILLING_ADDRESS_SETTINGS}/${billingAddress?.postalCode}`}
                  className="flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
                >
                  <EditIcon /> Edit
                </Link>
              </div>
            ) : (
              <span className="flex items-center gap-1 justify-center">
                <span className="text-warning-500">
                  <InfoIcon />
                </span>

                <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
                  Please{" "}
                  <Link
                    to={RoutePaths.BILLING_ADDRESS_SETTINGS}
                    className="text-primary-200 dark:text-primary-400 underline"
                  >
                    add
                  </Link>{" "}
                  your company billing address
                </p>
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="font-medium text-sm text-gray-400 dark:text-gray-200 mb-2">
            Registered address
          </p>
          <div className="py-6 px-4 rounded-lg border border-gray-150 dark:border-gray-250">
            {!isEmptyAddress(registeredAddress) ? (
              <div className="flex gap-4 lg:gap-2 justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flag
                    code={registeredAddress?.country.value}
                    className="object-cover size-10 rounded-full"
                  />
                  <span>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-150 mb-1">
                      {registeredAddress?.country.label}
                    </p>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-200">
                      {`${registeredAddress?.addressLine}, ${registeredAddress?.city}, ${registeredAddress?.region} |
                   ${registeredAddress?.postalCode}`}
                    </p>
                  </span>
                </div>

                <Link
                  to={`${RoutePaths.REGISTERED_ADDRESS_SETTINGS}/${registeredAddress?.postalCode}`}
                  className="flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
                >
                  <EditIcon /> Edit
                </Link>
              </div>
            ) : (
              <span className="flex items-center gap-1 justify-center">
                <span className="text-warning-500">
                  <InfoIcon />
                </span>

                <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
                  Please{" "}
                  <Link
                    to={RoutePaths.REGISTERED_ADDRESS_SETTINGS}
                    className="text-primary-200 dark:text-primary-400 underline"
                  >
                    add
                  </Link>{" "}
                  a registered address
                </p>
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Company;
