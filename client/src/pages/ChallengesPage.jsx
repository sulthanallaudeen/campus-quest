import { useEffect, useMemo, useState } from "react";
import ChallengeCard from "../components/ChallengeCard.jsx";
import Loading from "../components/Loading.jsx";
import { api, getStudentId } from "../services/api.js";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState(null);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    api.get(`/challenges?studentId=${getStudentId()}`).then((response) => setChallenges(response.data));
  }, []);

  const categories = useMemo(() => ["All", ...new Set((challenges || []).map((challenge) => challenge.category))], [challenges]);
  const visible = category === "All" ? challenges : challenges?.filter((challenge) => challenge.category === category);

  if (!challenges) return <Loading />;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-200">Challenge board</p>
          <h1 className="mt-2 text-4xl font-black">Pick Your Next Quest</h1>
        </div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
      </div>
    </div>
  );
}
