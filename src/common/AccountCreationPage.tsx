import AccountCreationForm from "./AccountCreationForm";

function AccountCreationPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Create your account
        </h1>
        <p className="text-gray-600">
          Securely access your account and manage payroll with ease
        </p>
      </div>
      <AccountCreationForm />
    </>
  );
}

export default AccountCreationPage;
