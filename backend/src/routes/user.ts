import { Hono } from "hono";
import { handleUserLogin, handleUserSignup } from "../controllers/user";

const userRoutes = new Hono();

userRoutes.post("/signup", handleUserSignup);
userRoutes.post("/login", handleUserLogin);
export default userRoutes;
