import { create } from "zustand";
import { type FormationName } from "../lib/formations";

type FormationStore = {
  homeFormation: FormationName;
  awayFormation: FormationName;

  setFormation: (
    side: "home" | "away",
    formation: FormationName
  ) => void;

  setFormations: (
    homeFormation: FormationName,
    awayFormation: FormationName
  ) => void;
};

export const useFormationStore =
  create<FormationStore>((set) => ({
    homeFormation: "4-3-3",
    awayFormation: "4-3-3",

    setFormation: (side, formation) =>
      set(
        side === "home"
          ? { homeFormation: formation }
          : { awayFormation: formation }
      ),

    setFormations: (
      homeFormation,
      awayFormation
    ) =>
      set({
        homeFormation,
        awayFormation,
      }),
  }));
