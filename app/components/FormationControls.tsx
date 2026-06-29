"use client";

import { type ChangeEvent } from "react";
import {
  COMMON_FORMATIONS,
  type FormationName,
  getFormationRows,
  getPlayerPosition,
} from "../lib/formations";
import {
  type FieldPlayer,
  useLineupStore,
} from "../store/lineupStore";
import { useFormationStore } from "../store/formationStore";

const FORMATION_OPTIONS = Object.keys(
  COMMON_FORMATIONS
) as FormationName[];

type TeamSide = FieldPlayer["team"];

type FormationSelectProps = {
  label: string;
  side: TeamSide;
};

function sortPlayersByCurrentLine(
  players: FieldPlayer[],
  side: TeamSide
) {
  return [...players].sort((a, b) => {
    const lineA = side === "home" ? -a.x : a.x;
    const lineB = side === "home" ? -b.x : b.x;

    if (lineA !== lineB) {
      return lineA - lineB;
    }

    return a.y - b.y;
  });
}

function applyFormation(
  players: FieldPlayer[],
  side: TeamSide,
  formation: string
) {
  const formationRows = getFormationRows(formation);
  const teamPlayers = sortPlayersByCurrentLine(
    players.filter((player) => player.team === side),
    side
  );
  const positionedPlayers = new Map<number, FieldPlayer>();
  let playerOffset = 0;

  formationRows.forEach((playerCount, rowIndex) => {
    const rowPlayers = teamPlayers.slice(
      playerOffset,
      playerOffset + playerCount
    );

    rowPlayers.forEach((player, playerIndex) => {
      const { x, y } = getPlayerPosition(
        side,
        formationRows.length,
        rowIndex,
        rowPlayers.length,
        playerIndex
      );

      positionedPlayers.set(player.id, {
        ...player,
        x,
        y,
      });
    });

    playerOffset += playerCount;
  });

  if (playerOffset < teamPlayers.length) {
    const remainingPlayers = teamPlayers.slice(playerOffset);
    const lastRowIndex = formationRows.length - 1;

    remainingPlayers.forEach((player, playerIndex) => {
      const { x, y } = getPlayerPosition(
        side,
        formationRows.length,
        lastRowIndex,
        remainingPlayers.length,
        playerIndex
      );

      positionedPlayers.set(player.id, {
        ...player,
        x,
        y,
      });
    });
  }

  return players.map((player) =>
    positionedPlayers.get(player.id) ?? player
  );
}

function FormationSelect({ label, side }: FormationSelectProps) {
  const players = useLineupStore((state) => state.players);
  const setPlayers = useLineupStore((state) => state.setPlayers);
  const selectedFormation = useFormationStore((state) =>
    side === "home"
      ? state.homeFormation
      : state.awayFormation
  );
  const setFormation = useFormationStore(
    (state) => state.setFormation
  );
  const teamPlayerCount = players.filter(
    (player) => player.team === side
  ).length;

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const formation = event.currentTarget.value;

    if (!(formation in COMMON_FORMATIONS)) return;

    setFormation(side, formation as FormationName);
    setPlayers(
      applyFormation(players, side, formation)
    );
  };

  return (
    <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
      <span className="shrink-0 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
      <select
        onChange={handleChange}
        disabled={!teamPlayerCount}
        value={selectedFormation}
        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-extrabold text-white outline-none transition focus:border-emerald-200/50 disabled:cursor-not-allowed disabled:text-white/35"
      >
        {FORMATION_OPTIONS.map((formation) => (
          <option key={formation} value={formation}>
            {formation}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FormationControls() {
  return (
    <div className="mb-4 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
      <div className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-100/70">
        Formation
      </div>

      <div className="flex flex-col gap-2 lg:flex-row">
        <FormationSelect label="Home" side="home" />
        <FormationSelect label="Away" side="away" />
      </div>
    </div>
  );
}
