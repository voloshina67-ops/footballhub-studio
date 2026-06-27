"use client";

import { useMatchStore } from "../store/matchStore";

export default function FieldHeader() {
  const homeTeam = useMatchStore((s) => s.homeTeam);
  const awayTeam = useMatchStore((s) => s.awayTeam);

  return (
    <div className="mb-4 flex items-center justify-between">

      <div className="rounded-2xl bg-gradient-to-r from-[#163057] to-[#21477f] px-10 py-4 shadow-lg">
        <div className="text-3xl font-black uppercase tracking-wide text-white">
          {homeTeam}
        </div>
      </div>

      <div className="text-center">
        <div className="text-6xl font-black uppercase text-[#00ff8c]">
          LINE UP
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-[#6b1636] to-[#8c2048] px-10 py-4 shadow-lg">
        <div className="text-3xl font-black uppercase tracking-wide text-white">
          {awayTeam}
        </div>
      </div>

    </div>
  );
}
