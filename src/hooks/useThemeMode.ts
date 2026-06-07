import { createContext, useContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeModeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const THEME_STORAGE_KEY = "mycarapp-theme-mode";
export const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);


export const useThemeMode = (): ThemeModeContextValue => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within Provider");
  }
  return context;
};
