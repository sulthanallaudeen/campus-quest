import React from "react";
import { render, screen } from "@testing-library/react";
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
    { question: "What is software?", options: ["Instructions", "Hardware", "Cable", "Battery"] },
    { question: "What does CSS style?", options: ["Web pages", "Databases", "APIs", "Routers"] }
  ]
};

describe("ChallengeDetailPage quiz", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it("shows quiz progress and moves to the next question", async () => {
    mockGet.mockResolvedValueOnce({ data: level });

    render(
      <MemoryRouter initialEntries={["/challenges/1"]}>
        <Routes>
          <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Level 1: Starter Spark")).toBeInTheDocument();
    expect(screen.getByText("Question 1 of 2")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Instructions" }));
    await userEvent.click(screen.getByRole("button", { name: "Next Question" }));

    expect(screen.getByText("Question 2 of 2")).toBeInTheDocument();
    expect(screen.getByText("What does CSS style?")).toBeInTheDocument();
  });
});
