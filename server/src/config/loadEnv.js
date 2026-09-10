import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, "../..");
const envPath = path.join(serverRoot, ".env");
const examplePath = path.join(serverRoot, ".env.example");

const fallbackPath = fs.existsSync(envPath) ? envPath : examplePath;

dotenv.config({ path: fallbackPath });