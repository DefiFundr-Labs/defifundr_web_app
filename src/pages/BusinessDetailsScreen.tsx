import { useState } from "react";
import logo from "../assets/Logho.svg";
import backArrow from "../assets/arrow-left-01.svg";
import formLogo from "../assets/Frame 1618870335.svg";
import bgImg1 from "../assets/Image2.svg";
import Eclips6 from "../assets/Ellipse 6.svg";
import Eclips7 from "../assets/Ellipse 7.svg";

const BusinessDetailsScreen = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    companyIndustry: "",
    headquarterCountry: "",
    businessDescription: "",
  });

  const [errors, setErrors] = useState({
    companyName: "",
    companySize: "",
    companyIndustry: "",
    headquarterCountry: "",
    businessDescription: "",
  });

  const [charCount, setCharCount] = useState(0);

  const validateForm = () => {
    const newErrors = {
      companyName: "",
      companySize: "",
      companyIndustry: "",
      headquarterCountry: "",
      businessDescription: "",
    };

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.companySize) {
      newErrors.companySize = "Company size is required";
    }

    if (!formData.companyIndustry) {
      newErrors.companyIndustry = "Company industry is required";
    }

    if (!formData.headquarterCountry) {
      newErrors.headquarterCountry = "Headquarter country is required";
    }

    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = "Business description is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "businessDescription") {
      if (value.length <= 300) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        setCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
          <nav className="flex justify-between items-center px-2 sm:px-4 lg:px-10 py-2 sm:py-4">
            <div>
              <img
                className="w-10 h-6 sm:w-14 sm:h-8"
                src={logo}
                alt="Community logo"
              />
            </div>

            <button className="px-3 sm:px-6 lg:px-8 py-2 sm:py-4 border border-gray-300 rounded-md flex gap-2 items-center text-sm sm:text-base  hover:bg-[#eee] cursor-pointer transition-colors">
              <span>
                <img src={backArrow} alt="arrow" className="w-4 h-4" />
              </span>
              Back
            </button>
          </nav>

          <div className="pt-8 sm:pt-16 lg:pt-20 pb-8 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16">
            <div className="mb-6 sm:mb-8 flex flex-col gap-2">
              <div>
                <img
                  className="w-12 h-12 sm:w-16 sm:h-16"
                  src={formLogo}
                  alt="Community logo"
                />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                Add your business
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company name here"
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 border ${
                    errors.companyName ? "border-[#FF0000]" : "border-gray-300"
                  } outline-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                {errors.companyName && (
                  <p className="text-[#FF0000] text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Company Size
                  </label>
                  <div className="relative">
                    <select
                      name="companySize"
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border ${
                        errors.companySize
                          ? "border-[#FF0000]"
                          : "border-gray-300"
                      } outline-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      value={formData.companySize}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201+">201+ employees</option>
                    </select>
                    {errors.companySize && (
                      <p className="text-[#FF0000] text-sm mt-1">
                        {errors.companySize}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Company Industry
                  </label>
                  <div className="relative">
                    <select
                      name="companyIndustry"
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border ${
                        errors.companyIndustry
                          ? "border-[#FF0000]"
                          : "border-gray-300"
                      } outline-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      value={formData.companyIndustry}
                      onChange={handleInputChange}
                    >
                      <option value="">Select your industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail</option>
                    </select>
                    {errors.companyIndustry && (
                      <p className="text-[#FF0000] text-sm mt-1">
                        {errors.companyIndustry}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Headquarter Country
                </label>
                <div className="relative">
                  <select
                    name="headquarterCountry"
                    className={`w-full px-3 sm:px-4 py-3 sm:py-4 border ${
                      errors.headquarterCountry
                        ? "border-[#FF0000]"
                        : "border-gray-300"
                    } outline-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    value={formData.headquarterCountry}
                    onChange={handleInputChange}
                  >
                    <option value="">Where is your company setup?</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                  </select>
                  {errors.headquarterCountry && (
                    <p className="text-[#FF0000] text-sm mt-1">
                      {errors.headquarterCountry}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  What Does Your Business Do?
                </label>
                <textarea
                  name="businessDescription"
                  placeholder="Description here"
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 border ${
                    errors.businessDescription
                      ? "border-[#FF0000]"
                      : "border-gray-300"
                  } outline-0 rounded-lg h-24 sm:h-32 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                />
                <div className="flex justify-between text-sm mt-1">
                  {errors.businessDescription && (
                    <p className="text-[#FF0000]">
                      {errors.businessDescription}
                    </p>
                  )}
                  <p
                    className={`text-right ${
                      charCount === 300 ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {charCount}/300 characters
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#101323] text-white py-3 rounded-full hover:bg-[#1f2347] cursor-pointer transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        </div>

        {/* Right Side*/}
        <div className="hidden lg:block w-full lg:w-1/2 h-64 sm:show sm:h-96 lg:h-auto bg-slate-900 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-black mix-blend-multiply bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${bgImg1})`,
            }}
          />
          <img
            src={Eclips6}
            alt="Eclips6"
            className="absolute top-0 left-0 object-cover w-1/2 lg:w-auto"
          />
          <img
            src={Eclips7}
            alt="Eclips7"
            className="absolute top-1/4 right-0 object-cover w-1/2 lg:w-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default BusinessDetailsScreen;
