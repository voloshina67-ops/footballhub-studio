import { FormationName, FormationPreset } from "../types/formation";

export const FORMATIONS: Partial<Record<FormationName, FormationPreset>> = {

  "4-2-3-1": {
    name: "4-2-3-1",
    rows: [
      { players: 1 },
      { players: 4 },
      { players: 2 },
      { players: 3 },
      { players: 1 },
    ],
  },

  "4-3-3": {
    name: "4-3-3",
    rows: [
      { players: 1 },
      { players: 4 },
      { players: 3 },
      { players: 3 },
    ],
  },

  "4-4-2": {
    name: "4-4-2",
    rows: [
      { players: 1 },
      { players: 4 },
      { players: 4 },
      { players: 2 },
    ],
  },

  "3-4-2-1": {
    name: "3-4-2-1",
    rows: [
      { players: 1 },
      { players: 3 },
      { players: 4 },
      { players: 2 },
      { players: 1 },
    ],
  },

  "3-5-2": {
    name: "3-5-2",
    rows: [
      { players: 1 },
      { players: 3 },
      { players: 5 },
      { players: 2 },
    ],
  },

  "5-4-1": {
    name: "5-4-1",
    rows: [
      { players: 1 },
      { players: 5 },
      { players: 4 },
      { players: 1 },
    ],
  },

  unknown: {
    name: "unknown",
    rows: [],
  },
};