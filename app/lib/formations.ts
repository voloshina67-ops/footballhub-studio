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