import { ThemeToggle } from "../common/ThemeToggler";
import OTPInput from "../components/OtpInput";

const Guide = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="h2">Form Controls Guide</h1>
        <ThemeToggle />
      </div>

      {/* OTP Section */}
      <div className="p-6 mb-12 bg-gray-100 rounded-lg dark:bg-gray-500">
        <h2 className="mb-6 h3">OTP Verification</h2>
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <OTPInput
              onComplete={(code) => console.log("OTP completed:", code)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column - Text & Number inputs */}
        <div className="space-y-6">
          <h2 className="mb-4 h3">Text Inputs</h2>

          {/* Regular text input */}
          <div className="form-control">
            <label htmlFor="name">Regular Text Input</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>

          {/* Email input */}
          <div className="form-control">
            <label htmlFor="email">Email Input</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>

          {/* Password input */}
          <div className="form-control">
            <label htmlFor="password">Password Input</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          {/* Number input - with appearance-none to remove spinners */}
          <div className="form-control">
            <label htmlFor="amount">Number Input (No Spinners)</label>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              className="appearance-none"
            />
          </div>

          {/* Textarea */}
          <div className="form-control">
            <label htmlFor="message">Textarea</label>
            <textarea
              id="message"
              placeholder="Enter your message"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Right column - Select, Radio & Checkbox */}
        <div className="space-y-6">
          <h2 className="mb-4 h3">Selection Controls</h2>

          {/* Basic Select dropdown */}
          <div className="form-control">
            <label htmlFor="category">Default Select Dropdown</label>
            <select id="category">
              <option value="">Select a category</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          {/* Disabled Select */}
          <div className="form-control">
            <label htmlFor="disabledSelect">Disabled Select</label>
            <select id="disabledSelect" disabled>
              <option value="">Select is disabled</option>
              <option value="option1">Option 1</option>
            </select>
          </div>

          {/* Select with error */}
          <div className="form-control form-control--invalid">
            <label htmlFor="errorSelect">Select with Error</label>
            <select id="errorSelect">
              <option value="">Please select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <div className="error-message">This field is required</div>
          </div>

          {/* Checkbox */}
          <div className="mt-8">
            <h3 className="mb-3 h4">Checkboxes</h3>
            <div className="space-y-3">
              <div className="form-control--checkbox">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                />
                <label htmlFor="agreeToTerms">
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="form-control--checkbox">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                  defaultChecked
                />
                <label htmlFor="subscribe">Subscribe to newsletter</label>
              </div>
            </div>
          </div>

          {/* Radio Buttons */}
          <div className="mt-6">
            <h3 className="mb-3 h4">Radio Buttons</h3>
            <div className="space-y-3">
              <div className="form-control--checkbox">
                <input
                  type="radio"
                  id="radioOption1"
                  name="radioGroup"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                  defaultChecked
                />
                <label htmlFor="radioOption1">Option 1</label>
              </div>
              <div className="form-control--checkbox">
                <input
                  type="radio"
                  id="radioOption2"
                  name="radioGroup"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                />
                <label htmlFor="radioOption2">Option 2</label>
              </div>
              <div className="form-control--checkbox">
                <input
                  type="radio"
                  id="radioOption3"
                  name="radioGroup"
                  className="accent-primary-200 bg-primary-200 checked:bg-primary-200 focus:ring-primary-200"
                />
                <label htmlFor="radioOption3">Option 3</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button examples */}
      <div className="mt-8 space-y-4">
        <h2 className="mb-4 h3">Button Examples</h2>
        <div className="flex flex-wrap gap-4">
          <button className="button button--primary">Primary Button</button>
          <button className="button button--secondary">Secondary Button</button>
          <button className="button button--primary" disabled>
            Disabled Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
