"use client";

import {
  DEFAULT_THEME,
  THEME_PRESETS,
  isThemeName,
  type ThemeName,
} from "../lib/themes";
import { useThemeStore } from "../store/themeStore";

const THEME_OPTIONS = Object.keys(
  THEME_PRESETS
) as ThemeName[];

export default function ThemeControls() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <div className="mb-4 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
      <div className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-100/70">
        Theme
      </div>

      <label className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
        <span className="shrink-0 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/55">
          Preset
        </span>
        <select
          value={theme}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setTheme(
              isThemeName(value)
                ? value
                : DEFAULT_THEME
            );
          }}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-extrabold text-white outline-none transition focus:border-emerald-200/50"
        >
          {THEME_OPTIONS.map((themeName) => (
            <option key={themeName} value={themeName}>
              {THEME_PRESETS[themeName].label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
