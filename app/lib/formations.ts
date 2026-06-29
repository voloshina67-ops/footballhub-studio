export interface Position {
  x: number;
  y: number;
}

export const lineY: Record<number, number[]> = {
  1: [50],
  2: [35, 65],
  3: [22, 50, 78],
  4: [16, 38, 62, 84],
  5: [12, 31, 50, 69, 88],
};

export const rowX: Record<number, number[]> = {
  4: [46, 34, 22, 8],
  5: [46, 38, 30, 20, 8],
  6: [46, 40, 33, 26, 18, 8],
};

export const COMMON_FORMATIONS = {
  "4-3-3": [3, 3, 4, 1],
  "4-2-3-1": [1, 3, 2, 4, 1],
  "4-4-2": [2, 4, 4, 1],
  "3-5-2": [2, 5, 3, 1],
  "5-3-2": [2, 3, 5, 1],
} as const;

export type FormationName = keyof typeof COMMON_FORMATIONS;

export function getFormationRows(
  formation: string
): readonly number[] {
  return COMMON_FORMATIONS[
    formation as FormationName
  ] ?? COMMON_FORMATIONS["4-3-3"];
}

export function getPlayerPosition(
  side: "home" | "away",
  formationRows: number,
  rowIndex: number,
  playerCount: number,
  playerIndex: number
): Position {

  const layout =
    rowX[formationRows] ??
    rowX[4];

  const x =
    side === "home"
      ? layout[rowIndex]
      : 100 - layout[rowIndex];

  const positions =
    lineY[playerCount];

  const y =
    positions
      ? positions[playerIndex]
      : 15 + playerIndex * (70 / (playerCount - 1));

  return { x, y };
}