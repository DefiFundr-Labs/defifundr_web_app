import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  systemIsDark: boolean;
}

// Get initial theme from localStorage or default to 'system'
const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      return savedTheme;
    }
  }
  return "system";
};

// Check if system preference is dark
const getSystemIsDark = (): boolean => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
  systemIsDark: getSystemIsDark(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    setSystemIsDark: (state, action: PayloadAction<boolean>) => {
      state.systemIsDark = action.payload;
    },
  },
});

export const { setTheme, setSystemIsDark } = themeSlice.actions;

// Selector to get the effective theme (accounting for system preference)
export const selectEffectiveTheme = (state: { theme: ThemeState }) => {
  if (state.theme.mode === "system") {
    return state.theme.systemIsDark ? "dark" : "light";
  }
  return state.theme.mode;
};

export default themeSlice.reducer;
