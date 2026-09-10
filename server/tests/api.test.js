import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import request from "supertest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDatabasePath = path.resolve(__dirname, "../database/test.db");

process.env.DB_TYPE = "sqlite";
process.env.SQLITE_PATH = "./database/test.db";
process.env.CLIENT_URL = "http://localhost:5173";

if (fs.existsSync(testDatabasePath)) {
  fs.unlinkSync(testDatabasePath);
}

const { app } = await import("../src/app.js");
const { db } = await import("../src/db/index.js");

await db.initialize();

describe("Campus Quest API", () => {
  it("returns a health check", async () => {
    const response = await request(app).get("/api/health").expect(200);

    assert.equal(response.body.status, "ok");
  });

  it("seeds 10 quiz levels", async () => {
    const response = await request(app).get("/api/challenges").expect(200);

    assert.equal(response.body.length, 10);
    assert.equal(response.body[0].title, "Level 1: Starter Spark");
  });

  it("returns quiz questions without correct answers", async () => {
    const levels = await request(app).get("/api/challenges").expect(200);
    const response = await request(app).get(`/api/challenges/${levels.body[0].id}`).expect(200);

    assert.equal(response.body.quiz_questions.length, 5);
    assert.equal(response.body.quiz_questions[0].correctIndex, undefined);
  });

  it("creates a student and team", async () => {
    const response = await request(app)
      .post("/api/students")
      .send({ name: "Test Student", department: "Computer Science", teamName: "Test Team" })
      .expect(201);

    assert.equal(response.body.name, "Test Student");
    assert.equal(response.body.team_name, "Test Team");
    assert.equal(response.body.points, 0);
  });

  it("completes a quiz level, adds points, and unlocks its badge", async () => {
    const studentResponse = await request(app)
      .post("/api/students")
      .send({ name: "Quiz Learner", department: "AI" })
      .expect(201);

    const levelsResponse = await request(app).get("/api/challenges").expect(200);
    const firstLevel = levelsResponse.body[0];

    const completionResponse = await request(app)
      .post("/api/submissions")
      .send({ studentId: studentResponse.body.id, challengeId: firstLevel.id, answers: [0, 0, 0, 0, 0] })
      .expect(201);

    assert.equal(completionResponse.body.score, 5);
    assert.equal(completionResponse.body.student.points, firstLevel.points);
    assert.equal(completionResponse.body.unlockedBadges[0].name, "Starter Spark");
  });

  it("rejects an imperfect quiz attempt without awarding points", async () => {
    const studentResponse = await request(app)
      .post("/api/students")
      .send({ name: "Retry Learner", department: "AI" })
      .expect(201);

    const levelsResponse = await request(app).get("/api/challenges").expect(200);
    const response = await request(app)
      .post("/api/submissions")
      .send({ studentId: studentResponse.body.id, challengeId: levelsResponse.body[0].id, answers: [1, 0, 0, 0, 0] })
      .expect(400);

    assert.equal(response.body.details.score, 4);
  });

  it("rejects duplicate level completions", async () => {
    const studentResponse = await request(app)
      .post("/api/students")
      .send({ name: "Duplicate Tester", department: "Debugging" })
      .expect(201);

    const levelsResponse = await request(app).get("/api/challenges").expect(200);
    const challengeId = levelsResponse.body[0].id;

    await request(app)
      .post("/api/submissions")
      .send({ studentId: studentResponse.body.id, challengeId, answers: [0, 0, 0, 0, 0] })
      .expect(201);

    const duplicateResponse = await request(app)
      .post("/api/submissions")
      .send({ studentId: studentResponse.body.id, challengeId, answers: [0, 0, 0, 0, 0] })
      .expect(409);

    assert.equal(duplicateResponse.body.message, "Level already completed by this student.");
  });

  it("sorts the leaderboard by highest points", async () => {
    const leaderboardResponse = await request(app).get("/api/leaderboard").expect(200);

    for (let index = 1; index < leaderboardResponse.body.length; index += 1) {
      assert.ok(leaderboardResponse.body[index - 1].points >= leaderboardResponse.body[index].points);
    }
  });
});
