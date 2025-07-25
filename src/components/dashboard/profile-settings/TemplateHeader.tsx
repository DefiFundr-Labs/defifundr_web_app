import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EditIcon, TrashIcon } from "../../../assets/svg/svg";
import { RoutePaths } from "../../../routes/routesPath";

interface TemplateHeaderProps {
  title: string;
  id: string;
  onEdit?: () => void;
  handleDelete: () => void;
}
function TemplateHeader({
  title,
  handleDelete,
  onEdit,
  id,
}: TemplateHeaderProps) {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    onEdit && onEdit();
    navigate(`${RoutePaths.EDIT_TEMPLATE_SETTINGS}/${id}`);
  };

  return (
    <section className="sticky top-0 bg-white border-b z-5 border-gray-150 dark:border-gray-250 dark:bg-gray-600">
      <div className="flex items-center justify-between px-4 pt-6">
        <div className="pb-1 space-y-1">
          <button
            onClick={handleBackButton}
            className="flex items-center gap-1 text-xs font-medium text-gray-300 transition-colors duration-150 ease-in-out cursor-pointer hover:text-gray-200"
          >
            <span>
              <ArrowLeft size={16} />
            </span>
            Back
          </button>

          <div className="flex items-center justify-between gap-4">
            <h1 className="overflow-hidden text-2xl font-bold tracking-tight text-gray-600 truncate max-w-44 xs:max-w-56 dark:text-gray-150 whitespace-nowrap sm:text-4xl sm:max-w-full">
              {title}
            </h1>
          </div>
        </div>

        <div className="static hidden lg:flex items-center w-full gap-2 px-4 sm:px-0 sm:gap-4 lg:gap-2 lg:w-fit">
          <button
            aria-label="reject button"
            className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-error-500 border-error-500 hover:bg-error-500/12 focus:bg-error-500/20 dark:border-error-500 dark:text-error-500 dark:hover:bg-error-500/12 dark:focus:bg-error-500/20 lg:w-fit h-14 lg:h-10"
            onClick={handleDelete}
            type="button"
          >
            <span className="text-error-500 dark:text-primary-400">
              <TrashIcon />
            </span>
            Delete
          </button>

          <button
            onClick={handleEdit}
            type="button"
            className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 lg:h-10 bg-primary-200 lg:w-fit"
          >
            <EditIcon />
            Edit
          </button>
        </div>
      </div>
    </section>
  );
}

export default TemplateHeader;
