import { create } from "zustand";

type Player = {
  id: string;
  name: string;
  number?: string;
  photo: string;
};

type FlashscoreState = {
  homePlayers: Player[];
  awayPlayers: Player[];

  homeSubs: Player[];
  awaySubs: Player[];

  setPlayers: (
    homePlayers: Player[],
    awayPlayers: Player[]
  ) => void;

  setSubs: (
    homeSubs: Player[],
    awaySubs: Player[]
  ) => void;
};

export const useFlashscoreStore =
  create<FlashscoreState>((set) => ({
    homePlayers: [],
    awayPlayers: [],

    homeSubs: [],
    awaySubs: [],

    setPlayers: (
      homePlayers,
      awayPlayers
    ) =>
      set({
        homePlayers,
        awayPlayers,
      }),

    setSubs: (
      homeSubs,
      awaySubs
    ) =>
      set({
        homeSubs,
        awaySubs,
      }),
  }));
