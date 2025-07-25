import { useNavigate, useParams } from "react-router-dom";
import { BriefCaseIcon } from "../../../../assets/svg/svg";
import TemplateHeader from "../../../../components/dashboard/profile-settings/TemplateHeader";
import { useEffect, useState } from "react";
import { getTemplates } from "../../../../utils/constant";
import { TemplateData } from "../../../../types/types";
import RichTextEditor from "../../../../components/dashboard/profile-settings/RichTextEditor";
import useModal from "../../../../hooks/useModal";
import DeleteTemplate from "../../../../components/modal/DeleteTemplate";

const TemplateDetails = () => {
  const { id } = useParams();

  const [templates, setTemplates] = useState<TemplateData>();

  const navigate = useNavigate();

  const { showCustomModal } = useModal();

  useEffect(() => {
    const savedTemplate = getTemplates();
    if (savedTemplate && id) {
      const template = savedTemplate.find((template) => template.id === id);
      template ? setTemplates(template) : navigate(-1);
    } else navigate(-1);
  }, [id]);

  if (!templates) {
    return <div>Loading…</div>;
  }

  const handleDelete = () => {
    showCustomModal(
      <DeleteTemplate
        jobTitle={templates.jobTitle}
        onDelete={() => {
          const savedTemplate = getTemplates();
          const updatedTemplate = savedTemplate?.filter(
            (t) => t.id !== templates.id
          );

          updatedTemplate &&
            localStorage.setItem("template", JSON.stringify(updatedTemplate));
          navigate(-1);
        }}
      />
    );
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-600 min-h-full">
      <TemplateHeader
        title="Hiring template"
        handleDelete={handleDelete}
        id={templates.id}
      />
      <div className="p-4">
        <div className="bg-white dark:bg-gray-500 rounded-lg p-4 lg:p-6 space-y-8 max-w-4xl">
          <section className="flex items-center flex-col gap-4 text-center">
            <div className="rounded-full size-16 bg-primary-500 text-primary-200 flex justify-center items-center">
              <BriefCaseIcon size={24} />
            </div>

            <span>
              <h2 className="font-semibold text-xl text-gray-500 mb-1">
                {templates?.jobTitle}
              </h2>
              <span className="flex w-fit items-center mx-auto gap-1 text-gray-300 font-medium text-sm ">
                <BriefCaseIcon size={16} />

                <p className="text-gray-400">Time off:</p>

                <p className="text-gray-500">{templates?.timeOff} days</p>
              </span>
            </span>
          </section>

          <section>
            <div className="bg-gray-100 py-1 px-2 text-xs font-medium text-gray-400 ">
              Job description
            </div>

            {/* content */}

            <div className="p-2 text-gray-500">
              <RichTextEditor value={templates.description} readOnly />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetails;
