import { Hono } from "hono";
import { handle } from "hono/vercel";
import { serveStatic } from "@hono/node-server/serve-static";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.use(
  "/uploads/*",
  serveStatic({
    root: "./",
    rewriteRequestPath(path) {
      return path.replace("/api", "");
    },
  })
);

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);
