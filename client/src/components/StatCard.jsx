import React from 'react';
export default function StatCard({ icon, label, value, tone = "teal" }) {
  const tones = {
    teal: "from-teal-400/20 to-cyan-500/10 text-teal-200 border-teal-300/20",
    pink: "from-pink-400/20 to-rose-500/10 text-pink-200 border-pink-300/20",
    amber: "from-amber-300/20 to-orange-500/10 text-amber-100 border-amber-300/20",
    violet: "from-violet-400/20 to-indigo-500/10 text-violet-100 border-violet-300/20"
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${tones[tone]} p-5 shadow-glow`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

