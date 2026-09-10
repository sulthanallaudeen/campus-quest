import React from 'react';
import { Rocket } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api, getStudentId, setStudentId } from "../services/api.js";

export default function EntryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", department: "", teamName: "" });
  const [error, setError] = useState("");

  if (getStudentId()) return <Navigate to="/dashboard" replace />;

  async function submitQuest(event) {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post("/students", form);
      setStudentId(response.data.id);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not start your quest.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_70%_10%,rgba(236,72,153,0.18),transparent_25%),linear-gradient(135deg,rgba(15,23,42,1),rgba(2,6,23,1))]" />
      <section className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm text-teal-100">
            <Rocket size={16} /> Learn • Build • Compete • Level Up
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-wide md:text-7xl">CAMPUS QUEST</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            A gamified workshop arena where students complete coding challenges, earn XP, unlock badges, and climb the campus leaderboard.
          </p>
        </div>

        <form onSubmit={submitQuest} className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-glow backdrop-blur">
          <h2 className="text-2xl font-bold">Enter the Quest</h2>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Student Name</span>
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-teal-300 transition focus:ring-2" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Department</span>
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-teal-300 transition focus:ring-2" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} required />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Team Name - optional</span>
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none ring-teal-300 transition focus:ring-2" value={form.teamName} onChange={(event) => setForm({ ...form, teamName: event.target.value })} />
            </label>
          </div>
          {error && <p className="mt-4 rounded-xl border border-rose-300/30 bg-rose-400/10 p-3 text-sm text-rose-100">{error}</p>}
          <button className="mt-6 w-full rounded-xl bg-teal-300 px-5 py-3 font-black text-slate-950 transition hover:bg-teal-200">Start My Quest</button>
        </form>
      </section>
    </main>
  );
}

