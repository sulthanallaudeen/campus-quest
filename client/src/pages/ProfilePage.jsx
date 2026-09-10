import React from 'react';
import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import StatCard from "../components/StatCard.jsx";
import { api, getStudentId } from "../services/api.js";

export default function ProfilePage() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    api.get(`/students/${getStudentId()}`).then((response) => setStudent(response.data));
  }, []);

  if (!student) return <Loading />;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-glow">
        <p className="text-sm font-semibold uppercase text-teal-200">My profile</p>
        <h1 className="mt-2 text-4xl font-black">{student.name}</h1>
        <p className="mt-2 text-slate-300">{student.department} • {student.team_name || "Solo quester"}</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="⚡" label="Points" value={student.points} />
        <StatCard icon="🏁" label="Rank" value={student.rank ? `#${student.rank}` : "-"} tone="pink" />
        <StatCard icon="✅" label="Completed" value={student.challenges_completed} tone="amber" />
        <StatCard icon="🎖️" label="Badges" value={student.badges_earned} tone="violet" />
      </section>
      <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
        <h2 className="text-2xl font-bold">Completed Challenge History</h2>
        <div className="mt-4 space-y-3">
          {student.history.length === 0 && <p className="text-slate-300">No quests completed yet.</p>}
          {student.history.map((item) => (
            <div key={item.id} className="flex flex-col justify-between gap-2 rounded-xl bg-slate-900/70 p-4 md:flex-row md:items-center">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-slate-400">{item.category} • {item.difficulty}</p>
              </div>
              <span className="font-black text-teal-200">{item.points} XP</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

