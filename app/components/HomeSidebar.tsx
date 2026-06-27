"use client";

import { useEffect, useState } from "react";
import { useLineupStore } from "../store/lineupStore";
import { useMatchStore } from "../store/matchStore";
import { teams } from "../data/teams";

export default function HomeSidebar() {
  const [team, setTeam] = useState("real-madrid");
  const [players, setPlayers] = useState<any[]>([]);
  const [showPlayers, setShowPlayers] = useState(false);

  const addPlayer = useLineupStore((s) => s.addPlayer);
  const setPlayersOnField = useLineupStore(
    (s: any) => s.setPlayers
  );

  const setHome =
    useMatchStore((s) => s.setHome);

  useEffect(() => {
    fetch(`/api/team/${team}`)
      .then((r) => r.json())
      .then((data) => {
        setPlayers(data.players || []);

        setHome(
          data.name || team,
          data.logo || ""
        );
      })
      .catch(console.error);
  }, [team, setHome]);

  const auto433 = () => {
    const gk = players.find(
      (p) => p.position === "Goalkeeper"
    );

    const lb = players.find(
      (p) => p.position === "Left-Back"
    );

    const rb = players.find(
      (p) => p.position === "Right-Back"
    );

    const cbs = players
      .filter(
        (p) => p.position === "Centre-Back"
      )
      .slice(0, 2);

    const dm = players.find(
      (p) => p.position === "Defensive Midfield"
    );

    const cms = players
      .filter(
        (p) => p.position === "Central Midfield"
      )
      .slice(0, 2);

    const lw = players.find(
      (p) => p.position === "Left Winger"
    );

    const rw = players.find(
      (p) => p.position === "Right Winger"
    );

    const st = players.find(
      (p) => p.position === "Centre-Forward"
    );

    const lineupPlayers = [
      gk,
      lb,
      cbs[0],
      cbs[1],
      rb,
      dm,
      cms[0],
      cms[1],
      lw,
      st,
      rw,
    ].filter(Boolean);

    const coords = [
      { x: 50, y: 88 },
      { x: 20, y: 76 },
      { x: 40, y: 78 },
      { x: 60, y: 78 },
      { x: 80, y: 76 },
      { x: 50, y: 68 },
      { x: 35, y: 60 },
      { x: 65, y: 60 },
      { x: 20, y: 54 },
      { x: 50, y: 52 },
      { x: 80, y: 54 },
    ];

    const lineup = lineupPlayers.map(
      (p: any, i: number) => ({
        id: Date.now() + i,
        name: p.name,
        photo: p.photo,
        team: "home",
        x: coords[i].x,
        y: coords[i].y,
      })
    );

    setPlayersOnField(lineup);
  };

  return (
    <div>
      <div className="mb-4 text-xl font-semibold uppercase tracking-[3px] text-white/95">
        Select Team
      </div>

      <div className="w-[320px] rounded-2xl border border-white/10 bg-[#0b1727] p-3">


        <div className="mb-4 space-y-1">
          {teams.map((t) => (
            <div
              key={t.slug}
              onClick={() => {
                setTeam(t.slug);
                setShowPlayers(true);
              }}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-[#101f34] p-2 hover:bg-[#162a45]"
            >
              <img
                src={t.logo}
                className="h-8 w-8 object-contain"
              />

              <div className="text-sm text-white">
                {t.name}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={auto433}
          className="mb-4 w-full rounded-lg bg-green-600 p-3 font-bold text-white"
        >
          ⚽ Auto 4-3-3
        </button>

        {showPlayers && (
          <div className="max-h-[720px] space-y-1 overflow-y-auto pr-1">

            {players.map((player) => (
              <div
                key={player.id}
                onClick={() =>
                  addPlayer(
                    player.name,
                    player.photo,
                    "home"
                  )
                }
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-[#101f34] p-2 hover:bg-[#162a45]"
              >
                <img
                  src={player.photo}
                  className="h-10 w-10 rounded-full"
                />

                <div>
                  <div className="text-white">
                    {player.name}
                  </div>

                  <div className="text-xs text-zinc-400">
                    {player.position}
                  </div>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}
