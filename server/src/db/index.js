import "../config/loadEnv.js";
import { createPostgresDatabase } from "./postgres.js";
import { createSqliteDatabase } from "./sqlite.js";

const dbType = process.env.DB_TYPE || "sqlite";

export const db = dbType === "postgres" ? createPostgresDatabase() : createSqliteDatabase();
