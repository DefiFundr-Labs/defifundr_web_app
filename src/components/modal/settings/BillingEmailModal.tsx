import { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CancelIcon } from "../../../assets/svg/svg";

interface BillingEmailModalProps {
  initialEmail: string;
  onSave: (email: string) => void;
}

const BillingEmailModal = ({
  initialEmail,
  onSave,
}: BillingEmailModalProps) => {
  const [billingEmail, setBillingEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      setLoading(false);
      onSave(billingEmail.trim());
    }, 500);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative pl-8">
        <button className="cursor-pointer absolute left-0">
          <CancelIcon size={32} />
        </button>
        <h1 className="text-xl font-semibold text-center">
          Billing email address
        </h1>
      </div>

      <div className="form-control my-8">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={billingEmail}
          onChange={(e) => setBillingEmail(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loading}
        className="mt-14 bg-primary-200 hover:bg-primary-200/90 rounded-full text-white font-medium h-14 w-full"
      >
        {loading ? <ClipLoader color="white" size={20} /> : "Update"}
      </button>
    </form>
  );
};

export default BillingEmailModal;
