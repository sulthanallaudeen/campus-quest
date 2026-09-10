import React from 'react';
import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import { api, getStudentId } from "../services/api.js";

export default function TeamsPage() {
  const [teams, setTeams] = useState(null);
  const [newTeam, setNewTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  async function loadTeams() {
    const response = await api.get("/teams");
    setTeams(response.data);
  }

  useEffect(() => {
    loadTeams();
  }, []);

  async function createTeam(event) {
    event.preventDefault();
    if (!newTeam.trim()) return;
    const response = await api.post("/teams", { name: newTeam });
    setNewTeam("");
    await api.post(`/teams/${response.data.id}/join`, { studentId: getStudentId() });
    loadTeams();
  }

  async function join(teamId) {
    await api.post(`/teams/${teamId}/join`, { studentId: getStudentId() });
    loadTeams();
  }

  async function viewTeam(teamId) {
    const response = await api.get(`/teams/${teamId}`);
    setSelectedTeam(response.data);
  }

  if (!teams) return <Loading />;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-200">Team arena</p>
        <h1 className="mt-2 text-4xl font-black">Create, Join, Compete</h1>
      </div>
      <form onSubmit={createTeam} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 md:flex-row">
        <input value={newTeam} onChange={(event) => setNewTeam(event.target.value)} placeholder="New team name" className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-teal-300 focus:ring-2" />
        <button className="rounded-xl bg-teal-300 px-5 py-3 font-black text-slate-950">Create Team</button>
      </form>
      <div className="grid gap-5 lg:grid-cols-3">
        {teams.map((team, index) => (
          <div key={team.id} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-sm text-teal-200">Team Rank #{index + 1}</p>
                <h2 className="mt-1 text-2xl font-bold">{team.name}</h2>
              </div>
              <span className="text-2xl font-black text-teal-200">{team.total_points} XP</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <span className="rounded-xl bg-slate-900/70 p-3">{team.members} Members</span>
              <span className="rounded-xl bg-slate-900/70 p-3">{team.challenges_completed} Completed</span>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => join(team.id)} className="rounded-xl bg-teal-300 px-4 py-2 font-bold text-slate-950">Join</button>
              <button onClick={() => viewTeam(team.id)} className="rounded-xl border border-white/10 px-4 py-2 text-slate-200">Members</button>
            </div>
          </div>
        ))}
      </div>
      {selectedTeam && (
        <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
          <h2 className="text-2xl font-bold">{selectedTeam.name} Members</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {selectedTeam.member_list.map((member) => (
              <div key={member.id} className="rounded-xl bg-slate-900/70 p-4">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-slate-400">{member.department} • {member.points} XP</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

