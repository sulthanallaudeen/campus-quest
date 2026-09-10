import express from "express";
import { db } from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getBadgesForStudent } from "../services/badgeService.js";
import { createChallenge, getChallengeById, getChallenges } from "../services/challengeService.js";
import { getLeaderboard } from "../services/leaderboardService.js";
import { completeChallenge, getStudentHistory, getSubmissions } from "../services/submissionService.js";
import { createStudent, getAllStudents, getStudentById, updateStudent } from "../services/studentService.js";
import { createTeam, getTeamById, getTeams, joinTeam } from "../services/teamService.js";

export const apiRouter = express.Router();

apiRouter.get("/health", (request, response) => {
  response.json({ status: "ok" });
});

apiRouter.get("/students", asyncHandler(async (request, response) => {
  response.json(await getAllStudents());
}));

apiRouter.get("/students/:id", asyncHandler(async (request, response) => {
  const student = await getStudentById(request.params.id);
  if (!student) return response.status(404).json({ message: "Student not found." });
  const history = await getStudentHistory(request.params.id);
  response.json({ ...student, history });
}));

apiRouter.post("/students", asyncHandler(async (request, response) => {
  const student = await createStudent(request.body);
  response.status(201).json(student);
}));

apiRouter.put("/students/:id", asyncHandler(async (request, response) => {
  response.json(await updateStudent(request.params.id, request.body));
}));

apiRouter.get("/challenges", asyncHandler(async (request, response) => {
  response.json(await getChallenges(request.query.studentId));
}));

apiRouter.get("/challenges/:id", asyncHandler(async (request, response) => {
  const challenge = await getChallengeById(request.params.id, request.query.studentId);
  if (!challenge) return response.status(404).json({ message: "Challenge not found." });
  response.json(challenge);
}));

apiRouter.post("/challenges", asyncHandler(async (request, response) => {
  response.status(201).json(await createChallenge(request.body));
}));

apiRouter.get("/submissions", asyncHandler(async (request, response) => {
  response.json(await getSubmissions());
}));

apiRouter.post("/submissions", asyncHandler(async (request, response) => {
  const { studentId, student_id, challengeId, challenge_id } = request.body;
  const result = await completeChallenge(studentId || student_id, challengeId || challenge_id);
  response.status(201).json(result);
}));

apiRouter.get("/leaderboard", asyncHandler(async (request, response) => {
  response.json(await getLeaderboard());
}));

apiRouter.get("/teams", asyncHandler(async (request, response) => {
  response.json(await getTeams());
}));

apiRouter.get("/teams/:id", asyncHandler(async (request, response) => {
  const team = await getTeamById(request.params.id);
  if (!team) return response.status(404).json({ message: "Team not found." });
  response.json(team);
}));

apiRouter.post("/teams", asyncHandler(async (request, response) => {
  response.status(201).json(await createTeam(request.body.name));
}));

apiRouter.post("/teams/:id/join", asyncHandler(async (request, response) => {
  const studentId = request.body.studentId || request.body.student_id;
  response.json(await joinTeam(request.params.id, studentId));
}));

apiRouter.get("/badges", asyncHandler(async (request, response) => {
  response.json(await db.all("SELECT * FROM badges ORDER BY id ASC"));
}));

apiRouter.get("/students/:id/badges", asyncHandler(async (request, response) => {
  response.json(await getBadgesForStudent(request.params.id));
}));
