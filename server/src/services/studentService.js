import { db } from "../db/index.js";

export async function findOrCreateTeam(teamName) {
  const cleanName = teamName?.trim();
  if (!cleanName) return null;

  const existingTeam = await db.get("SELECT * FROM teams WHERE lower(name) = lower(?)", [cleanName]);
  if (existingTeam) return existingTeam;

  const result = await db.run("INSERT INTO teams (name) VALUES (?)", [cleanName]);
  return db.get("SELECT * FROM teams WHERE id = ?", [result.id]);
}

export async function getStudentById(id) {
  const student = await db.get(
    `SELECT students.*, teams.name AS team_name
     FROM students
     LEFT JOIN teams ON teams.id = students.team_id
     WHERE students.id = ?`,
    [id]
  );

  if (!student) return null;
  const completed = await db.get("SELECT COUNT(*) AS count FROM submissions WHERE student_id = ?", [id]);
  const badges = await db.get("SELECT COUNT(*) AS count FROM student_badges WHERE student_id = ?", [id]);
  const rank = await getStudentRank(id);
  return {
    ...student,
    challenges_completed: Number(completed.count),
    badges_earned: Number(badges.count),
    rank
  };
}

export async function getStudentRank(id) {
  const rows = await db.all("SELECT id FROM students ORDER BY points DESC, created_at ASC, id ASC");
  const index = rows.findIndex((student) => Number(student.id) === Number(id));
  return index === -1 ? null : index + 1;
}

export async function getAllStudents() {
  return db.all(
    `SELECT students.*, teams.name AS team_name,
      (SELECT COUNT(*) FROM submissions WHERE submissions.student_id = students.id) AS challenges_completed,
      (SELECT COUNT(*) FROM student_badges WHERE student_badges.student_id = students.id) AS badges_earned
     FROM students
     LEFT JOIN teams ON teams.id = students.team_id
     ORDER BY students.created_at DESC`
  );
}

export async function createStudent({ name, department, teamName }) {
  if (!name?.trim() || !department?.trim()) {
    const error = new Error("Student name and department are required.");
    error.status = 400;
    throw error;
  }

  const team = await findOrCreateTeam(teamName);
  const result = await db.run(
    "INSERT INTO students (name, department, team_id) VALUES (?, ?, ?)",
    [name.trim(), department.trim(), team?.id || null]
  );

  return getStudentById(result.id);
}

export async function updateStudent(id, { name, department, teamName, team_id }) {
  const student = await getStudentById(id);
  if (!student) {
    const error = new Error("Student not found.");
    error.status = 404;
    throw error;
  }

  let nextTeamId = team_id ?? student.team_id;
  if (teamName !== undefined) {
    const team = await findOrCreateTeam(teamName);
    nextTeamId = team?.id || null;
  }

  await db.run(
    "UPDATE students SET name = ?, department = ?, team_id = ? WHERE id = ?",
    [name?.trim() || student.name, department?.trim() || student.department, nextTeamId, id]
  );

  return getStudentById(id);
}
