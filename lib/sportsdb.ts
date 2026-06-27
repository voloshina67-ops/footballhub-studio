const API_KEY = process.env.SPORTSDB_API_KEY;

export async function searchTeam(team: string) {
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${API_KEY}/searchteams.php?t=${encodeURIComponent(team)}`
  );

  const text = await res.text();

  try {
    return JSON.parse(text).teams?.[0] || null;
  } catch {
    console.log("TEAM API ERROR:", text);
    return null;
  }
}

export async function getPlayers(team: string) {
  const res = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${API_KEY}/searchplayers.php?t=${encodeURIComponent(team)}`
  );

  const text = await res.text();

  try {
    return JSON.parse(text).player || [];
  } catch {
    console.log("PLAYER API ERROR:", text);
    return [];
  }
}
