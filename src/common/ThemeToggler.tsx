import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTheme, ThemeMode } from "../redux/slice/themeSlice";

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.mode);

  const handleThemeChange = (newTheme: ThemeMode) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <div className="flex items-center my-2 space-x-2">
      <div className="flex p-1 rounded-full bg-gray-150 dark:bg-gray-500">
        {/* Light mode button */}
        <button
          onClick={() => handleThemeChange("light")}
          className={`p-1.5 rounded-full ${
            currentTheme === "light"
              ? "bg-white text-gray-600 shadow-sm"
              : "text-gray-400 dark:text-gray-200"
          }`}
          aria-label="Light mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>

        {/* System mode button */}
        <button
          onClick={() => handleThemeChange("system")}
          className={`p-1.5 rounded-full ${
            currentTheme === "system"
              ? "bg-white text-gray-600 shadow-sm dark:bg-gray-400 dark:text-white"
              : "text-gray-400 dark:text-gray-200"
          }`}
          aria-label="System preference"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>

        {/* Dark mode button */}
        <button
          onClick={() => handleThemeChange("dark")}
          className={`p-1.5 rounded-full ${
            currentTheme === "dark"
              ? "bg-gray-400 text-white shadow-sm"
              : "text-gray-400 dark:text-gray-200"
          }`}
          aria-label="Dark mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
