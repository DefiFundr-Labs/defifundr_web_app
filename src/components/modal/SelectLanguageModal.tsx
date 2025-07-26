import { useState } from "react";
import { CancelIcon, SearchIcon } from "../../assets/svg/svg";
import Flag from "react-world-flags";
import useModal from "../../hooks/useModal";

const languageOptions = [
  { name: "Arabic", locale: "ar", flag: "AE" },
  { name: "Chinese (Mandarin)", locale: "zh", flag: "cn" },
  { name: "English (UK)", locale: "en-GB", flag: "gb" },
  { name: "English (United States)", locale: "en-US", flag: "us" },
  { name: "French", locale: "fr", flag: "fr" },
  { name: "German", locale: "de", flag: "de" },
];

interface SelectLanguageModalProps {
  onSave: (value: string) => void;
  defaultLanguage: string;
}

const SelectLanguageModal = ({
  onSave,
  defaultLanguage,
}: SelectLanguageModalProps) => {
  const [selected, setSelected] = useState<string>(defaultLanguage);
  const [search, setSearch] = useState("");

  const { hideModal } = useModal();

  const filteredLanguages = languageOptions.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    onSave(selected);
  };

  return (
    <div className="w-full space-y-8">
      <div className="relative">
        <button className="absolute cursor-pointer" onClick={hideModal}>
          <CancelIcon size={32} />
        </button>
        <h3 className="text-xl font-bold text-center text-gray-500">
          Edit image
        </h3>
      </div>

      <div className="flex items-center h-12 px-4 bg-gray-100 rounded-lg">
        <input
          type="text"
          className="flex-1 text-xs font-medium outline-none placeholder:text-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <SearchIcon />
      </div>

      <div className="overflow-y-auto max-h-96 ">
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((lang) => (
            <div
              key={lang.locale}
              onClick={() => setSelected(lang.name)}
              className="flex items-center justify-between py-4 border-b cursor-pointer border-gray-150"
            >
              <div className="flex items-center gap-2">
                <Flag
                  code={lang.flag}
                  className="object-cover w-6 h-6 rounded-full"
                />
                <span className="text-sm font-semibold text-gray-500">
                  {lang.name}
                </span>
              </div>

              <div className="relative flex-shrink-0 size-5">
                <input
                  className="z-10 border rounded-full appearance-none border-gray-150 peer size-5 checked:border-primary-200 dark:border-gray-500 dark:checked:border-primary-400"
                  type="radio"
                  name="language"
                  checked={selected === lang.name}
                />
                <div className="absolute inset-1/2 mx-auto size-3.5 rounded-full bg-primary-200 opacity-0 transition-opacity duration-150 ease-in-out peer-checked:opacity-100 dark:bg-primary-400 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm font-medium text-center text-gray-400">
            No language found
          </p>
        )}
      </div>

      <button
        onClick={() => handleSave()}
        className="button h-14 !w-full py-3 rounded-full bg-primary-200 text-white hover:bg-primary-100 transition-colors duration-200"
      >
        Save
      </button>
    </div>
  );
};

export default SelectLanguageModal;
