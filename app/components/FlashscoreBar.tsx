"use client";

import { useState } from "react";
import { useMatchStore } from "../store/matchStore";
import { useLineupStore } from "../store/lineupStore";
import { useFlashscoreStore } from "../store/flashscoreStore";


function getTeamFlag(team: any) {
  const logos = team?.lineup?.coaches?.players?.[0]?.teamLogo || team?.lineup?.players?.[0]?.teamLogo || [];

  console.log("TEAM:", team?.name, JSON.stringify(logos, null, 2));

  const flag = logos.find((l: any) => l.variantType === 15)?.path || logos[0]?.path;

  const url = flag
    ? `https://static.flashscore.com/res/image/data/${flag}`
    : "";

  console.log("FLAG URL:", team?.name, url);

  return url;
}

export default function FlashscoreBar() {
  const [url, setUrl] = useState("");

  const setMatch = useMatchStore((s) => s.setMatch);
  const setPlayers = useLineupStore((s) => s.setPlayers);

  const setFlashPlayers = useFlashscoreStore((s) => s.setPlayers);
  const setSubs = useFlashscoreStore((s) => s.setSubs);

  const loadMatch = async () => {
    try {
      const match = url.match(/mid=([A-Za-z0-9]+)/);

      if (!match) {
        alert("Не найден mid=");
        return;
      }

      const eventId = match[1];

      const res = await fetch(
        `/api/flashscore/${eventId}`
      );

      const json = await res.json();

      const event = json.data.findEventById;

      const home = event.eventParticipants.find(
        (p: any) => p.type.side === "HOME"
      );

      const away = event.eventParticipants.find(
        (p: any) => p.type.side === "AWAY"
      );

console.log("HOME FLAG:", getTeamFlag(home));
console.log("AWAY FLAG:", getTeamFlag(away));

setMatch(
  home.name,
  away.name,
  getTeamFlag(home),
  getTeamFlag(away)
);



      const fieldPlayers: any[] = [];

      const buildTeam = (
        teamData: any,
        side: "home" | "away",
        xMap: number[]
      ) => {

        if (!teamData?.lineup?.formation?.lines?.[0]?.rows) {
          console.log("NO FORMATION:", teamData.name);
          return;
        }

        const formation =
          side === "home"
            ? [...teamData.lineup.formation.lines[0].rows].reverse()
            : teamData.lineup.formation.lines[0].rows;

        console.log("FORMATION:", teamData.name, formation.map((r:any)=>r.playerIds.length));
        formation.forEach((r:any,i:number)=>console.log("ROW", teamData.name, i, r.playerIds));

        const players =
          teamData.lineup.players;

        formation.forEach(
          (row: any, rowIndex: number) => {

            const count =
              row.playerIds.length;

            const playerIds =
              side === "home"
                ? [...row.playerIds].reverse()
                : row.playerIds;

            playerIds.forEach(
              (
                playerId: string,
                playerIndex: number
              ) => {

                const player =
                  players.find(
                    (p: any) =>
                      p.id === playerId
                  );

                if (!player) return;


                const photo =
                  player.images?.[player.images.length - 1]?.path
                    ? `https://static.flashscore.com/res/image/data/${player.images[player.images.length - 1].path}`
                    : "/player-placeholder.png";

                const rowX: Record<number, number[]> = {
                  4: [46, 34, 22, 8],
                  5: [46, 38, 30, 20, 8],
                  6: [46, 40, 33, 26, 18, 8],
                };

                const layout =
                  rowX[formation.length] ??
                  [46, 34, 22, 8];

                const x =
                  side === "home"
                    ? layout[rowIndex]
                    : 100 - layout[rowIndex];

                const linePositions: Record<number, number[]> = {
                  1: [50],
                  2: [32, 68],
                  3: [22, 50, 78],
                  4: [16, 38, 62, 84],
                  5: [12, 31, 50, 69, 88],
                };

                const y =
                  linePositions[count]?.[playerIndex] ??
                  (15 + playerIndex * (70 / (count - 1)));

                fieldPlayers.push({
                  id: Date.now() + Math.random(),
                  name: player.fieldName || player.listName,
                  number: player.number,
                  photo,
                  team: side,
                  x,
                  y,
                });
              }
            );
          }
        );
      };

      buildTeam(
        home,
        "home",
        [8, 20, 35, 50, 68]
      );

      buildTeam(
        away,
        "away",
        [92, 80, 65, 50, 32]
      );

      const homePlayers =
        home.lineup.players
          .slice(0, 11)
          .map((p: any) => ({
            id: p.id,
            number: p.number,
            name:
              p.fieldName ||
              p.listName,
            photo:
              p.images?.[0]?.path
                ? `https://static.flashscore.com/res/image/data/${p.images[0].path}`
                : "/player-placeholder.png",
          }));

      const awayPlayers =
        away.lineup.players
          .slice(0, 11)
          .map((p: any) => ({
            id: p.id,
            number: p.number,
            name:
              p.fieldName ||
              p.listName,
            photo:
              p.images?.[0]?.path
                ? `https://static.flashscore.com/res/image/data/${p.images[0].path}`
                : "/player-placeholder.png",
          }));

      const homeSubs =
        home.lineup.players
          .slice(11)
          .map((p: any) => ({
            id: p.id,
            number: p.number,
            name: p.fieldName || p.listName,
            photo: p.images?.[0]?.path
              ? `https://static.flashscore.com/res/image/data/${p.images[0].path}`
              : "/player-placeholder.png",
          }));

      const awaySubs =
        away.lineup.players
          .slice(11)
          .map((p: any) => ({
            id: p.id,
            number: p.number,
            name: p.fieldName || p.listName,
            photo: p.images?.[0]?.path
              ? `https://static.flashscore.com/res/image/data/${p.images[0].path}`
              : "/player-placeholder.png",
          }));

      setSubs(homeSubs, awaySubs);

      setFlashPlayers(
        homePlayers,
        awayPlayers
      );

      setPlayers(fieldPlayers);

      console.log(
        "Imported",
        fieldPlayers.length,
        "players"
      );

    } catch (e) {
      console.error(e);
      alert("Ошибка импорта");
    }
  };

  return (
    <div className="mb-4 flex gap-3 rounded-2xl border border-white/10 bg-[#08152a] p-4">

      <input
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        placeholder="Flashscore URL..."
        className="flex-1 rounded-xl border border-white/10 bg-[#0b1727] px-4 py-3 text-white"
      />

      <button
        onClick={loadMatch}
        className="rounded-xl bg-green-600 px-6 font-bold text-white"
      >
        IMPORT LINEUP
      </button>

    </div>
  );
}
