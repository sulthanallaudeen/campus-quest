import { db } from "../db/index.js";

export async function getLeaderboard() {
  const rows = await db.all(
    `SELECT students.id, students.name, students.department, students.points, teams.name AS team_name,
      (SELECT COUNT(*) FROM submissions WHERE submissions.student_id = students.id) AS challenges_completed
     FROM students
     LEFT JOIN teams ON teams.id = students.team_id
     ORDER BY students.points DESC, students.created_at ASC, students.id ASC`
  );

  return rows.map((student, index) => ({ ...student, rank: index + 1 }));
}
