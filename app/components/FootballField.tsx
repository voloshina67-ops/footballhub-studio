"use client";

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
      className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.45)]"
    >
     <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: "url('/assets/field.png')",
  }}
/>

<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]"></div>

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
              "translate(-50%, -50%)",
            zIndex: 9999,
            touchAction: "none",
          }}
          className="cursor-grab transition-transform hover:scale-110"
        >
          <div className="flex flex-col items-center">

            <div className="relative">

              <img
                src={player.photo}
                alt={player.name}
                draggable={false}
                className={
                  player.team === "home"
                    ? "h-20 w-20 rounded-full border-[3px] border-blue-400 bg-white shadow-[0_0_20px_rgba(96,165,250,0.75)]"
                    : "h-20 w-20 rounded-full border-[3px] border-red-400 bg-white shadow-[0_0_20px_rgba(248,113,113,0.75)]"
                }
              />

              {player.number && (
                <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-sm font-black text-black shadow-xl">
                  {player.number}
                </div>
              )}

            </div>

            <div className="mt-2 max-w-[140px] text-center text-[13px] font-extrabold uppercase leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{" "}{player.name}{" "}</div>

          </div>
        </div>
      ))}
    </div>
  );
}
