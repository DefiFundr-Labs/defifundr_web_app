import { motion } from "framer-motion";
import bg from "../../assets/images/defifundr_auth.webp";
import { AuthHeader } from "./AuthHeader";

export const AuthHero = () => {
  return (
    <div className="relative hidden w-full h-full bg-grey-common bg- md:block lg:block">
      <div className="absolute z-10 px-5 py-3 bg-white rounded-lg top-7 drop-shadow-md left-7 ">
        <AuthHeader />
      </div>
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover "
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      />

      <div className="absolute bottom-0  max-w-[359px] left-0 right-0 z-10 pl-7 pb-18 text-black">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 font-bold tracking-tight h1"
        >
          Pay Anyone, Anywhere.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-black "
        >
          Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
          Defifundr
        </motion.p>
      </div>
    </div>
  );
};
