"use client";

import { useMatchStore } from "../store/matchStore";

export default function MatchHeader() {
  const homeTeam = useMatchStore((s) => s.homeTeam);
  const awayTeam = useMatchStore((s) => s.awayTeam);

  const homeLogo = useMatchStore((s) => s.homeLogo);
  const awayLogo = useMatchStore((s) => s.awayLogo);

  return (
    <div className="relative mb-5 overflow-hidden rounded-3xl bg-gradient-to-r from-[#072a73] via-[#090f3f] to-[#7b001f]">

      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_left,_#3b82f6_0%,transparent_45%),radial-gradient(circle_at_right,_#ef4444_0%,transparent_45%)]" />
      </div>

      <div className="relative flex items-center justify-between px-12 py-8">

        <div className="flex items-center gap-6">

          {homeLogo && (
            <img
              src={homeLogo}
              className="h-32 w-32 object-contain"
            />
          )}

          <div>
            <div className="text-5xl font-black uppercase tracking-wide text-white">
              {homeTeam}
            </div>

            <div className="mt-1 text-2xl text-zinc-300">
              4-3-3
            </div>
          </div>

        </div>

        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.08)]">
          <div className="text-6xl font-black tracking-widest text-white">
            VS
          </div>
        </div>

        <div className="flex items-center gap-6">

          <div className="text-right">
            <div className="text-5xl font-black uppercase tracking-wide text-white">
              {awayTeam}
            </div>

            <div className="mt-1 text-2xl text-zinc-300">
              4-3-3
            </div>
          </div>

          {awayLogo && (
            <img
              src={awayLogo}
              className="h-32 w-32 object-contain"
            />
          )}

        </div>

      </div>

    </div>
  );
}
