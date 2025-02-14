import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export async function protectRoute(c: Context, next: any) {
  try {
    const token = getCookie(c, "token");
    if (!token) {
      return c.json({ error: "Unauthorized: No token provided" }, 401);
    }
    const payload = await verify(token, c.env.JWT_SECRET);

    const { id } = payload;
    c.set("user", { id });
    return next();
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}
