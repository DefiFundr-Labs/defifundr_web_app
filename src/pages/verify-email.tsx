import React, { useState } from 'react'
import Background from '../assets/background.jpg'
import MailBox from '../assets/mailbox.svg'

const EmailVerification = () => {
  const [code, setCode] = useState(new Array(6).fill('-'))

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
      <div className="w-2/5 flex flex-col justify-center items-start bg-white p-10">
        <img src={MailBox} alt="Mailbox" className="w-20 h-20 mb-4" />
        <h2 className="text-3xl font-semibold mb-2">Verify your email</h2>
        <p className="text-gray-600 mb-4">
          We've sent a verification code to
          <br />
          <strong>zainab.defi@gmail.com</strong>. Check your inbox to confirm
        </p>
        <a href="#" className="text-[#2D333C] underline mb-8">
          Change email
        </a>
        <div className="flex space-x-4 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-full h-15 border border-[0.75px] border-[#C6CCD5] rounded-[8px] text-center text-lg text-[#8D99AB]"
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        <button className="w-full bg-black text-white text-sm px-6 py-4 rounded-full">
          Verify Email
        </button>
        <div className="w-full text-center">
          <p className="text-gray-400 text-sm mt-10">Resend code (23)</p>
          <p className="text-gray-600 mt-15">Didn't get email?</p>
        </div>
      </div>

      <div className="w-3/5 flex flex-col justify-center items-center text-white p-10 relative">
        <div className="flex items-start justify-end w-full h-full flex-col">
          <h2 className="text-5xl font-bold">
            Pay Anyone,
            <br />
            Anywhere.
          </h2>
          <p className="mt-2 font-normal text-gray-200">
            Experience Fast, Secure Crypto & Fiat Payroll &<br />
            Invoicing with Deffundr
          </p>
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center -z-1"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
      </div>
    </div>
  )
}

export default EmailVerification
