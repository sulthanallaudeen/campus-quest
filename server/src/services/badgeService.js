import { db } from "../db/index.js";

const codingCategories = ["React", "JavaScript", "Node.js", "Debugging", "Software", "Vibe Coding", "AI Agents"];

export async function getBadgesForStudent(studentId) {
  const badges = await db.all(
    `SELECT badges.*, student_badges.earned_at
     FROM badges
     LEFT JOIN student_badges
       ON student_badges.badge_id = badges.id AND student_badges.student_id = ?
     ORDER BY badges.id ASC`,
    [studentId]
  );

  return badges.map((badge) => ({
    ...badge,
    unlocked: Boolean(badge.earned_at)
  }));
}

export async function checkAndAwardBadges(studentId) {
  const student = await db.get("SELECT * FROM students WHERE id = ?", [studentId]);
  const badges = await db.all("SELECT * FROM badges ORDER BY id ASC");
  const earned = await db.all("SELECT badge_id FROM student_badges WHERE student_id = ?", [studentId]);
  const earnedIds = new Set(earned.map((badge) => Number(badge.badge_id)));

  const completed = await db.all(
    `SELECT challenges.*
     FROM submissions
     JOIN challenges ON challenges.id = submissions.challenge_id
     WHERE submissions.student_id = ?`,
    [studentId]
  );

  const newlyUnlocked = [];
  for (const badge of badges) {
    if (earnedIds.has(Number(badge.id))) continue;

    const unlocked = isBadgeUnlocked(badge, student, completed);
    if (unlocked) {
      await db.run("INSERT INTO student_badges (student_id, badge_id) VALUES (?, ?)", [studentId, badge.id]);
      newlyUnlocked.push(badge);
    }
  }

  return newlyUnlocked;
}

function isBadgeUnlocked(badge, student, completedChallenges) {
  if (badge.requirement_type === "challenge_completion") {
    return completedChallenges.some((challenge) => challenge.title === badge.requirement_value);
  }

  if (badge.requirement_type === "completed_count") {
    return completedChallenges.length >= Number(badge.requirement_value);
  }

  if (badge.requirement_type === "coding_count") {
    return completedChallenges.filter((challenge) => codingCategories.includes(challenge.category)).length >= Number(badge.requirement_value);
  }

  if (badge.requirement_type === "category") {
    return completedChallenges.some((challenge) => challenge.category === badge.requirement_value);
  }

  if (badge.requirement_type === "points") {
    return Number(student.points) >= Number(badge.requirement_value);
  }

  return false;
}
