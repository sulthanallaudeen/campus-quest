import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import { api, getStudentId } from "../services/api.js";

function rankIcon(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

export default function LeaderboardPage() {
  const [students, setStudents] = useState(null);
  const currentId = Number(getStudentId());

  useEffect(() => {
    api.get("/leaderboard").then((response) => setStudents(response.data));
  }, []);

  if (!students) return <Loading />;

  return (
    <div>
      <p className="text-sm font-semibold uppercase text-teal-200">Leaderboard</p>
      <h1 className="mt-2 text-4xl font-black">Campus Rankings</h1>
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
        <div className="grid grid-cols-[80px_1fr_1fr_150px_120px] gap-3 border-b border-white/10 px-5 py-4 text-sm font-bold text-slate-300 max-md:hidden">
          <span>Rank</span><span>Student</span><span>Team</span><span>Completed</span><span>Points</span>
        </div>
        {students.map((student) => (
          <div key={student.id} className={`grid gap-3 border-b border-white/5 px-5 py-4 md:grid-cols-[80px_1fr_1fr_150px_120px] ${Number(student.id) === currentId ? "bg-teal-300/15" : ""}`}>
            <span className="text-xl font-black">{rankIcon(student.rank)}</span>
            <span className="font-semibold">{student.name}<span className="ml-2 text-sm text-slate-400">{student.department}</span></span>
            <span className="text-slate-300">{student.team_name || "Solo"}</span>
            <span>{student.challenges_completed}</span>
            <span className="font-black text-teal-200">{student.points} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
