import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ChallengeDetailPage from "../ChallengeDetailPage.jsx";

const mockGet = vi.fn();
const mockPost = vi.fn();

vi.mock("../../services/api.js", () => ({
  api: {
    get: (...args) => mockGet(...args),
    post: (...args) => mockPost(...args)
  },
  getStudentId: () => "7"
}));

const level = {
  id: 1,
  title: "Level 1: Starter Spark",
  description: "Start with software basics.",
  category: "Software",
  difficulty: "Easy",
  points: 10,
  requirements: "Answer all questions correctly.",
  completed: false,
  quiz_questions: [
    { id: "q1", question: "What is software?", options: ["Instructions", "Hardware", "Cable", "Battery"] },
    { id: "q2", question: "What does CSS style?", options: ["Web pages", "Databases", "APIs", "Routers"] }
  ]
};

function renderQuiz() {
  return render(
    <MemoryRouter initialEntries={["/challenges/1"]}>
      <Routes>
        <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ChallengeDetailPage quiz", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it("shows quiz progress and moves to the next question", async () => {
    mockGet.mockResolvedValueOnce({ data: level });

    renderQuiz();

    expect(await screen.findByText("Level 1: Starter Spark")).toBeInTheDocument();
    expect(screen.getByText("Question 1 of 2")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Instructions" }));
    await userEvent.click(screen.getByRole("button", { name: "Next Question" }));

    expect(screen.getByText("Question 2 of 2")).toBeInTheDocument();
    expect(screen.getByText("What does CSS style?")).toBeInTheDocument();
  });

  it("shows an unlocked badge animation after a perfect quiz", async () => {
    mockGet.mockResolvedValueOnce({ data: level });
    mockPost.mockResolvedValueOnce({
      data: {
        score: 2,
        total: 2,
        student: { points: 10 },
        unlockedBadges: [{ icon: "🚀", name: "Starter Spark" }]
      }
    });

    renderQuiz();

    expect(await screen.findByText("Level 1: Starter Spark")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Instructions" }));
    await userEvent.click(screen.getByRole("button", { name: "Next Question" }));
    await userEvent.click(screen.getByRole("button", { name: "Web pages" }));
    await userEvent.click(screen.getByRole("button", { name: "Submit Quiz" }));

    expect(await screen.findByText("Badge Unlocked")).toBeInTheDocument();
    expect(screen.getAllByText("Starter Spark").length).toBeGreaterThan(0);
    await waitFor(() => expect(screen.getByText("Dashboard")).toBeInTheDocument(), { timeout: 4000 });
  });
});




