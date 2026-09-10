import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import BadgesPage from "./pages/BadgesPage.jsx";
import ChallengeDetailPage from "./pages/ChallengeDetailPage.jsx";
import ChallengesPage from "./pages/ChallengesPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import EntryPage from "./pages/EntryPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TeamsPage from "./pages/TeamsPage.jsx";
import { getStudentId } from "./services/api.js";

function RequireStudent({ children }) {
  return getStudentId() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route
        element={
          <RequireStudent>
            <AppLayout />
          </RequireStudent>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

