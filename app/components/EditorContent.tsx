"use client";

import { useLineupStore } from "../store/lineupStore";
import HomePlayersSidebar from "./HomePlayersSidebar";
import AwayPlayersSidebar from "./AwayPlayersSidebar";
import FootballField from "./FootballField";
import ExportButton from "./ExportButton";
import MatchHeader from "./MatchHeader";
import FormationControls from "./FormationControls";

export default function EditorContent() {
  const players = useLineupStore((s) => s.players);

  if (!players.length) {
    return null;
  }

  return (
    <>

      <div className="flex gap-3">

        <HomePlayersSidebar />

        <div className="min-w-0 flex-1">
          <FormationControls />

          <div
            id="export-area"
            className="mx-auto aspect-video w-full max-w-[1600px] overflow-hidden rounded-[clamp(1rem,2.4vw,1.75rem)] bg-transparent p-[clamp(0.5rem,1vw,0.9rem)]"
          >
            <div className="flex h-full min-h-0 flex-col">
              <MatchHeader />

              <div className="min-h-0 flex-1 [&_#lineup-canvas]:h-full [&_#lineup-canvas>img]:h-full">
                <FootballField />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <ExportButton />
          </div>
        </div>

        <AwayPlayersSidebar />

      </div>
    </>
  );
}
