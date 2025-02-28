"use client";

import React, { useState } from "react";
import { HeroSection } from "../../common/HeroSection";
import { AuthFooter } from "../../common/auth/AuthFooter";
import { AuthHeader } from "../../common/auth/AuthHeader";
import { Mail, Eye,EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", { email, password });
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE */}
      <div className="flex w-full flex-col lg:w-1/2">
        <AuthHeader />

        {/* Center the form */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Sign in to your DeFiFundr account
              </h1>
              <p className="text-gray-600">
                Securely access your account and manage payroll with ease.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <fieldset>
                <legend className="sr-only">Login Form</legend>

                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="w-full rounded-lg border border-gray-300 px-10 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-required="true"
                      aria-describedby="email-error"
                    />
                  </div>
                  <div id="email-error" className="min-h-[1.25rem]" aria-live="polite">
                    {errors.email && <p className="text-[red] text-sm">{errors.email}</p>}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-required="true"
                      aria-describedby="password-error"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff/> : <Eye/>}
                    </button>
                  </div>
                  <div id="password-error" className="" aria-live="polite">
                    {errors.password && <p className="text-[red] text-sm">{errors.password}</p>}
                  </div>
                  <div className="text-right pb-3">
                    <button type="button" className="text-purple-600 hover:text-purple-700">
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#101323] rounded-3xl bg-slate-900 py-2 text-white transition-colors hover:bg-slate-800"
                >
                  Continue
                </button>
              </fieldset>
            </form>

          </div>
        </div>

        <AuthFooter />
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden h-full w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <HeroSection />
      </div>
    </div>
  );
}
