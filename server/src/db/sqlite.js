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
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        challenge_id INTEGER NOT NULL,
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

    if (get("SELECT COUNT(*) AS count FROM challenges").count === 0) {
      const insert = db.prepare(`
        INSERT INTO challenges (title, description, category, difficulty, points, requirements)
        VALUES (@title, @description, @category, @difficulty, @points, @requirements)
      `);
      const insertMany = db.transaction((items) => items.forEach((item) => insert.run(item)));
      insertMany(defaultChallenges);
    }

    if (get("SELECT COUNT(*) AS count FROM badges").count === 0) {
      const insert = db.prepare(`
        INSERT INTO badges (name, description, icon, requirement_type, requirement_value)
        VALUES (@name, @description, @icon, @requirement_type, @requirement_value)
      `);
      const insertMany = db.transaction((items) => items.forEach((item) => insert.run(item)));
      insertMany(defaultBadges);
    }
  }

  return { type: "sqlite", run, all, get, placeholders, initialize };
}
