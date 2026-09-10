# CAMPUS QUEST

Learn • Build • Compete • Level Up

Campus Quest is a full-stack gamified student challenge platform for college AI and vibe coding workshops. Students enter their name, join or create a team, complete quiz levels, earn points, unlock badges, and climb the leaderboard.

## Screenshots

Add screenshots after running the app locally:

- Entry screen
- Dashboard
- Challenges page
- Leaderboard
- Badges page

## Architecture

```txt
Local Development

React + Vite
  ↓
Node.js + Express REST API
  ↓
SQLite
```

```txt
Production

React hosted on Vercel
  ↓
Node.js + Express hosted on Render
  ↓
PostgreSQL
```

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Node.js
- Express.js
- SQLite with `better-sqlite3`
- PostgreSQL with `pg`
- concurrently

## Prerequisites

Install Node.js 18 or newer, npm, and Git.

## Clone Instructions

```bash
git clone <repository-url>
cd campus-quest
```

## Installation

From the root folder:

```bash
npm install
npm run setup
```

`npm install` installs the root helper dependency. `npm run setup` installs both the server and client dependencies.

## Run Locally

```bash
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:3000/api`.

## Environment Variables

Create `server/.env` from `server/.env.example`:

```env
PORT=3000
DB_TYPE=sqlite
SQLITE_PATH=./database/campus.db
CLIENT_URL=http://localhost:5173
DATABASE_URL=
```

Create `client/.env` from `client/.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
```

## SQLite Explanation

Local development uses SQLite so students do not need a cloud database. When the server starts, it creates `server/database/campus.db`, creates missing tables, and inserts the default challenges and badges if the database is empty.

Do not use browser localStorage as the database. This app only stores `studentId` in localStorage so the browser remembers the current student.


## Quiz Levels

Campus Quest now has 10 levels. Each level has a 10-question bank and serves 5 random multiple-choice questions about software, AI, AI agents, and vibe coding.

Students must answer the 5 selected questions correctly to complete a level. Completing a level awards points and unlocks that level's badge.

The backend grades quiz answers, so points and badges are not awarded by the browser alone. Answer options are shuffled each time, and correct answers are hidden from public API responses.

## REST API

Health: `GET /api/health`

Students: `GET /api/students`, `GET /api/students/:id`, `POST /api/students`, `PUT /api/students/:id`

Challenges: `GET /api/challenges`, `GET /api/challenges/:id`, `POST /api/challenges`

Submissions: `GET /api/submissions`, `POST /api/submissions`

Leaderboard: `GET /api/leaderboard`

Teams: `GET /api/teams`, `GET /api/teams/:id`, `POST /api/teams`, `POST /api/teams/:id/join`

Badges: `GET /api/badges`, `GET /api/students/:id/badges`

## Folder Structure

```txt
campus-quest/
  client/
    src/
      components/
      pages/
      services/
      layouts/
      utils/
      assets/
    package.json
    vite.config.js
    .env.example
  server/
    src/
      routes/
      controllers/
      services/
      db/
      utils/
      app.js
      server.js
    database/
    package.json
    .env.example
  package.json
  README.md
  TESTING.md
  .gitignore
```


## Running Tests

Campus Quest includes beginner-friendly tests for both sides of the app.

Run all tests from the root folder:

```bash
npm test
```

Run only backend API tests:

```bash
npm run test --prefix server
```

Run only frontend React tests:

```bash
npm run test --prefix client
```

Backend tests live in `server/tests/api.test.js`. They show how to test health checks, seeded challenges, student creation, challenge completion, Duplicate level completion rejection, badge unlocking, and leaderboard sorting.

Frontend tests live beside the UI code in `client/src/components/__tests__` and `client/src/pages/__tests__`. They show how to render components, check text on screen, test links, fill a form, and mock an API call.

## Common Errors

Port already in use: stop the process using port `3000` or `5173`, then run `npm run dev` again.

Frontend cannot reach backend: check `client/.env`, make sure `VITE_API_URL=http://localhost:3000/api`, and confirm the backend says `Campus Quest API running`.

SQLite install error: install a current Node.js LTS version, delete `node_modules` in `server`, and run `npm run setup` again.

## Reset SQLite Database

Stop the server, delete `server/database/campus.db`, then run:

```bash
npm run dev
```

The server will recreate the database and seed data.

## Add a Challenge

Use the API:

```bash
curl -X POST http://localhost:3000/api/challenges \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"New Quest\",\"description\":\"Build something useful\",\"category\":\"React\",\"difficulty\":\"Easy\",\"points\":10,\"requirements\":\"Show your working feature.\"}"
```

You can also edit `server/src/data/seeds.js` before the first database creation.

## Modify the UI

Most screens live in `client/src/pages`. Reusable UI lives in `client/src/components`. Global styling lives in `client/src/styles/main.css`. Tailwind theme settings live in `client/tailwind.config.js`.

## Deployment Guide

### Vercel Frontend

1. Create a new Vercel project from this repository.
2. Set the root directory to `client`.
3. Add `VITE_API_URL=https://your-render-service.onrender.com/api`.
4. Deploy.

### Render Backend

1. Create a PostgreSQL database on Render.
2. Create a Web Service from this repository.
3. Set the root directory to `server`.
4. Build command: `npm install`.
5. Start command: `npm start`.
6. Add environment variables:

```env
PORT=3000
DB_TYPE=postgres
DATABASE_URL=<your-render-postgres-url>
CLIENT_URL=https://your-vercel-app.vercel.app
```

Do not depend on SQLite persistence for production on Render.

## MAKE CAMPUS QUEST YOUR OWN

### LEVEL 1

- Change application colors
- Change logo
- Add a new quiz level
- Change dashboard welcome message

### LEVEL 2

- Add search to quiz levels
- Add category filters
- Add student avatars
- Add new badges
- Add leaderboard filters

### LEVEL 3

- Add charts
- Add quiz explanation notes
- Add streaks
- Add an admin page
- Add team-specific quiz levels

### LEVEL 4

- Add AI-generated challenges
- Add real authentication
- Add QR code challenge joining
- Add notifications
- Add advanced analytics

## Remaining Limitations

- Authentication is intentionally simple for workshops.
- Marking a challenge complete trusts the student.
- There is no admin screen yet.
- Production file uploads, emails, and notifications are not included.



