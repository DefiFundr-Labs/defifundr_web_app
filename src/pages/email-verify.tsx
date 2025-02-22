import React, { useState } from 'react'

const EmailVerification = () => {
  const [code, setCode] = useState(new Array(6).fill(''))

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code]
    newCode[index] = element.target.value
    setCode(newCode)
  }

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
        <p className="text-gray-600 mb-4">
          We’ve sent a verification code to{' '}
          <strong>zainab.defi@gmail.com</strong>. Check your inbox to confirm
        </p>
        <a href="#" className="text-blue-600 mb-4">
          Change email
        </a>
        <div className="flex space-x-2 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 border rounded text-center text-lg"
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        <button className="bg-black text-white px-6 py-2 rounded">
          Verify Email
        </button>
        <p className="text-gray-400 text-sm mt-2">Resend code (23)</p>
        <p className="text-gray-600 mt-2">Didn’t get email?</p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-indigo-900 text-white p-10 relative">
        <h2 className="text-3xl font-bold">Pay Anyone, Anywhere.</h2>
        <p className="mt-2 text-lg text-gray-200">
          Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
          Deffundr
        </p>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/path-to-bitcoin-image.png')" }}
        ></div>
      </div>
    </div>
  )
}

export default EmailVerification
