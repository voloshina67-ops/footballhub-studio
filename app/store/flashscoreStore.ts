import { create } from "zustand";

export type FlashscorePlayer = {
  id: string;
  name: string;
  number?: string;
  photo: string;
};

type FlashscoreState = {
  homePlayers: FlashscorePlayer[];
  awayPlayers: FlashscorePlayer[];

  homeSubs: FlashscorePlayer[];
  awaySubs: FlashscorePlayer[];

  setPlayers: (
    homePlayers: FlashscorePlayer[],
    awayPlayers: FlashscorePlayer[]
  ) => void;

  setSubs: (
    homeSubs: FlashscorePlayer[],
    awaySubs: FlashscorePlayer[]
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
