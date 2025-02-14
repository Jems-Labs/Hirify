import { Hono } from "hono";
import { protectRoute } from "../utils/protectRoute";
import { handleScheduleInterview } from "../controllers/interview";

const interviewRoutes = new Hono();

interviewRoutes.post("/schedule", protectRoute, handleScheduleInterview);


export default interviewRoutes