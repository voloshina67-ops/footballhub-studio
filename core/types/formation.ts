export type TeamSide = "home" | "away";

export type FormationName =
  | "3-4-2-1"
  | "3-4-3"
  | "3-5-2"
  | "4-1-4-1"
  | "4-2-3-1"
  | "4-3-3"
  | "4-4-2"
  | "4-5-1"
  | "5-3-2"
  | "5-4-1"
  | "unknown";

export interface FormationRow {
  players: number;
}

export interface FormationPreset {
  name: FormationName;
  rows: FormationRow[];
}