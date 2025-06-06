import { AuthFormHeader } from "../../common/auth/AuthFormHeader";
import { SigninForm } from "../../components/auth/SigninForm";
import useModal from "../../hooks/useModal";
import WelcomeOnboardModal from "../../components/modal/welcomeOnboardModal";


const SignIn = () => {
  const {  hideModal, showModal } = useModal();
  return (
    <div className="flex flex-col gap-8">
      {/* <ThemeToggle /> */}
      <AuthFormHeader
        title="Welcome back!"
        description="Securely access your account and manage payroll with ease"
      />
      <button
  className="button button--primary"
  onClick={() =>{
    showModal({
      type: "custom",
      customComponent: <WelcomeOnboardModal close={hideModal} />,
      size: "md",
      confirmText: "Go to dashboard", // 🚫 disable global confirm button
    })
  
  }}
>
  Show Welcome Onboard Modal
</button>
      <SigninForm />
    </div>
  );
};

export default SignIn;
