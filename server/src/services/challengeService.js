import { db } from "../db/index.js";

export async function getChallenges(studentId) {
  const params = studentId ? [studentId] : [];
  const completionSelect = studentId
    ? `EXISTS(SELECT 1 FROM submissions WHERE submissions.challenge_id = challenges.id AND submissions.student_id = ?) AS completed`
    : "0 AS completed";

  const rows = await db.all(
    `SELECT challenges.*, ${completionSelect}
     FROM challenges
     ORDER BY points ASC, id ASC`,
    params
  );

  return rows.map((challenge) => ({ ...challenge, completed: Boolean(challenge.completed) }));
}

export async function getChallengeById(id, studentId) {
  const challenge = await db.get("SELECT * FROM challenges WHERE id = ?", [id]);
  if (!challenge) return null;
  if (!studentId) return { ...challenge, completed: false };

  const submission = await db.get(
    "SELECT id FROM submissions WHERE student_id = ? AND challenge_id = ?",
    [studentId, id]
  );
  return { ...challenge, completed: Boolean(submission) };
}

export async function createChallenge(data) {
  const required = ["title", "description", "category", "difficulty", "points"];
  const missing = required.find((key) => data[key] === undefined || data[key] === "");
  if (missing) {
    const error = new Error(`${missing} is required.`);
    error.status = 400;
    throw error;
  }

  const result = await db.run(
    `INSERT INTO challenges (title, description, category, difficulty, points, requirements)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.title.trim(),
      data.description.trim(),
      data.category,
      data.difficulty,
      Number(data.points),
      data.requirements?.trim() || "Complete the challenge and be ready to explain your solution."
    ]
  );

  return db.get("SELECT * FROM challenges WHERE id = ?", [result.id]);
}
