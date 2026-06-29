import { create } from "zustand";
import {
  DEFAULT_THEME,
  type ThemeName,
} from "../lib/themes";

type ThemeStore = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: DEFAULT_THEME,
  setTheme: (theme) => set({ theme }),
}));
