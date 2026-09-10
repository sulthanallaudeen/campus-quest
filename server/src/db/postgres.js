import pg from "pg";
import { defaultBadges, defaultChallenges } from "../data/seeds.js";

const { Pool } = pg;

function convertPlaceholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`).replace(/CURRENT_TIMESTAMP/g, "NOW()");
}

export function createPostgresDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  });

  function placeholders(count) {
    return Array.from({ length: count }, (_, index) => `$${index + 1}`).join(", ");
  }

  async function run(sql, params = []) {
    const result = await pool.query(`${convertPlaceholders(sql)} RETURNING id`, params);
    return { id: result.rows[0]?.id || 0, changes: result.rowCount };
  }

  async function all(sql, params = []) {
    const result = await pool.query(convertPlaceholders(sql), params);
    return result.rows;
  }

  async function get(sql, params = []) {
    const result = await pool.query(convertPlaceholders(sql), params);
    return result.rows[0];
  }

  async function initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL,
        points INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS challenges (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        points INTEGER NOT NULL,
        requirements TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        challenge_id INTEGER NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
        completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(student_id, challenge_id)
      );

      CREATE TABLE IF NOT EXISTS badges (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        requirement_type TEXT NOT NULL,
        requirement_value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS student_badges (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        badge_id INTEGER NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
        earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(student_id, badge_id)
      );
    `);

    const challengeCount = await get("SELECT COUNT(*)::int AS count FROM challenges");
    if (challengeCount.count === 0) {
      for (const challenge of defaultChallenges) {
        await pool.query(
          `INSERT INTO challenges (title, description, category, difficulty, points, requirements)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [challenge.title, challenge.description, challenge.category, challenge.difficulty, challenge.points, challenge.requirements]
        );
      }
    }

    const badgeCount = await get("SELECT COUNT(*)::int AS count FROM badges");
    if (badgeCount.count === 0) {
      for (const badge of defaultBadges) {
        await pool.query(
          `INSERT INTO badges (name, description, icon, requirement_type, requirement_value)
           VALUES ($1, $2, $3, $4, $5)`,
          [badge.name, badge.description, badge.icon, badge.requirement_type, badge.requirement_value]
        );
      }
    }
  }

  return { type: "postgres", run, all, get, placeholders, initialize };
}
