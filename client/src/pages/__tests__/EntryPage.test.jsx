import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EntryPage from "../EntryPage.jsx";

const mockPost = vi.fn();

vi.mock("../../services/api.js", () => ({
  api: {
    post: (...args) => mockPost(...args)
  },
  getStudentId: () => localStorage.getItem("studentId"),
  setStudentId: (id) => localStorage.setItem("studentId", id)
}));

describe("EntryPage", () => {
  beforeEach(() => {
    localStorage.clear();
    mockPost.mockReset();
  });

  it("creates a student and remembers the returned student id", async () => {
    mockPost.mockResolvedValueOnce({ data: { id: 42, name: "Asha" } });

    render(
      <MemoryRouter>
        <EntryPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Student Name"), "Asha");
    await userEvent.type(screen.getByLabelText("Department"), "AI Lab");
    await userEvent.type(screen.getByLabelText("Team Name - optional"), "Neon Coders");
    await userEvent.click(screen.getByRole("button", { name: "Start My Quest" }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/students", {
        name: "Asha",
        department: "AI Lab",
        teamName: "Neon Coders"
      });
    });

    expect(localStorage.getItem("studentId")).toBe("42");
  });
});
