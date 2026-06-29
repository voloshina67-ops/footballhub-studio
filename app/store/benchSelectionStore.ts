import { create } from "zustand";

export type BenchSelection = {
  id: string;
  team: "home" | "away";
};

type BenchSelectionStore = {
  selectedBench: BenchSelection | null;

  selectBench: (selection: BenchSelection) => void;
  clearBench: () => void;
};

export const useBenchSelectionStore =
  create<BenchSelectionStore>((set) => ({
    selectedBench: null,

    selectBench: (selection) =>
      set({ selectedBench: selection }),

    clearBench: () => set({ selectedBench: null }),
  }));
