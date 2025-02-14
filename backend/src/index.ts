import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoutes from "./routes/user";
import interviewRoutes from "./routes/interview";

const app = new Hono();
app.use(
  "*",
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use("*", (c, next) => {
  c.header("Access-Control-Allow-Origin", "http://localhost:5173");
  c.header("Access-Control-Allow-Credentials", "true");
  return next();
});

app.route("/api/user", userRoutes);
app.route("/api/interview", interviewRoutes);


export default app;
