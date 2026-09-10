import { db } from "../db/index.js";
import { findOrCreateTeam, getStudentById } from "./studentService.js";

export async function getTeams() {
  return db.all(
    `SELECT teams.*,
      COUNT(DISTINCT students.id) AS members,
      COALESCE(SUM(students.points), 0) AS total_points,
      COUNT(submissions.id) AS challenges_completed
     FROM teams
     LEFT JOIN students ON students.team_id = teams.id
     LEFT JOIN submissions ON submissions.student_id = students.id
     GROUP BY teams.id
     ORDER BY total_points DESC, teams.name ASC`
  );
}

export async function getTeamById(id) {
  const team = await db.get(
    `SELECT teams.*,
      COUNT(DISTINCT students.id) AS members,
      COALESCE(SUM(students.points), 0) AS total_points,
      COUNT(submissions.id) AS challenges_completed
     FROM teams
     LEFT JOIN students ON students.team_id = teams.id
     LEFT JOIN submissions ON submissions.student_id = students.id
     WHERE teams.id = ?
     GROUP BY teams.id`,
    [id]
  );

  if (!team) return null;
  const members = await db.all("SELECT id, name, department, points FROM students WHERE team_id = ? ORDER BY points DESC", [id]);
  return { ...team, member_list: members };
}

export async function createTeam(name) {
  if (!name?.trim()) {
    const error = new Error("Team name is required.");
    error.status = 400;
    throw error;
  }
  return findOrCreateTeam(name);
}

export async function joinTeam(teamId, studentId) {
  const team = await db.get("SELECT * FROM teams WHERE id = ?", [teamId]);
  const student = await db.get("SELECT * FROM students WHERE id = ?", [studentId]);
  if (!team || !student) {
    const error = new Error("Team or student not found.");
    error.status = 404;
    throw error;
  }

  await db.run("UPDATE students SET team_id = ? WHERE id = ?", [teamId, studentId]);
  return getStudentById(studentId);
}
