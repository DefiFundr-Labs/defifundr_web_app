import StatusIndicator from "../../components/dashboard/dashboard/StatusIndicator";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <div className="pt-6 pb-5 px-4 sm:border-b border-gray-150 bg-gray-50">
        <h1 className="text-2xl sm:text-3xl text-gray-500 font-semibold">
          Welcome back<span className="text-primary-200"> Oreoluwa</span>!
        </h1>
        <p className="text-sm text-gray-300 font-medium">
          What will you like to do today?
        </p>
      </div>
      <div className="p-2 sm:p-4">
        <div className="w-full rounded-lg bg-primary-200 p-4 sm:p-8">
          <p className="text-xl text-gray-50 font-semibold">Onboarding Checklist </p>
          <p className="text-primary-500 text-sm mt-2">You're one step away! Set up your first contract and start managing payroll.</p>
          <div className="sm:grid grid-cols-4 mt-6 gap-2 hidden ">
            <StatusIndicator isChecked={true} text="Verify email" />
            <StatusIndicator isChecked={false} text="Provide company info" />
            <StatusIndicator isChecked={false} text="Complete KYB" />
            <StatusIndicator isChecked={false} text="Fund wallet" />
          </div>
          <div className="grid gap-2 sm:hidden mt-6">
            <StatusIndicator isChecked={true} text="Verify email" />
            <StatusIndicator isChecked={true} text="Provide company info" />
            <div className="grid grid-cols-2 gap-2 h-12">
              <StatusIndicator isChecked={true} text="Complete KYB" />
              <StatusIndicator isChecked={true} text="Fund wallet" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
