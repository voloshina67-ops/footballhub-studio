"use client";

import Image from "next/image";
import {
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useLineupStore } from "../store/lineupStore";

type DragState = {
  id: number;
  pointerId: number;
  fieldRect: DOMRect;
};

export default function FootballField() {
  const players = useLineupStore((s) => s.players);
  const movePlayer = useLineupStore((s) => s.movePlayer);

  const fieldRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

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
          <div className="flex flex-col items-center drop-shadow-[0_8px_14px_rgba(0,0,0,0.48)]">
            <div className="relative">
              <div
                className={
                  player.team === "home"
                    ? "absolute -inset-[clamp(0.2rem,0.6vw,0.4rem)] rounded-full bg-blue-400/25 blur-md transition-opacity duration-200 group-hover:opacity-100"
                    : "absolute -inset-[clamp(0.2rem,0.6vw,0.4rem)] rounded-full bg-rose-400/25 blur-md transition-opacity duration-200 group-hover:opacity-100"
                }
              />
              <Image
                src={player.photo}
                alt={player.name}
                width={80}
                height={80}
                draggable={false}
                className={
                  player.team === "home"
                    ? "relative h-[clamp(2.5rem,6vw,5rem)] w-[clamp(2.5rem,6vw,5rem)] rounded-full border-[clamp(2px,0.3vw,3px)] border-blue-300 bg-slate-100 object-cover shadow-[0_7px_18px_rgba(0,0,0,0.46),0_0_0_1px_rgba(255,255,255,0.65),0_0_24px_rgba(96,165,250,0.5)]"
                    : "relative h-[clamp(2.5rem,6vw,5rem)] w-[clamp(2.5rem,6vw,5rem)] rounded-full border-[clamp(2px,0.3vw,3px)] border-rose-300 bg-slate-100 object-cover shadow-[0_7px_18px_rgba(0,0,0,0.46),0_0_0_1px_rgba(255,255,255,0.65),0_0_24px_rgba(251,113,133,0.5)]"
                }
              />

              {player.number && (
                <div className="absolute -right-[clamp(0.15rem,0.5vw,0.3rem)] -top-[clamp(0.15rem,0.5vw,0.3rem)] flex h-[clamp(1.25rem,2.4vw,2rem)] min-w-[clamp(1.25rem,2.4vw,2rem)] items-center justify-center rounded-full border border-white/80 bg-white/90 px-1 text-[clamp(0.55rem,1.1vw,0.875rem)] font-black tabular-nums text-slate-950 shadow-[0_4px_14px_rgba(0,0,0,0.42),inset_0_1px_0_white] backdrop-blur-md">
                  {player.number}
                </div>
              )}
            </div>

            <div className="mt-[clamp(0.25rem,0.7vw,0.5rem)] max-w-[clamp(5rem,12vw,8.75rem)] truncate rounded-full border border-white/15 bg-slate-950/65 px-[clamp(0.4rem,1vw,0.75rem)] py-[clamp(0.15rem,0.35vw,0.25rem)] text-center text-[clamp(0.55rem,1.05vw,0.8125rem)] font-extrabold uppercase leading-none tracking-[0.04em] text-white shadow-[0_5px_16px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-md">
              {player.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
