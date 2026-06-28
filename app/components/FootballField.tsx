"use client";

import { useRef } from "react";
import { useLineupStore } from "../store/lineupStore";
import DraggablePlayer from "./DraggablePlayer";

export default function FootballField() {
  const players = useLineupStore((s) => s.players);
  const movePlayer = useLineupStore((s) => s.movePlayer);

  const fieldRef = useRef<HTMLDivElement>(null);

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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />

      {players.map((player) => (
        <DraggablePlayer
          key={player.id}
          player={player}
          fieldRef={fieldRef}
          onMove={movePlayer}
        />
      ))}
    </div>
  );
}
