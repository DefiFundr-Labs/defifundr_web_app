import React, { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  agreeToTerms?: string;
}

function AccountCreationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Service";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const inputClasses = (error?: string) => `
    w-full px-4 py-3 rounded-lg
    ${error ? "border-2 border-red-500" : "border border-gray-300"}
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
    transition-all duration-200
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First Name Input */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          First Name
        </label>
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClasses(errors.firstName)}
            placeholder="First Name"
          />
        </motion.div>
        {errors.firstName && (
          <p className="mt-1 text-sm text-orange-600">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name Input */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Last Name
        </label>
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClasses(errors.lastName)}
            placeholder="Last Name"
          />
        </motion.div>
        {errors.lastName && (
          <p className="mt-1 text-sm text-orange-600">{errors.lastName}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses(errors.email)}
            placeholder="Email Address"
          />
        </motion.div>
        {errors.email && (
          <p className="mt-1 text-sm text-orange-600">{errors.email}</p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-purple-600 
                     focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                     cursor-pointer transition-colors duration-200"
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor="agreeToTerms"
            className="text-sm text-gray-600 cursor-pointer"
          >
            By creating an account, I agree to our{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-500 underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-500 underline"
            >
              Privacy Policy
            </a>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3 px-4 bg-[#101323] hover:bg-[#181D36] text-white rounded-3xl font-medium
                   focus:outline-none focus:ring-2 
                   focus:ring-[#101323] focus:ring-offset-2 
                   transition-all duration-200 transform"
      >
        Continue
      </motion.button>
    </form>
  );
}

export default AccountCreationForm;
