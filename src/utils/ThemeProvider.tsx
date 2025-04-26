import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectEffectiveTheme,
  setSystemIsDark,
} from "../redux/slice/themeSlice";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector(selectEffectiveTheme);

  useEffect(() => {
    // Add or remove dark class to/from html element
    if (effectiveTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [effectiveTheme]);

  useEffect(() => {
    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial value
    dispatch(setSystemIsDark(mediaQuery.matches));

    // Update when the system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(setSystemIsDark(e.matches));
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [dispatch]);

  return <>{children}</>;
};
