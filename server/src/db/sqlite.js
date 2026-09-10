import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defaultBadges, defaultChallenges } from "../data/seeds.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function databasePath() {
  const configuredPath = process.env.SQLITE_PATH || "./database/campus.db";
  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(__dirname, "../../", configuredPath);
}

function placeholders(count) {
  return Array.from({ length: count }, () => "?").join(", ");
}

function columnExists(db, table, column) {
  return db.prepare(`PRAGMA table_info(${table})`).all().some((item) => item.name === column);
}

export function createSqliteDatabase() {
  const dbPath = databasePath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.pragma("foreign_keys = ON");

  function run(sql, params = []) {
    const result = db.prepare(sql).run(params);
    return { id: Number(result.lastInsertRowid || 0), changes: result.changes };
  }

  function all(sql, params = []) {
    return db.prepare(sql).all(params);
  }

  function get(sql, params = []) {
    return db.prepare(sql).get(params);
  }

  function initialize() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS teams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        team_id INTEGER,
        points INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS challenges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        points INTEGER NOT NULL,
        requirements TEXT NOT NULL DEFAULT '',
        quiz_questions TEXT NOT NULL DEFAULT '[]',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        challenge_id INTEGER NOT NULL,
        score INTEGER NOT NULL DEFAULT 0,
        completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, challenge_id),
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        requirement_type TEXT NOT NULL,
        requirement_value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS student_badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        badge_id INTEGER NOT NULL,
        earned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, badge_id),
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
      );
    `);

    if (!columnExists(db, "challenges", "quiz_questions")) {
      db.exec("ALTER TABLE challenges ADD COLUMN quiz_questions TEXT NOT NULL DEFAULT '[]'");
    }

    if (!columnExists(db, "submissions", "score")) {
      db.exec("ALTER TABLE submissions ADD COLUMN score INTEGER NOT NULL DEFAULT 0");
    }

    const hasQuizLevels = get("SELECT COUNT(*) AS count FROM challenges WHERE title LIKE 'Level %:%'").count > 0;
    if (!hasQuizLevels) {
      db.exec("DELETE FROM student_badges; DELETE FROM submissions; DELETE FROM badges; DELETE FROM challenges;");
    }

    const insertChallenge = db.prepare(`
      INSERT INTO challenges (title, description, category, difficulty, points, requirements, quiz_questions)
      VALUES (@title, @description, @category, @difficulty, @points, @requirements, @quiz_questions)
    `);
    const updateChallenge = db.prepare(`
      UPDATE challenges
      SET description = @description, category = @category, difficulty = @difficulty, points = @points,
          requirements = @requirements, quiz_questions = @quiz_questions
      WHERE title = @title
    `);
    const findChallenge = db.prepare("SELECT id FROM challenges WHERE title = ?");

    const syncChallenges = db.transaction((items) => {
      for (const item of items) {
        const row = { ...item, quiz_questions: JSON.stringify(item.quiz_questions || []) };
        if (findChallenge.get(row.title)) updateChallenge.run(row);
        else insertChallenge.run(row);
      }
    });
    syncChallenges(defaultChallenges);

    const insertBadge = db.prepare(`
      INSERT INTO badges (name, description, icon, requirement_type, requirement_value)
      VALUES (@name, @description, @icon, @requirement_type, @requirement_value)
    `);
    const updateBadge = db.prepare(`
      UPDATE badges
      SET description = @description, icon = @icon, requirement_type = @requirement_type, requirement_value = @requirement_value
      WHERE name = @name
    `);
    const findBadge = db.prepare("SELECT id FROM badges WHERE name = ?");

    const syncBadges = db.transaction((items) => {
      for (const item of items) {
        if (findBadge.get(item.name)) updateBadge.run(item);
        else insertBadge.run(item);
      }
    });
    syncBadges(defaultBadges);
  }

  return { type: "sqlite", run, all, get, placeholders, initialize };
}
