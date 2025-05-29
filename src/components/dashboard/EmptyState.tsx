import { EmptyStateIcon } from "../../assets/svg/svg";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ description, title }: EmptyStateProps) => {
  return (
    <div className="flex items-center text-center flex-col w-fit px-4 lg:py-8">
      <EmptyStateIcon />

      <p className="text-gray-600 dark:text-gray-150 text-xl font-semibold mb-1">
        {title}
      </p>

      <p className="text-sm font-medium text-gray-300">{description}</p>
    </div>
  );
};

export default EmptyState;
