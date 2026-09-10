import { db } from "../db/index.js";

function parseQuestions(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function buildQuizQuestions(challenge) {
  return shuffle(parseQuestions(challenge.quiz_questions))
    .slice(0, 5)
    .map((question) => ({
      id: question.id,
      question: question.question,
      options: shuffle(question.options)
    }));
}

export async function getChallenges(studentId) {
  const params = studentId ? [studentId] : [];
  const completionSelect = studentId
    ? `EXISTS(SELECT 1 FROM submissions WHERE submissions.challenge_id = challenges.id AND submissions.student_id = ?) AS completed`
    : "0 AS completed";

  const rows = await db.all(
    `SELECT challenges.id, challenges.title, challenges.description, challenges.category, challenges.difficulty,
            challenges.points, challenges.requirements, challenges.created_at, ${completionSelect}
     FROM challenges
     WHERE challenges.title LIKE 'Level %:%'
     ORDER BY challenges.id ASC`,
    params
  );

  return rows.map((challenge) => ({ ...challenge, completed: Boolean(challenge.completed) }));
}

export async function getChallengeById(id, studentId) {
  const challenge = await db.get("SELECT * FROM challenges WHERE id = ?", [id]);
  if (!challenge) return null;

  const completed = studentId
    ? Boolean(await db.get("SELECT id FROM submissions WHERE student_id = ? AND challenge_id = ?", [studentId, id]))
    : false;

  const allQuestions = parseQuestions(challenge.quiz_questions);
  return {
    ...challenge,
    completed,
    question_count: 5,
    question_bank_count: allQuestions.length,
    quiz_questions: buildQuizQuestions(challenge)
  };
}

export async function getChallengeWithAnswers(id) {
  const challenge = await db.get("SELECT * FROM challenges WHERE id = ?", [id]);
  if (!challenge) return null;
  return { ...challenge, quiz_questions: parseQuestions(challenge.quiz_questions) };
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
    `INSERT INTO challenges (title, description, category, difficulty, points, requirements, quiz_questions)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title.trim(),
      data.description.trim(),
      data.category,
      data.difficulty,
      Number(data.points),
      data.requirements?.trim() || "Answer all quiz questions correctly to complete this level.",
      JSON.stringify(data.quiz_questions || [])
    ]
  );

  return db.get("SELECT * FROM challenges WHERE id = ?", [result.id]);
}
