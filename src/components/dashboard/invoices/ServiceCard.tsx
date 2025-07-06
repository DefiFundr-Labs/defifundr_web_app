import { JSX } from "react";
import { LinkIcon } from "../../../assets/svg/svg";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  desc: string;
  buttonText: string;
  link: string;
}

const ServiceCard = ({
  icon,
  buttonText,
  desc,
  link,
  title,
}: ServiceCardProps) => {
  return (
    <div className="flex items-center gap-2 p-4 rounded-lg bg-white dark:bg-gray-500 sm:p-6 sm:gap-4 w-full">
      <div className="p-3.5 rounded-lg flex items-center justify-between bg-primary-500 dark:bg-primary-600 text-primary-200 dark:text-primary-400">
        {icon}
      </div>
      <div className="w-full">
        <p className="text-base font-medium sm:text-xl dark:text-gray-150">
          {title}
        </p>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs font-medium dark:text-gray-200">{desc}</p>
          <Link
            to={link}
            className="flex items-center gap-1 text-xs font-medium transition duration-150 ease-in-out text-primary-200 hover:text-primary-300 dark:hover:text-primary-300 dark:text-primary-400"
          >
            <span>{buttonText}</span>
            <LinkIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
