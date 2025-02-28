import { motion } from "framer-motion";
import bg from '../assets/bg-auth.png';


export const HeroSection = () => {
  return (
    <div className="relative hidden h-full w-full bg-gradient-to-br from-purple-900 via-blue-900 to-black lg:block">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 to-blue-900/30" />
      
      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 text-white">
        <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-4 text-5xl font-bold tracking-tight">
          Pay Anyone, <br></br> Anywhere.
        </motion.h1>
        <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg text-gray-200">
          Experience Fast, Secure Crypto &<br></br> Fiat Payroll & Invoicing with DeFiFundr
        </motion.p>
      </div>
    </div>
  )
}

