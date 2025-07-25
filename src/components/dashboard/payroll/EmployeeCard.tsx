// components/ui/EmployeeCard.tsx
import { Mail, Phone, Location } from "../../../assets/svg/svg";
import { useParams } from 'react-router-dom';
import ProfilePicture from '../../../assets/images/ProfilePic.png';
import { timeSheetRecords } from "../../../data/timeSheetRecords";

const EmployeeCard = () => {
  const { id } = useParams();
  const timeSheetDetail = timeSheetRecords.find(
    (record) => record.id === Number(id)
  );

  if (!timeSheetDetail) return null;

  const {
    employeeName,
    role,
    email = '',
    phone = '',
    address = '',
  } = timeSheetDetail;

  return (
    <div className="w-full max-w-104 rounded-xl p-5 bg-white h-83">
      <div className="w-fit px-2 py-1 text-xs font-semibold bg-primary-500 text-primary-200 rounded-full border border-primary-200">
        Employee
      </div>

      <div className="flex items-center gap-2 mt-4">
        <img
          src={ProfilePicture}
          alt={employeeName}
          className="w-12 h-12 rounded-xl object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-500">{employeeName}</h3>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md mt-4 text-sm text-gray-700">
        <div className="flex justify-between bg-gray-100 text-xs text-gray-400 font-medium px-2 py-1">
          <span>Email address</span>
          <span>Phone number</span>
        </div>
        <div className="flex justify-between gap-2 flex-wrap items-center p-2">
          <div className="flex items-center gap-1 text-sm whitespace-nowrap">
            <Mail />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-1 text-sm whitespace-nowrap">
            <Phone/>
            <span>{phone}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 text-xs text-gray-400 px-2 py-1">
        <p>Address</p>
      </div>
      <div className="flex gap-1 text-xs p-2">
          <Location/>
          <span>{address}</span>
      </div>
    </div>
  );
};

export default EmployeeCard;

