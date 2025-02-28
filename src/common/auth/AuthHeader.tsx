import logo from "../../assets/Logho.png";
import { ChevronLeft } from "lucide-react";

export const AuthHeader = () => {
    return (
      <div className="flex items-center justify-between p-4">
        {/* <div className="text-xl">⚡</div> */}
        <div className="text-xl">
          <img src={logo} width={15} height={15} alt="logo" />
        </div>

        <button className="hidden lg:inline-flex  md:inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100">
        <ChevronLeft/>
        Back
      </button>
      </div>
    )
  }
  
  