"use client";

import Image from "next/image";
import { useFlashscoreStore } from "../store/flashscoreStore";
import { useMatchStore } from "../store/matchStore";

type SidebarPlayer = {
  id: number | string;
  number?: string;
  name: string;
  photo: string;
};

function PlayerRow({
  player,
  muted = false,
}: {
  player: SidebarPlayer;
  muted?: boolean;
}) {
  const name = player.name || "Player";
  const photo = player.photo?.trim();

  return (
    <div className={`flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 ${muted ? "bg-white/[0.03]" : "bg-white/[0.04]"}`}>
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={32}
          height={32}
          sizes="32px"
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-black uppercase text-slate-900">
          {name.charAt(0)}
        </div>
      )}
      <span className={`min-w-0 truncate text-sm font-semibold ${muted ? "text-white/85" : "text-white"}`}>
        <span className="mr-1 font-black text-rose-300">
          #{player.number || "-"}
        </span>
        {name}
      </span>
    </div>
  );
}

export default function AwayPlayersSidebar() {
  const awayPlayers = useFlashscoreStore((s) => s.awayPlayers);
  const awaySubs = useFlashscoreStore((s) => s.awaySubs);

  const awayTeam = useMatchStore((s) => s.awayTeam);

  return (
    <aside className="w-full shrink-0 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl xl:w-[280px]">
      <div className="mb-4 rounded-xl border border-rose-200/15 bg-gradient-to-r from-red-900/70 to-rose-900/70 px-4 py-3 text-center shadow-lg">
        <div className="truncate text-lg font-black uppercase tracking-wide text-white">
          {awayTeam || "Away"}
        </div>
      </div>

      <div className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-rose-100/65">
        Starting XI
      </div>

      <div className="space-y-2">
        {awayPlayers.length ? (
          awayPlayers.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/45">
            No starters loaded.
          </div>
        )}
      </div>

      <div className="mb-3 mt-6 text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">
        Substitutes
      </div>

      <div className="space-y-2">
        {awaySubs.length ? (
          awaySubs.map((player) => (
            <PlayerRow key={player.id} player={player} muted />
          ))
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/35">
            No substitutes loaded.
          </div>
        )}
      </div>
    </aside>
  );
}
