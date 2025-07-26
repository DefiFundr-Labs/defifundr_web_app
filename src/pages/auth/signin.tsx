import { AuthFormHeader } from "../../common/auth/AuthFormHeader";
import { SigninForm } from "../../components/auth/SigninForm";

const SignIn = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* <ThemeToggle /> */}
      <AuthFormHeader
        title="Welcome back!"
        description="Securely access your account and manage payroll with ease"
      />

      <SigninForm />
    </div>
  );
};

export default SignIn;
