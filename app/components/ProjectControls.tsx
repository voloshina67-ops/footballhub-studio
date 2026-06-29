"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  COMMON_FORMATIONS,
  type FormationName,
} from "../lib/formations";
import {
  type FieldPlayer,
  useLineupStore,
} from "../store/lineupStore";
import { useMatchStore } from "../store/matchStore";
import { useFormationStore } from "../store/formationStore";
import {
  type FlashscorePlayer,
  useFlashscoreStore,
} from "../store/flashscoreStore";

type SavedProject = {
  version: 1;
  match: {
    homeTeam: string;
    awayTeam: string;
    homeLogo: string;
    awayLogo: string;
  };
  formations: {
    home: FormationName;
    away: FormationName;
  };
  players: FieldPlayer[];
  bench: {
    home: FlashscorePlayer[];
    away: FlashscorePlayer[];
  };
};

const isObject = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isString = (value: unknown): value is string =>
  typeof value === "string";

const isFiniteNumber = (
  value: unknown
): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isImageSource = (value: unknown): value is string => {
  if (!isString(value)) return false;
  if (!value) return true;

  return (
    value.startsWith("/") ||
    value.startsWith("https://") ||
    value.startsWith("http://")
  );
};

function normalizeNumber(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (isString(value)) return value;

  if (
    isFiniteNumber(value) &&
    Number.isInteger(value)
  ) {
    return String(value);
  }

  return null;
}

const isFormationName = (
  value: unknown
): value is FormationName =>
  isString(value) && value in COMMON_FORMATIONS;

function validatePlayer(
  value: unknown
): FieldPlayer | null {
  if (!isObject(value)) return null;

  const id = value.id;
  const name = value.name;
  const number = value.number;
  const photo = value.photo;
  const team = value.team;
  const x = value.x;
  const y = value.y;
  const normalizedNumber = normalizeNumber(number);

  if (
    !isFiniteNumber(id) ||
    !isString(name) ||
    normalizedNumber === null ||
    !isImageSource(photo) ||
    !(team === "home" || team === "away") ||
    !isFiniteNumber(x) ||
    !isFiniteNumber(y)
  ) {
    return null;
  }

  return {
    id,
    name,
    number: normalizedNumber,
    photo,
    team,
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}

function validateBenchPlayer(
  value: unknown
): FlashscorePlayer | null {
  if (!isObject(value)) return null;

  const id = value.id;
  const name = value.name;
  const number = normalizeNumber(value.number);
  const photo = value.photo;

  if (
    !(isString(id) || isFiniteNumber(id)) ||
    !isString(name) ||
    number === null ||
    !isImageSource(photo)
  ) {
    return null;
  }

  return {
    id: String(id),
    name,
    number,
    photo,
  };
}

function parseBenchPlayers(value: unknown) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return null;

  const players = value.map(validateBenchPlayer);

  if (players.some((player) => !player)) {
    return null;
  }

  return players as FlashscorePlayer[];
}

function parseProject(
  value: unknown
): SavedProject | null {
  if (!isObject(value)) return null;

  const match = value.match;
  const formations = value.formations;
  const players = value.players;
  const bench = value.bench;

  if (
    !isObject(match) ||
    !isObject(formations) ||
    !Array.isArray(players)
  ) {
    return null;
  }

  if (
    !isString(match.homeTeam) ||
    !isString(match.awayTeam) ||
    !isImageSource(match.homeLogo) ||
    !isImageSource(match.awayLogo)
  ) {
    return null;
  }

  const parsedPlayers = players.map(validatePlayer);
  const parsedHomeBench = isObject(bench)
    ? parseBenchPlayers(bench.home)
    : [];
  const parsedAwayBench = isObject(bench)
    ? parseBenchPlayers(bench.away)
    : [];

  if (
    parsedPlayers.some((player) => !player) ||
    !parsedHomeBench ||
    !parsedAwayBench
  ) {
    return null;
  }

  return {
    version: 1,
    match: {
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeLogo: match.homeLogo,
      awayLogo: match.awayLogo,
    },
    formations: {
      home: isFormationName(formations.home)
        ? formations.home
        : "4-3-3",
      away: isFormationName(formations.away)
        ? formations.away
        : "4-3-3",
    },
    players: parsedPlayers as FieldPlayer[],
    bench: {
      home: parsedHomeBench,
      away: parsedAwayBench,
    },
  };
}

function downloadJson(project: SavedProject) {
  const data = JSON.stringify(project, null, 2);
  const blob = new Blob([data], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `footballhub-project-${Date.now()}.json`;
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function ProjectControls() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const players = useLineupStore((state) => state.players);
  const setPlayers = useLineupStore((state) => state.setPlayers);
  const setMatch = useMatchStore((state) => state.setMatch);
  const homeTeam = useMatchStore((state) => state.homeTeam);
  const awayTeam = useMatchStore((state) => state.awayTeam);
  const homeLogo = useMatchStore((state) => state.homeLogo);
  const awayLogo = useMatchStore((state) => state.awayLogo);
  const homeFormation = useFormationStore(
    (state) => state.homeFormation
  );
  const awayFormation = useFormationStore(
    (state) => state.awayFormation
  );
  const setFormations = useFormationStore(
    (state) => state.setFormations
  );
  const homeSubs = useFlashscoreStore((state) => state.homeSubs);
  const awaySubs = useFlashscoreStore((state) => state.awaySubs);
  const setFlashPlayers = useFlashscoreStore(
    (state) => state.setPlayers
  );
  const setSubs = useFlashscoreStore((state) => state.setSubs);
  const canSave = players.length > 0;

  const handleSave = () => {
    if (!canSave) {
      setMessage("Import or add players before saving.");
      return;
    }

    downloadJson({
      version: 1,
      match: {
        homeTeam,
        awayTeam,
        homeLogo,
        awayLogo,
      },
      formations: {
        home: homeFormation,
        away: awayFormation,
      },
      players,
      bench: {
        home: homeSubs,
        away: awaySubs,
      },
    });
    setMessage("Project saved.");
  };

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (!file) return;

    try {
      const project = parseProject(
        JSON.parse(await file.text())
      );

      if (!project) {
        setMessage("Invalid project file.");
        return;
      }

      setMatch(
        project.match.homeTeam,
        project.match.awayTeam,
        project.match.homeLogo,
        project.match.awayLogo
      );
      setFormations(
        project.formations.home,
        project.formations.away
      );
      setPlayers(project.players);
      setFlashPlayers(
        project.players
          .filter((player) => player.team === "home")
          .map((player) => ({
            id: String(player.id),
            name: player.name,
            number: player.number,
            photo: player.photo,
          })),
        project.players
          .filter((player) => player.team === "away")
          .map((player) => ({
            id: String(player.id),
            name: player.name,
            number: player.number,
            photo: player.photo,
          }))
      );
      setSubs(project.bench.home, project.bench.away);
      setMessage("Project loaded.");
    } catch {
      setMessage("Invalid project file.");
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-emerald-100/70">
          Project
        </div>
        {message && (
          <div className="mt-1 text-xs font-semibold text-white/55">
            {message}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="rounded-xl border border-blue-100/15 bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-white/35"
        >
          SAVE PROJECT
        </button>
        <button
          type="button"
          onClick={handleLoadClick}
          className="rounded-xl border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-white/[0.14]"
        >
          LOAD PROJECT
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
