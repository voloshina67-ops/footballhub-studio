"use client";

import { useLineupStore } from "../store/lineupStore";
import HomePlayersSidebar from "./HomePlayersSidebar";
import AwayPlayersSidebar from "./AwayPlayersSidebar";
import FootballField from "./FootballField";
import ExportButton from "./ExportButton";
import MatchHeader from "./MatchHeader";

export default function EditorContent() {
  const players = useLineupStore((s) => s.players);

  if (!players.length) {
    return null;
  }

  return (
    <>

      <div className="flex gap-3">

        <HomePlayersSidebar />

        <div className="flex-1">
          <div id="export-area">
            <MatchHeader />
            <FootballField />
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
