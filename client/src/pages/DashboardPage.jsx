import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard.jsx";
import Loading from "../components/Loading.jsx";
import StatCard from "../components/StatCard.jsx";
import { api, getStudentId } from "../services/api.js";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const studentId = getStudentId();
      const [student, challenges, leaderboard, badges] = await Promise.all([
        api.get(`/students/${studentId}`),
        api.get(`/challenges?studentId=${studentId}`),
        api.get("/leaderboard"),
        api.get(`/students/${studentId}/badges`)
      ]);
      const recommended = challenges.data.find((challenge) => !challenge.completed) || challenges.data[0];
      setData({ student: student.data, challenges: challenges.data, leaderboard: leaderboard.data, badges: badges.data, recommended });
    }
    load();
  }, []);

  if (!data) return <Loading />;

  const activeChallenges = data.challenges.filter((challenge) => !challenge.completed).slice(0, 3);
  const recentActivity = data.student.history.slice(0, 4);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase text-teal-200">Quest dashboard</p>
        <h1 className="mt-2 text-4xl font-black">Welcome, {data.student.name}</h1>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="⚡" label="Total Points" value={data.student.points} />
        <StatCard icon="🏁" label="Current Rank" value={data.student.rank ? `#${data.student.rank}` : "-"} tone="pink" />
        <StatCard icon="✅" label="Challenges Completed" value={data.student.challenges_completed} tone="amber" />
        <StatCard icon="🎖️" label="Badges Earned" value={data.student.badges_earned} tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Active Challenges</h2>
            <Link className="text-sm text-teal-200" to="/challenges">View all</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {activeChallenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
          <h2 className="text-2xl font-bold">Leaderboard Preview</h2>
          <div className="mt-4 space-y-3">
            {data.leaderboard.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between rounded-xl bg-slate-900/70 px-4 py-3">
                <span className="font-semibold">#{student.rank} {student.name}</span>
                <span className="text-teal-200">{student.points} XP</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {recentActivity.length === 0 && <p className="text-slate-300">No completed challenges yet.</p>}
            {recentActivity.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-900/70 p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-slate-400">{item.category} • {item.points} XP</p>
              </div>
            ))}
          </div>
        </div>
        {data.recommended && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Recommended Challenge</h2>
            <ChallengeCard challenge={data.recommended} />
          </div>
        )}
      </section>
    </div>
  );
}
