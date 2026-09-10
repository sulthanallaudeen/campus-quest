# TESTING

Campus Quest was tested locally on Windows with Node.js 18.

## Commands Run

```bash
npm install
npm run setup
npm run build
npm run dev
```

## Verified

- Root `npm install` installs the workspace helper dependency.
- Root `npm run setup` installs server and client dependencies.
- Root `npm run dev` starts both services:
  - React/Vite: `http://localhost:5173`
  - Express API: `http://localhost:3000`
- `GET /api/health` returns `{ "status": "ok" }`.
- SQLite database is created automatically at `server/database/campus.db`.
- Default quiz level seed creates 10 levels with 5 questions each.
- `POST /api/students` creates a student and team.
- `GET /api/challenges` returns seeded challenges.
- `POST /api/submissions` completes a challenge and increases points.
- Duplicate challenge completion is rejected with HTTP `409`.
- `GET /api/leaderboard` sorts students by highest points.
- Completing the first challenge unlocks the `First Launch` badge.
- React frontend returns HTTP `200`.
- Frontend and backend are reachable together through root `npm run dev`.

## Notes

`npm install` reported dependency audit warnings from third-party packages. The application build and local runtime checks completed successfully.

## Automated Tests Added

Backend test suite: `server/tests/api.test.js`

- Health check
- Default quiz level seeding
- Student and team creation
- Hidden correct answers in quiz API responses
- Imperfect quiz attempt rejection
- Perfect quiz completion and points increase
- Badge unlocking
- Duplicate level completion rejection
- Leaderboard sorting

Frontend test suite:

- `client/src/components/__tests__/StatCard.test.jsx`
- `client/src/components/__tests__/ChallengeCard.test.jsx`
- `client/src/pages/__tests__/EntryPage.test.jsx`

These tests are intentionally small so students can copy them when adding new features.

