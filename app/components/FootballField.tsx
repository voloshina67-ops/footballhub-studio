"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  type FieldPlayer,
  useLineupStore,
} from "../store/lineupStore";
import { useFlashscoreStore } from "../store/flashscoreStore";
import { useBenchSelectionStore } from "../store/benchSelectionStore";

type DragState = {
  id: number;
  pointerId: number;
  fieldRect: DOMRect;
};

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  return initials || "P";
}

function hasCaptainBadge(player: FieldPlayer) {
  const playerWithCaptain = player as FieldPlayer & {
    captain?: unknown;
    isCaptain?: unknown;
  };

  return (
    playerWithCaptain.captain === true ||
    playerWithCaptain.isCaptain === true ||
    playerWithCaptain.captain === "true" ||
    playerWithCaptain.isCaptain === "true"
  );
}

function FieldPlayerCard({ player }: { player: FieldPlayer }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const name = String(player.name ?? "").trim() || "Unknown Player";
  const number = String(player.number ?? "").trim() || "-";
  const photo =
    typeof player.photo === "string"
      ? player.photo.trim()
      : "";
  const hasPhoto = Boolean(photo) && !photoFailed;
  const isHome = player.team === "home";
  const hasCaptain = hasCaptainBadge(player);
  const accentClasses = isHome
    ? {
        halo: "bg-blue-300/35",
        ring: "border-blue-200/90 shadow-blue-400/35",
        number:
          "border-blue-100/55 bg-blue-500/95 text-white shadow-blue-950/25",
        line: "from-blue-300/0 via-blue-200/75 to-blue-300/0",
      }
    : {
        halo: "bg-rose-300/35",
        ring: "border-rose-200/90 shadow-rose-400/35",
        number:
          "border-rose-100/55 bg-rose-500/95 text-white shadow-rose-950/25",
        line: "from-rose-300/0 via-rose-200/75 to-rose-300/0",
      };

  return (
    <div className="relative flex w-[clamp(5.5rem,12vw,8.5rem)] flex-col items-center rounded-[clamp(0.65rem,1vw,0.85rem)] border border-white/20 bg-slate-950/64 px-[clamp(0.35rem,0.8vw,0.6rem)] pb-[clamp(0.28rem,0.7vw,0.52rem)] pt-[clamp(0.34rem,0.8vw,0.6rem)] shadow-[0_14px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl">
      <div className={`pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r ${accentClasses.line}`} />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,0.18),transparent_38%,rgba(255,255,255,0.05))]" />

      <div className="relative">
        <div className={`absolute -inset-[clamp(0.2rem,0.55vw,0.38rem)] rounded-full ${accentClasses.halo} opacity-75 blur-md transition-opacity duration-200 group-hover:opacity-100`} />
        <div
          className={`relative flex h-[clamp(2.7rem,5.8vw,4.75rem)] w-[clamp(2.7rem,5.8vw,4.75rem)] items-center justify-center overflow-hidden rounded-full border-[clamp(2px,0.3vw,3px)] bg-[linear-gradient(145deg,#f8fafc,#94a3b8)] shadow-[0_9px_22px_rgba(0,0,0,0.48),0_0_0_1px_rgba(255,255,255,0.68)] ${accentClasses.ring}`}
        >
          {hasPhoto ? (
            <Image
              src={photo}
              alt={name}
              width={80}
              height={80}
              sizes="(max-width: 768px) 40px, (max-width: 1920px) 64px, 80px"
              draggable={false}
              onError={() => setPhotoFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[clamp(0.9rem,1.8vw,1.5rem)] font-black uppercase text-slate-900/78">
              {getInitials(name)}
            </span>
          )}
        </div>

        {hasCaptain && (
          <div className="absolute -right-[clamp(0.1rem,0.35vw,0.25rem)] -top-[clamp(0.1rem,0.35vw,0.25rem)] flex h-[clamp(1rem,1.8vw,1.45rem)] min-w-[clamp(1rem,1.8vw,1.45rem)] items-center justify-center rounded-full border border-amber-100/75 bg-amber-300/95 px-1 text-[clamp(0.45rem,0.75vw,0.65rem)] font-black text-slate-950 shadow-[0_5px_14px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.85)]">
            C
          </div>
        )}
      </div>

      <div className="relative mt-[clamp(0.28rem,0.65vw,0.5rem)] flex h-[clamp(1.35rem,2.25vw,1.85rem)] w-full items-stretch overflow-hidden rounded-[clamp(0.42rem,0.72vw,0.62rem)] border border-white/18 bg-black/44 shadow-[0_7px_18px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <span
          className={`flex min-w-[clamp(1.45rem,2.6vw,2.1rem)] items-center justify-center border-r px-1 text-[clamp(0.58rem,0.95vw,0.78rem)] font-black tabular-nums ${accentClasses.number}`}
        >
          {number}
        </span>
        <span className="min-w-0 flex-1 truncate px-[clamp(0.38rem,0.75vw,0.62rem)] text-[clamp(0.52rem,0.9vw,0.72rem)] font-extrabold uppercase leading-[clamp(1.35rem,2.25vw,1.85rem)] text-white shadow-black [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function FootballField() {
  const players = useLineupStore((s) => s.players);
  const movePlayer = useLineupStore((s) => s.movePlayer);
  const setPlayers = useLineupStore((s) => s.setPlayers);
  const homeSubs = useFlashscoreStore((s) => s.homeSubs);
  const awaySubs = useFlashscoreStore((s) => s.awaySubs);
  const setSubs = useFlashscoreStore((s) => s.setSubs);
  const selectedBench = useBenchSelectionStore((s) => s.selectedBench);
  const clearBench = useBenchSelectionStore((s) => s.clearBench);

  const fieldRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const swapWithBench = (targetPlayer: FieldPlayer) => {
    if (
      !selectedBench ||
      selectedBench.team !== targetPlayer.team
    ) {
      return;
    }

    const benchList =
      selectedBench.team === "home" ? homeSubs : awaySubs;
    const benchPlayer = benchList.find(
      (player) => player.id === selectedBench.id
    );

    if (!benchPlayer) return;

    const swappedPlayers = players.map((player) =>
      player.id === targetPlayer.id
        ? {
            ...player,
            name: benchPlayer.name,
            number: benchPlayer.number,
            photo: benchPlayer.photo,
          }
        : player
    );

    const returnedPlayer = {
      id: String(targetPlayer.id),
      name: targetPlayer.name,
      number: targetPlayer.number,
      photo: targetPlayer.photo,
    };

    const updatedBench = benchList.map((player) =>
      player.id === selectedBench.id
        ? returnedPlayer
        : player
    );

    setPlayers(swappedPlayers);

    if (selectedBench.team === "home") {
      setSubs(updatedBench, awaySubs);
    } else {
      setSubs(homeSubs, updatedBench);
    }

    clearBench();
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
    id: number
  ) => {
    if (
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    const fieldRect =
      fieldRef.current?.getBoundingClientRect();

    if (!fieldRect) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    dragRef.current = {
      id,
      pointerId: event.pointerId,
      fieldRect,
    };
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const drag = dragRef.current;

    if (
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    event.preventDefault();

    const x =
      ((event.clientX - drag.fieldRect.left) /
        drag.fieldRect.width) *
      100;

    const y =
      ((event.clientY - drag.fieldRect.top) /
        drag.fieldRect.height) *
      100;

    movePlayer(
      drag.id,
      Math.max(0, Math.min(100, x)),
      Math.max(0, Math.min(100, y))
    );
  };

  const handlePointerEnd = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (
      dragRef.current?.pointerId !==
      event.pointerId
    ) {
      return;
    }

    dragRef.current = null;
  };

  return (
    <div
      id="lineup-canvas"
      ref={fieldRef}
      className="relative isolate overflow-hidden rounded-[clamp(1rem,2.4vw,1.75rem)] border border-white/15 bg-[#06110d] shadow-[0_28px_90px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.16)] select-none"
    >
      <Image
        src="/assets/field.png"
        alt=""
        width={1672}
        height={941}
        preload
        sizes="(max-width: 1024px) 100vw, 70vw"
        draggable={false}
        className="block h-auto w-full object-cover object-center saturate-[0.82] contrast-[1.08] brightness-[0.78]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-15%,rgba(190,255,225,0.24),transparent_48%),linear-gradient(180deg,rgba(3,12,9,0.18)_0%,transparent_42%,rgba(0,5,3,0.5)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_4px)] opacity-25 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_clamp(45px,10vw,140px)_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.14)]" />
      <div className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-emerald-100/70 to-transparent shadow-[0_0_18px_rgba(167,243,208,0.6)]" />

      {players.map((player) => (
        <div
          key={player.id}
          onClick={() => swapWithBench(player)}
          onDragOver={(event) => {
            if (
              selectedBench?.team === player.team
            ) {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            swapWithBench(player);
          }}
          onPointerDown={(event) =>
            handlePointerDown(event, player.id)
          }
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={
            handlePointerEnd
          }
          style={{
            position: "absolute",
            left: `${player.x}%`,
            top: `${player.y}%`,
            transform:
              "translate3d(-50%, -50%, 0)",
            zIndex: 20,
            touchAction: "none",
          }}
          className="group cursor-grab [will-change:transform] outline-none transition-[scale,filter] duration-200 ease-out hover:scale-105 hover:brightness-110 active:cursor-grabbing active:scale-105"
        >
          <FieldPlayerCard player={player} />
        </div>
      ))}
    </div>
  );
}
