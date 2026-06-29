import { create } from "zustand";

export type FieldPlayer = {
  id: number;
  name: string;
  number?: string;
  photo: string;
  team: "home" | "away";
  captain?: boolean;
  isCaptain?: boolean;
  goalkeeper?: boolean;
  isGoalkeeper?: boolean;
  x: number;
  y: number;
};

type Store = {
  players: FieldPlayer[];

  addPlayer: (
    name: string,
    photo: string,
    team: "home" | "away"
  ) => void;

  movePlayer: (
    id: number,
    x: number,
    y: number
  ) => void;

  setPlayers: (
    players: FieldPlayer[]
  ) => void;
};

export const useLineupStore = create<Store>((set) => ({
  players: [],

  addPlayer: (name, photo, team) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          id: Date.now() + Math.random(),
          name,
          photo,
          team,
          x: team === "home" ? 25 : 75,
          y: 50,
        },
      ],
    })),

  movePlayer: (id, x, y) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id
          ? { ...p, x, y }
          : p
      ),
    })),

  setPlayers: (players) =>
    set({ players }),
}));
