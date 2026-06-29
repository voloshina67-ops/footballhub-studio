"use client";

import { useLineupStore } from "../store/lineupStore";
import HomePlayersSidebar from "./HomePlayersSidebar";
import AwayPlayersSidebar from "./AwayPlayersSidebar";
import FootballField from "./FootballField";
import ExportButton from "./ExportButton";
import MatchHeader from "./MatchHeader";
import FormationControls from "./FormationControls";
import ThemeControls from "./ThemeControls";
import PlayerRoleControls from "./PlayerRoleControls";
import BenchPanel from "./BenchPanel";
import { getThemePreset } from "../lib/themes";
import { useThemeStore } from "../store/themeStore";

export default function EditorContent() {
  const players = useLineupStore((s) => s.players);
  const themeName = useThemeStore((s) => s.theme);
  const theme = getThemePreset(themeName);

  if (!players.length) {
    return (
      <div className="rounded-[1.25rem] border border-dashed border-white/15 bg-slate-950/35 px-5 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-100/60">
          Empty Pitch
        </div>
        <div className="mt-2 text-lg font-black uppercase tracking-wide text-white">
          Import or load a project to start arranging the lineup.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 xl:flex-row">
      <HomePlayersSidebar />

      <div className="min-w-0 flex-1">
        <ThemeControls />
        <FormationControls />
        <PlayerRoleControls />

        <div
          id="export-area"
          className={`mx-auto aspect-video w-full max-w-[1600px] overflow-hidden rounded-[clamp(1rem,2.4vw,1.75rem)] bg-transparent p-[clamp(0.5rem,1vw,0.9rem)] ${theme.exportFrame}`}
        >
          <div className="flex h-full min-h-0 flex-col">
            <MatchHeader />

            <div className="min-h-0 flex-1 [&_#lineup-canvas]:h-full [&_#lineup-canvas>img]:h-full">
              <FootballField />
            </div>
          </div>
        </div>

        <BenchPanel />

        <div className="mt-4 flex justify-center">
          <ExportButton />
        </div>
      </div>

      <AwayPlayersSidebar />
    </div>
  );
}
