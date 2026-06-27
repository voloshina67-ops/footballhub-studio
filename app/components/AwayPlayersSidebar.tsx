"use client";

import { useFlashscoreStore } from "../store/flashscoreStore";
import { useMatchStore } from "../store/matchStore";

export default function AwayPlayersSidebar() {
  const awayPlayers = useFlashscoreStore((s) => s.awayPlayers);
  const awaySubs = useFlashscoreStore((s) => s.awaySubs);

  const awayTeam = useMatchStore((s) => s.awayTeam);

  return (
    <div className="w-[280px] rounded-2xl border border-white/10 bg-[#0b1727] p-3">
      <div className="mb-4 flex flex-col items-center">

        <div className="w-full rounded-xl border border-red-500/20 bg-gradient-to-r from-red-900/70 to-rose-900/70 px-4 py-3 text-center shadow-lg"><div className="text-xl font-black uppercase tracking-wider text-white">{awayTeam}</div></div>
      </div>

      <div className="mb-3 font-bold text-white">
        СТАРТОВИЙ СКЛАД
      </div>

      <div className="space-y-2">
        {awayPlayers.map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <img src={p.photo} className="h-8 w-8 rounded-full" />
            <span className="text-sm text-white"><span className="mr-1 font-bold text-cyan-400">#{p.number}</span>{p.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-3 font-bold text-white">
        ЗАМІНИ
      </div>

      <div className="space-y-2">
        {awaySubs.map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <img src={p.photo} className="h-8 w-8 rounded-full" />
            <span className="text-sm text-white"><span className="mr-1 font-bold text-cyan-400">#{p.number}</span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
