import { create } from "zustand";

type MatchStore = {
  homeTeam: string;
  awayTeam: string;

  homeLogo: string;
  awayLogo: string;

  setHome: (
    name: string,
    logo: string
  ) => void;

  setAway: (
    name: string,
    logo: string
  ) => void;

  setMatch: (
    homeTeam: string,
    awayTeam: string,
    homeLogo: string,
    awayLogo: string
  ) => void;
};

export const useMatchStore =
  create<MatchStore>((set) => ({
    homeTeam: "Spain",
    awayTeam: "France",

    homeLogo: "",
    awayLogo: "",

    setHome: (name, logo) =>
      set({
        homeTeam: name,
        homeLogo: logo,
      }),

    setAway: (name, logo) =>
      set({
        awayTeam: name,
        awayLogo: logo,
      }),

    setMatch: (
      homeTeam,
      awayTeam,
      homeLogo,
      awayLogo
    ) =>
      set({
        homeTeam,
        awayTeam,
        homeLogo,
        awayLogo,
      }),
  }));
