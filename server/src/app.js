import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { apiRouter } from "./routes/index.js";

dotenv.config();

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());
app.use("/api", apiRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Route not found." });
});

app.use((error, request, response, next) => {
  const status = error.status || 500;
  response.status(status).json({
    message: error.message || "Something went wrong."
  });
});
