import { FormEvent, useEffect, useRef, useState } from "react";
import { UploadImageIcon } from "../../../../assets/svg/svg";
import TitleHeader from "../../../../common/dashboard/TitleHeader";
import CustomSelect from "../../../../components/dashboard/CustomSelect";
import { Option } from "../../../../types/types";
import {
  getCompanyInformation,
  updateCompanyInformation,
} from "../../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import CountrySelect from "../../../../components/dashboard/settings/CountrySelect";

const sizeOptions: Option[] = [
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
  { label: "Extra Large", value: "XL" },
];

const vatOptions: Option[] = [
  { label: "Standard Rate (20%)", value: "20" },
  { label: "Reduced Rate (5%)", value: "5" },
  { label: "Zero Rate (0%)", value: "0" },
];

const ManageCompanyInformation = () => {
  const info = getCompanyInformation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [registeredName, setRegisteredName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [selectedSize, setSelectedSize] = useState<Option | null>(null);
  const [vatNumber, setVatNumber] = useState<Option | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [websiteURL, setWebsiteURL] = useState("");

  const [imagePreview, setImagePreview] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setCompanyName(info.companyName);
    setRegisteredName(info.registeredName);
    setRegistrationNumber(info.registrationNumber);
    setWebsiteURL(info.websiteURL);
    setSelectedSize(sizeOptions.find((opt) => opt.value === info.size) || null);
    setVatNumber(vatOptions.find((opt) => opt.value === info.vatRate) || null);
  }, [info]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    updateCompanyInformation({
      companyName,
      registeredName,
      registrationNumber,
      countryCode: selectedCountry?.value || "",
      size: selectedSize?.value || "",
      vatRate: vatNumber?.value || "",
      websiteURL,
    });
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1000);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600">
      <TitleHeader title="Company information" isBackButton />

      <div className="p-4">
        <form
          // TODO:check the spy of each of the form to be sure that they are using the right spacing
          className="bg-white dark:bg-gray-500 rounded-lg max-w-125 w-full p-4 lg:p-6 space-y-10 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mx-auto w-fit">
            <div
              onClick={handleImageClick}
              className="size-22 rounded-full border-2 bg-primary-500 dark:bg-primary-50 border-primary-200 dark:border-primary-400 flex items-center justify-center mx-auto cursor-pointer overflow-hidden"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Company logo"
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-4xl font-semibold text-primary-200 dark:text-primary-400">
                  T3
                </p>
              )}
            </div>
            <p
              onClick={handleImageClick}
              className="flex px-4 py-2.5 gap-1 text-primary-200 dark:text-primary-400 text-sm font-medium cursor-pointer"
            >
              <UploadImageIcon />{" "}
              {imagePreview ? "Change image" : "Upload image"}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="companyName">Company/Brand name</label>
              <input
                type="text"
                id="companyName"
                placeholder="--"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="registeredName">Registered name</label>
              <input
                type="text"
                id="registeredName"
                placeholder="--"
                value={registeredName}
                onChange={(e) => setRegisteredName(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="registrationNumber">
                Registration Number/EIN ID
              </label>
              <input
                type="number"
                id="registrationNumber"
                placeholder="--"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="countryIncorporation">
                Country of incorporation
              </label>

              <CountrySelect
                id="countryIncorporation"
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="--"
                isSearchable
                defaultCountry={info.countryCode}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-2">
              <div className="form-control">
                <label htmlFor="size">Size</label>
                <CustomSelect
                  // TODO:check the id when searchable is false
                  id="size"
                  options={sizeOptions}
                  value={selectedSize}
                  onChange={setSelectedSize}
                  placeholder="--"
                  //TODO: isSearchable={false}
                  //TODO: also add req  uired field
                />
                {/* <input type="text" id="size" placeholder="--" /> */}
              </div>

              <div className="form-control">
                <label htmlFor="vatNumber">VAT number</label>
                {/* <input type="number" id="vatNumber" placeholder="--" /> */}
                <CustomSelect
                  id="vatNumber"
                  options={vatOptions}
                  value={vatNumber}
                  onChange={setVatNumber}
                  placeholder="Select VAT rate"
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="url">Company public website URL</label>
              <input
                type="url"
                id="url"
                placeholder="--"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
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

export default ManageCompanyInformation;
