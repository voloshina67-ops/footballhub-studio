"use client";

import { useFlashscoreStore } from "../store/flashscoreStore";

export default function ImportedPlayers() {
  const homePlayers =
    useFlashscoreStore((s) => s.homePlayers);

  const awayPlayers =
    useFlashscoreStore((s) => s.awayPlayers);

  const homeSubs =
    useFlashscoreStore((s) => s.homeSubs);

  const awaySubs =
    useFlashscoreStore((s) => s.awaySubs);

  return (
    <>
      <div className="w-[280px] rounded-2xl border border-white/10 bg-[#0b1727] p-3">
        <div className="mb-3 font-bold text-white">
          HOME XI
        </div>

        <div className="space-y-2">
          {homePlayers.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2"
            >
              <img
                src={p.photo}
                className="h-8 w-8 rounded-full"
              />

              <span className="text-sm text-white">
                {p.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-3 font-bold text-white">
          SUBSTITUTES
        </div>

        <div className="space-y-2">
          {homeSubs.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2"
            >
              <img
                src={p.photo}
                className="h-8 w-8 rounded-full"
              />

              <span className="text-sm text-white">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[280px] rounded-2xl border border-white/10 bg-[#0b1727] p-3">
        <div className="mb-3 font-bold text-white">
          AWAY XI
        </div>

        <div className="space-y-2">
          {awayPlayers.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2"
            >
              <img
                src={p.photo}
                className="h-8 w-8 rounded-full"
              />

              <span className="text-sm text-white">
                {p.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-3 font-bold text-white">
          SUBSTITUTES
        </div>

        <div className="space-y-2">
          {awaySubs.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2"
            >
              <img
                src={p.photo}
                className="h-8 w-8 rounded-full"
              />

              <span className="text-sm text-white">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
