import { Hono } from "hono";
import {
  handleAddWorkExperience,
  handleDeleteWorkExperience,
  handleFetchUser,
  handleFindCandidates,
  handleProfileUpdate,
  handleSkillsUpdate,
  handleUpdateWorkExperience,
  handleUserLogin,
  handleUserLogout,
  handleUserSignup,
} from "../controllers/user";
import { protectRoute } from "../utils/protectRoute"; 

const userRoutes = new Hono();

userRoutes.post("/signup", handleUserSignup);
userRoutes.post("/login", handleUserLogin);
userRoutes.post("/logout", protectRoute, handleUserLogout);
userRoutes.get("/fetch-user", protectRoute, handleFetchUser);
userRoutes.put("/profile-update", protectRoute, handleProfileUpdate);
userRoutes.put("/skills-update", protectRoute, handleSkillsUpdate);
userRoutes.post("/add-work-experience", protectRoute, handleAddWorkExperience);
userRoutes.put("/update-work-experience/:id", protectRoute, handleUpdateWorkExperience);
userRoutes.delete("/delete-work-experience/:id", protectRoute, handleDeleteWorkExperience);
userRoutes.post("/find-candidates", protectRoute, handleFindCandidates);

export default userRoutes;
