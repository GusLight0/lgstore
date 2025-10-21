import { Hono } from "hono";
import { cors } from "hono/cors";
const app = new Hono<{ Bindings: Env }>();

interface Env {
  // Declare suas variáveis aqui
  MY_SECRET: string;
}

// Configure CORS
app.use("*", cors({
  origin: "*",
  allowHeaders: ["Content-Type"],
  allowMethods: ["POST", "GET", "OPTIONS"],
}));

export default app;
