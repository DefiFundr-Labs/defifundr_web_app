import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const CreateContractCard = () => {
  return (
    <motion.div
      key="employees"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3 }}
      className="relative p-6 overflow-hidden rounded-lg lg:p-8 bg-primary-200 backdrop-blur-xs "
    >
      <div>
        <p className="mb-2 text-2xl font-bold text-white lg:text-3xl">
          Create your first contract{" "}
        </p>
        <p className="text-sm font-medium text-primary-500 mb-7">
          You're one step away! Set up your first contract and start managing
          payroll.
        </p>

        <button className="flex items-center h-10 px-4 text-sm font-medium bg-white rounded-full text-primary-200">
          New contract
        </button>
      </div>

      {/* background gradient */}
      <div className="absolute w-[1191px] h-[1044.5px] top-[calc(50%-1044.5px/2+38.75px)] right-[-634px]">
        <div className="rectangle hidden xl:block left-[-141px] top-[14.72px]"></div>
        <div className="rectangle hidden xl:block left-[2%] top-3.5"></div>
        <div className="rectangle left-[29%] xl:left-[17%] top-3.5"></div>
        <div className="rectangle left-[39%] xl:left-[33%] top-[71.21px]"></div>
        <div className="rectangle left-[43%] top-[-14.19px]"></div>
      </div>
      <div className="absolute inset-0 -z-1 bg-gradient-rectangle"></div>
    </motion.div>
  );
};

export default CreateContractCard;
