import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TitleHeader from "../../../../common/dashboard/TitleHeader";
import { Address, Option } from "../../../../types/types";
import { getAddressData, updateAddressData } from "../../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import CountrySelect from "../../../../components/dashboard/settings/CountrySelect";

const ManageBillingAddress = () => {
  const navigate = useNavigate();

  const savedAddress = getAddressData();

  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);

  const [address, setAddress] = useState<Address>({
    addressLine: "",
    alternateAddress: "",
    city: "",
    region: "",
    country: {
      label: "",
      value: "",
    },
    postalCode: "",
  });

  useEffect(() => {
    if (savedAddress) {
      setAddress((prev) => ({ ...prev, ...savedAddress.billingAddress }));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [id as keyof Address]: value,
    }));
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (selectedCountry) {
      setLoading(true);
      updateAddressData("billingAddress", {
        ...address,
        country: {
          label: selectedCountry?.label || "",
          value: selectedCountry?.value || "",
        },
      });
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1000);
    }
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      <TitleHeader title="Billing address" isBackButton />

      <div className="p-4">
        <form
          className="bg-white dark:bg-gray-500 rounded-lg max-w-125 w-full p-4 lg:p-6 space-y-10 mx-auto"
          onSubmit={handleSave}
        >
          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="addressLine">Address line</label>
              <input
                type="text"
                id="addressLine"
                placeholder="--"
                value={address.addressLine}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="alternateAddress">
                Alternate Address line (optional)
              </label>
              <input
                type="text"
                id="alternateAddress"
                placeholder="--"
                value={address.alternateAddress}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-control">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="--"
                value={address.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="region">Region/State/Province</label>
              <input
                type="text"
                id="region"
                placeholder="--"
                value={address.region}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="country">Country</label>

              <CountrySelect
                id="country"
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="--"
                isSearchable
                defaultCountry={
                  savedAddress
                    ? savedAddress.billingAddress.country.value
                    : undefined
                }
                // TODO: required
              />
            </div>

            <div className="form-control">
              <label htmlFor="postalCode">Postal code / ZIP</label>
              <input
                type="text"
                id="postalCode"
                placeholder="--"
                value={address.postalCode}
                onChange={handleInputChange}
                required
              />
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

export default ManageBillingAddress;
