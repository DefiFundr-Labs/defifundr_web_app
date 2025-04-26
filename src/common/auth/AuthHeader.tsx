import { Logo } from "../../assets/svgs/svg";

export const AuthHeader = () => {
  return (
    <div className="flex items-center justify-between ">
      {/* <div className="text-xl">⚡</div> */}
      <div className="text-xl">
        <Logo />
      </div>
      {/* 
      <button className="items-center hidden gap-1 px-3 py-2 text-sm text-gray-600 transition-colors border border-gray-200 rounded-md lg:inline-flex md:inline-flex bg-gray-50/50 hover:bg-gray-100">
        <ChevronLeft />
        Back
      </button> */}
    </div>
  );
};
