import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
import { api, getStudentId } from "../services/api.js";

export default function BadgesPage() {
  const [badges, setBadges] = useState(null);

  useEffect(() => {
    api.get(`/students/${getStudentId()}/badges`).then((response) => setBadges(response.data));
  }, []);

  if (!badges) return <Loading />;

  const unlocked = badges.filter((badge) => badge.unlocked);
  const locked = badges.filter((badge) => !badge.unlocked);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-200">Badge vault</p>
        <h1 className="mt-2 text-4xl font-black">Unlock Your Status</h1>
      </div>
      <BadgeSection title="Unlocked Badges" badges={unlocked} empty="Complete challenges to unlock your first badge." />
      <BadgeSection title="Locked Badges" badges={locked} locked />
    </div>
  );
}

function BadgeSection({ title, badges, locked = false, empty }) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>
      {badges.length === 0 && empty && <p className="mt-4 text-slate-300">{empty}</p>}
      <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {badges.map((badge) => (
          <div key={badge.id} className={`rounded-2xl border p-5 ${locked ? "border-white/10 bg-white/[0.04] opacity-60" : "border-teal-300/30 bg-teal-300/10 shadow-glow"}`}>
            <span className="text-4xl">{badge.icon}</span>
            <h3 className="mt-4 text-xl font-bold">{badge.name}</h3>
            <p className="mt-2 text-sm text-slate-300">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
