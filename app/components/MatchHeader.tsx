"use client";

import Image from "next/image";
import { useMatchStore } from "../store/matchStore";

type TeamIdentityProps = {
  name: string;
  logo: string;
  side: "home" | "away";
};

function TeamIdentity({ name, logo, side }: TeamIdentityProps) {
  const isHome = side === "home";

  const crest = (
    <div className="relative flex size-[clamp(2.5rem,6vw,7rem)] shrink-0 items-center justify-center overflow-hidden rounded-[clamp(0.75rem,1.4vw,1.5rem)] border border-white/20 bg-white/10 p-[clamp(0.4rem,0.8vw,0.85rem)] shadow-[0_12px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl">
      {logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
          width={112}
          height={112}
          sizes="(max-width: 768px) 48px, (max-width: 1920px) 80px, 112px"
          className="h-full w-full object-contain drop-shadow-[0_5px_12px_rgba(0,0,0,0.35)]"
        />
      ) : (
        <span className="text-[clamp(1rem,2.2vw,2.5rem)] font-black text-white/85">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );

  const label = (
    <div className={isHome ? "min-w-0" : "min-w-0 text-right"}>
      <div className="text-[clamp(0.45rem,0.55vw,0.75rem)] font-bold uppercase tracking-[0.22em] text-white/45">
        {isHome ? "Home" : "Away"}
      </div>
      <div className="truncate text-[clamp(0.8rem,1.65vw,2rem)] font-black uppercase leading-tight tracking-[-0.025em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
        {name}
      </div>
    </div>
  );

  return (
    <div
      className={`flex min-w-0 items-center gap-[clamp(0.5rem,1.4vw,1.5rem)] ${
        isHome ? "justify-start" : "justify-end"
      }`}
    >
      {isHome ? (
        <>
          {crest}
          {label}
        </>
      ) : (
        <>
          {label}
          {crest}
        </>
      )}
    </div>
  );
}

export default function MatchHeader() {
  const homeTeam = useMatchStore((s) => s.homeTeam);
  const awayTeam = useMatchStore((s) => s.awayTeam);
  const homeLogo = useMatchStore((s) => s.homeLogo);
  const awayLogo = useMatchStore((s) => s.awayLogo);

  const homeName = homeTeam.trim() || "Home";
  const awayName = awayTeam.trim() || "Away";

  return (
    <header
      aria-label={`${homeName} versus ${awayName}`}
      className="relative isolate mb-[clamp(0.6rem,1.2vw,1rem)] overflow-hidden rounded-[clamp(1rem,2.4vw,1.75rem)] border border-white/15 bg-[#07120f]/95 shadow-[0_18px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.16)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(59,130,246,0.24),transparent_32%),radial-gradient(circle_at_90%_30%,rgba(244,63,94,0.22),transparent_32%),linear-gradient(115deg,rgba(255,255,255,0.08),transparent_35%,rgba(16,185,129,0.08)_65%,transparent)]" />
      <div className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-emerald-100/70 to-transparent shadow-[0_0_18px_rgba(167,243,208,0.5)]" />

      <div className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[clamp(0.5rem,2vw,2.5rem)] px-[clamp(0.75rem,2.5vw,3rem)] py-[clamp(0.65rem,1.5vw,1.5rem)]">
        <TeamIdentity name={homeName} logo={homeLogo} side="home" />

        <div className="flex flex-col items-center">
          <div className="mb-[clamp(0.2rem,0.45vw,0.45rem)] flex items-center gap-1.5 rounded-full border border-emerald-200/15 bg-emerald-300/10 px-[clamp(0.4rem,0.8vw,0.75rem)] py-1 text-[clamp(0.4rem,0.52vw,0.7rem)] font-extrabold uppercase tracking-[0.16em] text-emerald-100/85 backdrop-blur-xl">
            <span className="size-[clamp(0.25rem,0.35vw,0.4rem)] rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
            Pre-match
          </div>

          <div className="rounded-[clamp(0.7rem,1.2vw,1.25rem)] border border-white/15 bg-black/25 px-[clamp(0.65rem,1.5vw,1.5rem)] py-[clamp(0.25rem,0.55vw,0.55rem)] text-[clamp(1.25rem,2.8vw,3.5rem)] font-black leading-none tracking-[0.08em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl tabular-nums">
            0 <span className="text-white/35">-</span> 0
          </div>
        </div>

        <TeamIdentity name={awayName} logo={awayLogo} side="away" />
      </div>
    </header>
  );
}
