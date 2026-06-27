"use client";

import { useEffect, useState } from "react";
import { useLineupStore } from "../store/lineupStore";

type Player = {
  id: number;
  name: string;
  position: string;
  photo: string;
};

export default function TeamSidebar() {
  const [team, setTeam] = useState("real-madrid");
  const [players, setLocalPlayers] = useState<Player[]>([]);

  const addPlayer = useLineupStore(
    (s: any) => s.addPlayer
  );

  const setPlayers = useLineupStore(
    (s: any) => s.setPlayers
  );

  useEffect(() => {
    fetch(`/api/team/${team}`)
      .then((r) => r.json())
      .then((data) => {
        setLocalPlayers(data.players || []);
      });
  }, [team]);

  const auto433 = () => {
    const gk = players.find(
      (p) => p.position === "Goalkeeper"
    );

    const cbs = players.filter(
      (p) => p.position === "Centre-Back"
    );

    const lb = players.find(
      (p) => p.position === "Left-Back"
    );

    const dm = players.find(
      (p) => p.position === "Defensive Midfield"
    );

    const cms = players.filter(
      (p) => p.position === "Central Midfield"
    );

    const cams = players.filter(
      (p) => p.position === "Attacking Midfield"
    );

    const lw = players.find(
      (p) => p.position === "Left Winger"
    );

    const rw = players.find(
      (p) => p.position === "Right Winger"
    );

    const st = players.find(
      (p) => p.position === "Centre-Forward"
    );

    const lineup = [
      gk && {
        id: Date.now() + 1,
        name: gk.name,
        photo: gk.photo,
        team: "home",
        x: 50,
        y: 92,
      },

      lb && {
        id: Date.now() + 2,
        name: lb.name,
        photo: lb.photo,
        team: "home",
        x: 18,
        y: 75,
      },

      cbs[0] && {
        id: Date.now() + 3,
        name: cbs[0].name,
        photo: cbs[0].photo,
        team: "home",
        x: 38,
        y: 78,
      },

      cbs[1] && {
        id: Date.now() + 4,
        name: cbs[1].name,
        photo: cbs[1].photo,
        team: "home",
        x: 62,
        y: 78,
      },

      cbs[2] && {
        id: Date.now() + 5,
        name: cbs[2].name,
        photo: cbs[2].photo,
        team: "home",
        x: 82,
        y: 75,
      },

      dm && {
        id: Date.now() + 6,
        name: dm.name,
        photo: dm.photo,
        team: "home",
        x: 50,
        y: 60,
      },

      cms[0] && {
        id: Date.now() + 7,
        name: cms[0].name,
        photo: cms[0].photo,
        team: "home",
        x: 32,
        y: 50,
      },

      cms[1] && {
        id: Date.now() + 8,
        name: cms[1].name,
        photo: cms[1].photo,
        team: "home",
        x: 68,
        y: 50,
      },

      lw && {
        id: Date.now() + 9,
        name: lw.name,
        photo: lw.photo,
        team: "home",
        x: 18,
        y: 25,
      },

      st && {
        id: Date.now() + 10,
        name: st.name,
        photo: st.photo,
        team: "home",
        x: 50,
        y: 18,
      },

      rw && {
        id: Date.now() + 11,
        name: rw.name,
        photo: rw.photo,
        team: "home",
        x: 82,
        y: 25,
      },
    ].filter(Boolean);

    setPlayers(lineup);
  };

  return (
    <div className="w-[320px] rounded-2xl bg-[#0f1f35] p-4">
      <input
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="mb-4 w-full rounded-lg bg-[#172b47] p-3 text-white"
      />

      <button
        onClick={auto433}
        className="mb-4 w-full rounded-lg bg-green-600 p-3 font-bold text-white hover:bg-green-700"
      >
        ⚽ Auto 4-3-3
      </button>

      <div className="mb-3 text-sm text-zinc-400">
        Игроков: {players.length}
      </div>

      <div className="space-y-2">
        {players.map((player) => (
          <button
            key={player.id}
            onClick={() =>
              addPlayer(
                player.name,
                player.photo,
                "home"
              )
            }
            className="flex w-full items-center gap-3 rounded-lg bg-[#172b47] p-2 text-left hover:bg-[#27466f]"
          >
            <img
              src={player.photo}
              alt={player.name}
              className="h-12 w-12 rounded-full bg-white object-cover"
            />

            <div>
              <div className="text-white">
                {player.name}
              </div>

              <div className="text-xs text-zinc-400">
                {player.position}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
