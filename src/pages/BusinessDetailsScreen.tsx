import { useState } from "react";
import { ChevronDown } from "lucide-react";

const BusinessDetailsScreen = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    companyIndustry: "",
    headquarterCountry: "",
    businessDescription: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Form */}
      <div className="w-1/2 p-8">
        <div className="mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Add your business</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Company name here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Company Size
              </label>
              <div className="relative">
                <select
                  name="companySize"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.companySize}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-3 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Company Industry
              </label>
              <div className="relative">
                <select
                  name="companyIndustry"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.companyIndustry}
                  onChange={handleInputChange}
                >
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-3 text-gray-400"
                  size={20}
                />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.headquarterCountry}
                onChange={handleInputChange}
              >
                <option value="">Where is your company setup?</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              What Does Your Business Do?
            </label>
            <textarea
              name="businessDescription"
              placeholder="Description here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.businessDescription}
              onChange={handleInputChange}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              0/500 words
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>

      {/* Right Panel - Hero Image */}
      <div className="w-1/2 bg-slate-900 p-8 flex items-center justify-center">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-bold mb-4">
            Pay Anyone,
            <br />
            Anywhere.
          </h2>
          <p className="text-gray-400">
            Experience Fast, Secure Crypto & Fiat Payroll &
            <br />
            Invoicing with Definition
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsScreen;
