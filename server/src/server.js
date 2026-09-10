import "./config/loadEnv.js";
import { app } from "./app.js";
import { db } from "./db/index.js";

const port = process.env.PORT || 3000;

async function startServer() {
  await db.initialize();
  app.listen(port, () => {
    console.log(`Campus Quest API running at http://localhost:${port}`);
    console.log(`Database mode: ${db.type}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start Campus Quest API:", error);
  process.exit(1);
});
