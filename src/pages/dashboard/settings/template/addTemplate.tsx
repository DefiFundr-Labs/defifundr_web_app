import { useState } from "react";
import TitleHeader from "../../../../common/dashboard/TitleHeader";
import RichTextEditor from "../../../../components/dashboard/profile-settings/RichTextEditor";
import { saveTemplate } from "../../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AddTemplate = () => {
  const [description, setDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [timeOff, setTimeOff] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isEmptyDescription =
    description.replace(/<(.|\n)*?>/g, "").trim() === "";
  const isFormInvalid = !jobTitle || isEmptyDescription || !timeOff || loading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormInvalid) {
      return;
    }

    const newTemplate = {
      id: Date.now().toString(),
      jobTitle,
      description,
      timeOff: Number(timeOff),
    };
    setLoading(true);

    saveTemplate(newTemplate);

    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1000);
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-500">
      <TitleHeader title="Create template" isBackButton />

      <div className="p-4">
        <form
          className="bg-white rounded-lg max-w-125 w-full p-6 space-y-10 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="jobTitle">Job title</label>
              <input
                type="text"
                id="jobTitle"
                placeholder="--"
                required
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="custom-editor space-y-2">
              <RichTextEditor
                label="Description"
                value={description}
                onChange={setDescription}
                placeholder="--"
              />
            </div>

            <div className="form-control">
              <label htmlFor="timeOff">Time off (days)</label>
              <input
                type="number"
                id="timeOff"
                placeholder="--"
                required
                onChange={(e) => setTimeOff(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={isFormInvalid}
            className="bg-primary-200 hover:bg-primary-200/90 rounded-full text-white font-medium h-14 w-full disabled:bg-primary-200/80"
          >
            {loading ? <ClipLoader color="white" size={20} /> : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTemplate;
