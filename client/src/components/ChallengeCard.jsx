import React from 'react';
import { Link } from "react-router-dom";

export default function ChallengeCard({ challenge }) {
  return (
    <Link to={`/challenges/${challenge.id}`} className="group block rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-teal-300/50 hover:bg-white/[0.09]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-teal-200">{challenge.category}</p>
          <h3 className="mt-2 text-lg font-bold text-white">{challenge.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${challenge.completed ? "bg-emerald-400 text-slate-950" : "bg-slate-800 text-slate-200"}`}>
          {challenge.completed ? "Done" : `${challenge.points} XP`}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-slate-300">{challenge.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">{challenge.difficulty}</span>
        <span className="text-teal-200 transition group-hover:translate-x-1">Open quest</span>
      </div>
    </Link>
  );
}

