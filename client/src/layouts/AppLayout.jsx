import { Award, Flag, LayoutDashboard, Medal, Shield, UserRound, Users } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearStudentId } from "../services/api.js";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/challenges", label: "Challenges", icon: Flag },
  { to: "/leaderboard", label: "Leaderboard", icon: Medal },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/badges", label: "Badges", icon: Award },
  { to: "/profile", label: "My Profile", icon: UserRound }
];

export default function AppLayout() {
  const navigate = useNavigate();

  function resetStudent() {
    clearStudentId();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.14),transparent_30%)]" />
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-white/10 bg-slate-950/80 p-6 backdrop-blur lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-300 text-slate-950">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide">CAMPUS QUEST</h1>
            <p className="text-xs text-slate-400">Learn • Build • Compete • Level Up</p>
          </div>
        </div>
        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-teal-300 text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <button onClick={resetStudent} className="mt-10 w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 hover:bg-white/10">
          Change Student
        </button>
      </aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 p-4 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <strong>CAMPUS QUEST</strong>
          <button onClick={resetStudent} className="rounded-lg border border-white/10 px-3 py-2 text-xs">Change</button>
        </div>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `whitespace-nowrap rounded-full px-3 py-2 text-xs ${isActive ? "bg-teal-300 text-slate-950" : "bg-white/10 text-slate-200"}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="px-4 py-6 lg:ml-72 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}
