import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import path from "path";

const app = new Hono();

const port = 3000;
const appName = process.env.APP_NAME;

app.use("/images/*", serveStatic({ root: "./" }));

app.get("/", async (c) => {
  console.log("Request served by bun app");

  // Read the HTML file and return its content
  const file = Bun.file("index.html");
  const html = await file.text();

  return c.html(html);
});

Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`Hono server running ${appName} on http://localhost:${port}`);
