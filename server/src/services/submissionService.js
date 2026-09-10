import { db } from "../db/index.js";
import { checkAndAwardBadges } from "./badgeService.js";
import { getChallengeWithAnswers } from "./challengeService.js";
import { getStudentById } from "./studentService.js";

export async function getSubmissions() {
  return db.all(
    `SELECT submissions.*, students.name AS student_name, challenges.title AS challenge_title
     FROM submissions
     JOIN students ON students.id = submissions.student_id
     JOIN challenges ON challenges.id = submissions.challenge_id
     ORDER BY submissions.completed_at DESC`
  );
}

export async function getStudentHistory(studentId) {
  return db.all(
    `SELECT submissions.*, challenges.title, challenges.category, challenges.difficulty, challenges.points
     FROM submissions
     JOIN challenges ON challenges.id = submissions.challenge_id
     WHERE submissions.student_id = ?
     ORDER BY submissions.completed_at DESC`,
    [studentId]
  );
}

export async function completeChallenge(studentId, challengeId, answers = []) {
  const student = await db.get("SELECT * FROM students WHERE id = ?", [studentId]);
  const challenge = await getChallengeWithAnswers(challengeId);

  if (!student || !challenge) {
    const error = new Error("Student or challenge not found.");
    error.status = 404;
    throw error;
  }

  const existingSubmission = await db.get(
    "SELECT id FROM submissions WHERE student_id = ? AND challenge_id = ?",
    [studentId, challengeId]
  );

  if (existingSubmission) {
    const error = new Error("Level already completed by this student.");
    error.status = 409;
    throw error;
  }

  if (!Array.isArray(answers) || answers.length !== challenge.quiz_questions.length) {
    const error = new Error("Please answer all quiz questions before submitting.");
    error.status = 400;
    throw error;
  }

  const results = challenge.quiz_questions.map((question, index) => ({
    question: question.question,
    selectedIndex: Number(answers[index]),
    correctIndex: Number(question.correctIndex),
    correct: Number(answers[index]) === Number(question.correctIndex)
  }));
  const score = results.filter((result) => result.correct).length;

  if (score !== challenge.quiz_questions.length) {
    const error = new Error(`You scored ${score}/${challenge.quiz_questions.length}. Try again to complete this level.`);
    error.status = 400;
    error.details = { score, total: challenge.quiz_questions.length, results };
    throw error;
  }

  await db.run("INSERT INTO submissions (student_id, challenge_id, score) VALUES (?, ?, ?)", [studentId, challengeId, score]);
  await db.run("UPDATE students SET points = points + ? WHERE id = ?", [challenge.points, studentId]);
  const unlockedBadges = await checkAndAwardBadges(studentId);
  const updatedStudent = await getStudentById(studentId);

  return { student: updatedStudent, challenge, unlockedBadges, score, total: challenge.quiz_questions.length };
}
