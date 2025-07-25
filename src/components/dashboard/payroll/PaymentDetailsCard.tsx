// components/ui/EmployeeCard.tsx
import { useParams } from 'react-router-dom';
import ProfilePicture from '../../../assets/images/ProfilePic.png';
import { timeSheetRecords } from "../../../data/timeSheetRecords";

const PaymentDetailsCard = () => {
  const { id } = useParams();
  const timeSheetDetail = timeSheetRecords.find(
    (record) => record.id === Number(id)
  );

  if (!timeSheetDetail) return null;

  const {
    contract,
    paidIn = '',
    totalAmount = '',
    network = '',
    frequency = '',
  } = timeSheetDetail;
 const client = contract?.client;
 const payment = contract?.paymentType;
  return (
    <div className="w-full max-w-104 rounded-xl p-5 bg-white h-83">
      <div className="w-fit px-2 py-1 text-xs font-semibold bg-primary-500 text-primary-200 rounded-full border border-primary-200">
        Payment Details
      </div>

      <div className="flex items-center gap-2 mt-4">
        <img
          src={ProfilePicture}
          alt={client}
          className="w-12 h-12 rounded-xl object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-500">{client}</h3>
          <p className="text-xs text-gray-400">{payment}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md mt-4 text-sm text-gray-700">
        <div className="flex justify-between bg-gray-100 text-xs text-gray-400 font-medium px-2 py-1">
          <span>Asset</span>
          <span>Amount</span>
        </div>
        <div className="flex justify-between items-center p-2 font-semibold text-gray-500">
          <div className="flex items-center gap-1 text-sm">
            <div className="w-4 h-4 bg-success-500 rounded-full"></div>
            <span>{paidIn}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span>$ {totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 text-xs text-gray-400 px-2 py-1 flex justify-between">
        <p>Network</p>
        <p>Frequency</p>
      </div>
      <div className="flex justify-between gap-1 text-xs p-2">
          <span>{network}</span>
          <span>{frequency}</span>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;
