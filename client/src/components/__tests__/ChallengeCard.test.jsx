import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ChallengeCard from "../ChallengeCard.jsx";

const challenge = {
  id: 7,
  title: "Connect React to an API",
  description: "Fetch challenge data and render it.",
  category: "React",
  difficulty: "Medium",
  points: 30,
  completed: false
};

describe("ChallengeCard", () => {
  it("renders challenge details and links to the detail page", () => {
    render(
      <MemoryRouter>
        <ChallengeCard challenge={challenge} />
      </MemoryRouter>
    );

    expect(screen.getByText("Connect React to an API")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/challenges/7");
  });
});
