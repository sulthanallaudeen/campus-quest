import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatCard from "../StatCard.jsx";

describe("StatCard", () => {
  it("shows a label and value", () => {
    render(<StatCard icon="⚡" label="Total Points" value={120} />);

    expect(screen.getByText("Total Points")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });
});
