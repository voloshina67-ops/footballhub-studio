"use client";

import {
  type ChangeEvent,
} from "react";
import {
  type FieldPlayer,
  useLineupStore,
} from "../store/lineupStore";

type TeamSide = FieldPlayer["team"];

type RoleSelectProps = {
  label: string;
  side: TeamSide;
  role: "captain" | "goalkeeper";
  players: FieldPlayer[];
  selectedId: number | "";
  onSelect: (
    side: TeamSide,
    role: "captain" | "goalkeeper",
    playerId: number | ""
  ) => void;
};

function hasCaptain(player: FieldPlayer) {
  return player.captain === true || player.isCaptain === true;
}

function hasGoalkeeper(player: FieldPlayer) {
  return (
    player.goalkeeper === true ||
    player.isGoalkeeper === true
  );
}

function RoleSelect({
  label,
  side,
  role,
  players,
  selectedId,
  onSelect,
}: RoleSelectProps) {
  const handleChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.currentTarget.value;
    onSelect(
      side,
      role,
      value ? Number(value) : ""
    );
  };

  return (
    <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
      <span className="shrink-0 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
      <select
        value={selectedId}
        onChange={handleChange}
        disabled={!players.length}
        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-extrabold text-white outline-none transition focus:border-emerald-200/50 disabled:cursor-not-allowed disabled:text-white/35"
      >
        <option value="">None</option>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.number ? `#${player.number} ` : ""}
            {player.name || "Player"}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function PlayerRoleControls() {
  const players = useLineupStore((state) => state.players);
  const setPlayers = useLineupStore((state) => state.setPlayers);
  const homePlayers = players.filter(
    (player) => player.team === "home"
  );
  const awayPlayers = players.filter(
    (player) => player.team === "away"
  );

  const selectedHomeCaptain =
    homePlayers.find(hasCaptain)?.id ?? "";
  const selectedAwayCaptain =
    awayPlayers.find(hasCaptain)?.id ?? "";
  const selectedHomeGoalkeeper =
    homePlayers.find(hasGoalkeeper)?.id ?? "";
  const selectedAwayGoalkeeper =
    awayPlayers.find(hasGoalkeeper)?.id ?? "";

  const handleSelect = (
    side: TeamSide,
    role: "captain" | "goalkeeper",
    playerId: number | ""
  ) => {
    setPlayers(
      players.map((player) => {
        if (player.team !== side) return player;

        const isSelected = player.id === playerId;

        if (role === "captain") {
          return {
            ...player,
            captain: isSelected,
            isCaptain: isSelected,
          };
        }

        return {
          ...player,
          goalkeeper: isSelected,
          isGoalkeeper: isSelected,
        };
      })
    );
  };

  return (
    <div className="mb-4 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
      <div className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-100/70">
        Roles
      </div>

      <div className="grid gap-2 xl:grid-cols-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <RoleSelect
            label="Home C"
            side="home"
            role="captain"
            players={homePlayers}
            selectedId={selectedHomeCaptain}
            onSelect={handleSelect}
          />
          <RoleSelect
            label="Home GK"
            side="home"
            role="goalkeeper"
            players={homePlayers}
            selectedId={selectedHomeGoalkeeper}
            onSelect={handleSelect}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <RoleSelect
            label="Away C"
            side="away"
            role="captain"
            players={awayPlayers}
            selectedId={selectedAwayCaptain}
            onSelect={handleSelect}
          />
          <RoleSelect
            label="Away GK"
            side="away"
            role="goalkeeper"
            players={awayPlayers}
            selectedId={selectedAwayGoalkeeper}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}
