import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
const isProduction = false;

export const generateTokenAndSetCookie = async (payload: any, c: Context) => {

  const jwt = await sign(
    {
      id: payload,
    },
    c.env.JWT_SECRET
  );
  setCookie(c, "token", jwt, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: isProduction ? "None" : "Lax",
  });
};

export const clearUserCookie = async (c: Context) => {
  setCookie(c, "token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: "/",
    sameSite: isProduction ? "None" : "Lax",
  });
}