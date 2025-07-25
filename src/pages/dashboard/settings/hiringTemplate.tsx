import { Link } from "react-router-dom";
import { EditIcon, EmptyStateIcon, TrashIcon } from "../../../assets/svg/svg";
import { RoutePaths } from "../../../routes/routesPath";
import { useEffect, useState } from "react";
import { getTemplates } from "../../../utils/constant";
import { TemplateData } from "../../../types/types";

const HiringTemplate = () => {
  const [templates, setTemplates] = useState<TemplateData[] | null>(null);

  useEffect(() => {
    const savedTemplate = getTemplates();
    if (savedTemplate) setTemplates(savedTemplate);
  }, []);

  const handleRemoveTemplate = (id: string) => {
    if (!templates) return;

    // 1️⃣ Filter out the one to delete
    const updated = templates.filter((t) => t.id !== id);

    // 2️⃣ Update React state
    setTemplates(updated);

    // 3️⃣ Persist back to localStorage
    localStorage.setItem("template", JSON.stringify(updated));
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-500 rounded-lg p-6 space-y-4">
        <div className="flex lg:gap-19 justify-between items-center w-full">
          <div>
            <h3 className="font-semibold text-gray-500  dark:text-gray-150 mb-1">
              Templates
            </h3>
            <p className="text-xs font-medium text-gray-300 dark:text-gray-300">
              Save your hiring preferences as a template to apply them instantly
              to your next hire. Templates can help reduce your time to hire and
              promote consistent, fair hiring policies around the world.
            </p>
          </div>

          <Link
            to={RoutePaths.TEMPLATE_SETTINGS}
            className="shrink-0 flex items-center border-2 border-primary-200 dark:border-primary-400 text-primary-200 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-50 text-sm font-medium rounded-full h-8 gap-1 px-4"
          >
            <EditIcon /> New template
          </Link>
        </div>

        <div className="py-10 ">
          {templates && templates?.length > 0 ? (
            <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-600 ">
                <th className="py-4 pl-4 text-gray-400 dark:text-gray-200 font-medium text-sm">
                  Name
                </th>
                <th className="p-4 text-gray-400 dark:text-gray-200 font-medium text-sm">
                  Permissions
                </th>
                <th></th>
              </thead>
              <tbody>
                {templates.map((templates) => (
                  <tr
                    className="border-b border-gray-150 dark:border-gray-250 "
                    key={templates.id}
                  >
                    <td className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-150">
                      <Link
                        to={`${RoutePaths.TEMPLATE_SETTINGS}/${templates.id}`}
                      >
                        <p>{templates.jobTitle}</p>
                        <p className="text-xs font-medium text-gray-300 lg:hidden">
                          Timeoff: {templates.timeOff} days
                        </p>
                      </Link>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-150">
                        {templates.timeOff} days
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center justify-end gap-2">
                        <Link
                          to={`${RoutePaths.EDIT_TEMPLATE_SETTINGS}/${templates.id}`}
                          className="size-8 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-150 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-200 flex items-center justify-center cursor-pointer"
                        >
                          <EditIcon />
                        </Link>
                        {/* TODO:all my button styles */}
                        <button
                          onClick={() => handleRemoveTemplate(templates.id)}
                          className="size-8 rounded-full bg-error-400 dark:bg-error-300 flex items-center justify-center cursor-pointer"
                        >
                          <TrashIcon />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center text-center flex-col w-fit mx-auto px-4 lg:py-8">
              <EmptyStateIcon />

              <p className="text-gray-600 dark:text-gray-150  font-semibold mb-1">
                You haven’t created any hiring templates
              </p>

              <p className="text-xs font-medium text-gray-300">
                You can create and manage hiring templates here
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HiringTemplate;
