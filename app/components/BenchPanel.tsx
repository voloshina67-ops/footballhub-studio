"use client";

import Image from "next/image";
import {
  type FlashscorePlayer,
  useFlashscoreStore,
} from "../store/flashscoreStore";
import { useBenchSelectionStore } from "../store/benchSelectionStore";

type TeamSide = "home" | "away";

type BenchSectionProps = {
  title: string;
  side: TeamSide;
  players: FlashscorePlayer[];
};

function BenchPlayerCard({
  player,
  side,
  isSelected,
}: {
  player: FlashscorePlayer;
  side: TeamSide;
  isSelected: boolean;
}) {
  const selectBench = useBenchSelectionStore(
    (state) => state.selectBench
  );
  const name = player.name?.trim() || "Player";
  const number = player.number?.trim() || "-";
  const photo = player.photo?.trim();
  const accent =
    side === "home"
      ? "border-cyan-200/25 bg-cyan-300/10 text-cyan-100"
      : "border-rose-200/25 bg-rose-300/10 text-rose-100";

  const selectPlayer = () => {
    selectBench({ id: player.id, team: side });
  };

  return (
    <button
      type="button"
      draggable
      onClick={selectPlayer}
      onDragStart={(event) => {
        selectPlayer();
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData(
          "application/x-footballhub-bench",
          JSON.stringify({ id: player.id, team: side })
        );
      }}
      className={`flex min-w-[13rem] max-w-[16rem] flex-1 items-center gap-3 rounded-xl border px-3 py-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-white/[0.1] ${
        isSelected
          ? "border-emerald-200/70 bg-emerald-300/15"
          : "border-white/10 bg-white/[0.055]"
      }`}
    >
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={40}
          height={40}
          sizes="40px"
          className="h-10 w-10 rounded-full object-cover shadow-[0_5px_12px_rgba(0,0,0,0.3)]"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-black uppercase text-slate-900">
          {name.charAt(0)}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-black uppercase text-white">
          {name}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className={`rounded-md border px-2 py-0.5 text-xs font-black ${accent}`}>
            #{number}
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/35">
            Bench
          </span>
        </div>
      </div>
    </button>
  );
}

function BenchSection({ title, side, players }: BenchSectionProps) {
  const selectedBench = useBenchSelectionStore(
    (state) => state.selectedBench
  );

  return (
    <section className="min-w-0 flex-1 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-100/70">
            {title}
          </div>
          <div className="mt-1 text-xs font-semibold text-white/40">
            Select a substitute, then click or drop onto a player on the pitch.
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-white/55">
          {players.length}
        </div>
      </div>

      {players.length ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {players.map((player) => (
            <BenchPlayerCard
              key={player.id}
              player={player}
              side={side}
              isSelected={
                selectedBench?.id === player.id &&
                selectedBench.team === side
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.03] px-4 py-5 text-center text-sm font-semibold text-white/40">
          No substitutes available.
        </div>
      )}
    </section>
  );
}

export default function BenchPanel() {
  const homeSubs = useFlashscoreStore((state) => state.homeSubs);
  const awaySubs = useFlashscoreStore((state) => state.awaySubs);

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <BenchSection title="Home Bench" side="home" players={homeSubs} />
      <BenchSection title="Away Bench" side="away" players={awaySubs} />
    </div>
  );
}
