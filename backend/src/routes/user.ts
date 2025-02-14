import { Hono } from "hono";
import {
  handleFetchUser,
  handleUserLogin,
  handleUserLogout,
  handleUserSignup,
} from "../controllers/user";
import { protectRoute } from "../utils/protectRoute";

const userRoutes = new Hono();

userRoutes.post("/signup", handleUserSignup);
userRoutes.post("/login", handleUserLogin);
userRoutes.post("/logout", protectRoute, handleUserLogout)
userRoutes.get("/fetch-user", protectRoute, handleFetchUser);

export default userRoutes;
