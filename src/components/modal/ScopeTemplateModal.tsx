import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { jobScopes as scopes } from "../../data/jobScope";
import EmptyState from "../dashboard/EmptyState";
import useModal from "../../hooks/useModal";

import { JobScopeProps } from "../../types/types";
import FormInput from "../form/FormInput";
import { CancelIcon, SearchIcon } from "../../assets/svg/svg";
import { CreateJobTemplateModal } from "./CreateJobTemplateModal";

interface ScopeTemplateModalProps {
  selectedJobScope: JobScopeProps | null;
  setSelectedJobScope: Dispatch<SetStateAction<JobScopeProps | null>>;
}

export const ScopeTemplateModal: FC<ScopeTemplateModalProps> = ({
  setSelectedJobScope,
  selectedJobScope,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { showContentOnlyModal } = useModal();
  const filteredJobScopes = scopes.filter((job) =>
    job.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOnSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedJobRole = e.target.value;
    const selected = scopes.find(
      (scope) => scope.jobRole.toLowerCase() === selectedJobRole.toLowerCase()
    );
    if (selected) {
      setSelectedJobScope(selected);
    }
  };

  const openCreateTemplateModal = () => {
    showContentOnlyModal(<CreateJobTemplateModal />);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <button
          // onClick={handleClose}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-fit cursor-pointer"
        >
          <CancelIcon />
        </button>
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-150 text-center">
          Select template
        </p>
      </div>
      <div className="relative bg-gray-100 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full py-2.5 px-4 rounded-lg h-12 text-xs font-medium placeholder:text-xs text-gray-300 placeholder:text-gray-300 outline-none border border-transparent focus:border-primary-200 focus:border relative z-20"
        />
        <div className="absolute -translate-y-1/2 top-1/2 right-4">
          <SearchIcon />
        </div>
      </div>

      <div className="">
        <div className="overflow-y-scroll pr-1 sm:max-h-79 sm:min-h-79 custom-scrollbar">
          {filteredJobScopes.length > 0 ? (
            filteredJobScopes.map((jobScope, index) => (
              <button
                key={index}
                className="flex items-center text-sm font-semibold text-gray-500 border-b cursor-pointer border-gray-150 w-full py-4"
              >
                {jobScope.jobRole}
              </button>
            ))
          ) : (
            <div className="flex items-center justify-center size-full">
              <EmptyState
                title="No job roles found"
                description="Try searching with a different keyword."
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white capitalize transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 bg-primary-200 disabled:cursor-not-allowed"
        aria-label="Create new template"
        onClick={openCreateTemplateModal}
      >
        Create new template
      </button>
    </div>
  );
};
