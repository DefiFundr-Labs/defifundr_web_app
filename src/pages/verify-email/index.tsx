import { useEffect, useState } from 'react';
import OTPInput from './otp-input';
import Background from '../../assets/background.jpg';
import MailBox from '../../assets/mailbox.svg';
import ChveronLeft from '../../assets/chevron-left.svg';
import Support from '../../assets/support.svg';
import Logo from '../../assets/logo.svg';

const EmailVerification = () => {
  // Retrieve email from sessionStorage
  const email = sessionStorage.getItem('registeredEmail') || 'example@gmail.com';

  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOTPChange = (newOTP: string) => {
    setOtp(newOTP)
    setIsValid(newOTP.length === 6);
  }

  const handleVerify = () => {
    if (otp === '123456') { // Simulated correct OTP for demo
      setSuccess(true);
      setError('');
    } else {
      setSuccess(false);
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between px-10 py-6">
          <img src={Logo} alt="Logo" className="hidden lg:block h-6" />
          <button className="flex gap-2 lg:px-4 lg:py-2 rounded-md border-none lg:border lg:border-solid lg:border-black/12">
            <img src={ChveronLeft} alt="back" className="w-2" />
            <span className="hidden lg:inline-block">Back</span>
          </button>
          <img src={Support} alt="back" className="w-6 lg:hidden" />
        </div>

        <div className="flex flex-col justify-between items-center xl:items-start bg-white px-6 pb-20 lg:pb-0 md:px-12 xl:px-20 3xl:px-40">
          <img src={MailBox} alt="Mailbox" className="h-[150px] lg:h-20 mb-4" />
          <div className="flex flex-col items-start mb-9 w-full">
            <img src={Logo} alt="Logo" className="h-[30px] mb-2 lg:hidden" />
            <h2 className="text-3xl font-semibold mb-2">Verify your email</h2>
            <p className="text-[#2D333C] mb-2">
              We've sent a verification code to&nbsp;
              <strong>{email}</strong>. Check your inbox to confirm
            </p>
            <a href="#" className="text-[#2D333C] underline">
              Change email
            </a>
          </div>
          <div className="mb-9 w-full">
            <div className="flex space-x-4 mb-4">
              <OTPInput length={6} onChange={handleOTPChange} />
            </div>
            {error && <p className="text-[#A4031F] text-sm">{error}</p>}
            {success && <p className="text-[#4AAD52] text-sm">Email verified successfully!</p>}
          </div>
          <button
            className={`w-full text-white text-sm px-6 py-4 rounded-full mb-8 ${isValid ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'}`}
            onClick={handleVerify}
            disabled={!isValid}
          >
            Verify Email
          </button>
          <div className="w-full text-center">
            {canResend ? (
              <button onClick={handleResend} className="text-blue-500 text-sm underline">Resend code</button>
            ) : (
              <p className="text-gray-400 text-sm">Resend code ({countdown}s)</p>
            )}
            <p className="text-gray-600 mt-16">Didn't get email?</p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 xl:w-3/5 hidden lg:flex flex-col justify-center items-center text-white px-14 py-16 relative">
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
  );
};

export default EmailVerification;
