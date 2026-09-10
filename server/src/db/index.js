import dotenv from "dotenv";
import { createPostgresDatabase } from "./postgres.js";
import { createSqliteDatabase } from "./sqlite.js";

dotenv.config();

const dbType = process.env.DB_TYPE || "sqlite";

export const db = dbType === "postgres" ? createPostgresDatabase() : createSqliteDatabase();
