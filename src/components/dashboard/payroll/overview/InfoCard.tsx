import React from 'react';

interface InfoCardProps {
  label: string;
  value: string;
  caption?: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value, caption = 'This year'}) => {
  return (
    <div className='bg-white dark:bg-gray-500 h-22 rounded shadow-sm p-4 flex flex-col justify-between'>
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-gray-400 dark:text-gray-200">{label}</span>
        <span className="text-gray-300">{caption}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-500 dark:text-gray-150 mt-2">{value}</div>
    </div>
  );
};

export default InfoCard;

