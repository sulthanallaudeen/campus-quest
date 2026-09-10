import React from 'react';
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { api, getStudentId } from "../services/api.js";

export default function ChallengeDetailPage() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    api.get(`/challenges/${id}?studentId=${getStudentId()}`).then((response) => {
      setChallenge(response.data);
      setCompleted(response.data.completed);
    });
  }, [id]);

  async function markCompleted() {
    setMessage("");
    try {
      const response = await api.post("/submissions", { studentId: getStudentId(), challengeId: id });
      setCompleted(true);
      const badgeText = response.data.unlockedBadges.length
        ? ` Badges unlocked: ${response.data.unlockedBadges.map((badge) => `${badge.icon} ${badge.name}`).join(", ")}`
        : "";
      setMessage(`Quest completed. You now have ${response.data.student.points} XP.${badgeText}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not complete this challenge.");
    }
  }

  if (!challenge) return <Loading />;

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/challenges" className="text-sm text-teal-200">Back to challenges</Link>
      <article className="mt-5 rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-glow">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-200">{challenge.category}</p>
            <h1 className="mt-3 text-4xl font-black">{challenge.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-teal-200">{challenge.points} XP</p>
            <p className="text-sm text-slate-400">{challenge.difficulty}</p>
          </div>
        </div>
        <p className="mt-6 text-lg text-slate-300">{challenge.description}</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <h2 className="text-xl font-bold">Requirements</h2>
          <p className="mt-3 text-slate-300">{challenge.requirements}</p>
        </div>
        <button disabled={completed} onClick={markCompleted} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-300 px-6 py-3 font-black text-slate-950 disabled:cursor-not-allowed disabled:bg-emerald-400">
          <CheckCircle2 size={20} />
          {completed ? "Completed" : "Mark as Completed"}
        </button>
        {message && <p className="mt-5 rounded-xl border border-teal-300/30 bg-teal-300/10 p-4 text-teal-50">{message}</p>}
      </article>
    </div>
  );
}

