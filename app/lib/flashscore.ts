export type MatchPlayer = {
  name: string;
  photo?: string;
  position?: string;
};

export type MatchLineup = {
  homeTeam: string;
  awayTeam: string;
  homePlayers: MatchPlayer[];
  awayPlayers: MatchPlayer[];
};

export async function getMatchLineup(
  url: string
): Promise<MatchLineup> {
  throw new Error("Not implemented");
}
