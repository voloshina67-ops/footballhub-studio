export type TeamSide = "home" | "away";

export interface PlayerImage {
  path: string;
}

export interface FieldPlayer {

  id: string;

  name: string;

  number: number;

  photo: string;

  side: TeamSide;

  x: number;

  y: number;

  captain?: boolean;

  goalkeeper?: boolean;
}

export interface FlashscorePlayer {

  id: string;

  number: number;

  fieldName?: string;

  listName?: string;

  images?: PlayerImage[];
}