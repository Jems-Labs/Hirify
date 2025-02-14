import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";
import { loginSchema, signupSchema } from "../zod/userSchemas";
import { passwordHash, passwordCompare } from "../utils/passwordHash";
import {
  clearUserCookie,
  generateTokenAndSetCookie,
} from "../utils/generateToken";
import { setCookie } from "hono/cookie";

export async function handleUserSignup(c: Context) {
  const prisma = prismaClient(c); // Initialize Prisma client
  const data = await c.req.json(); // Parse request body

  try {
    // Validate user input using Zod schema
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { name, email, password } = validatedData.data;

    // Check if user already exists
    const isUserExists = await prisma.user.findFirst({
      where: { email },
    });

    if (isUserExists) {
      return c.json({ msg: "User already exists" }, 400);
    }

    // Hash the password before storing it
    const hashedPassword = await passwordHash(password);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // If user creation fails, return an error
    if (!newUser) {
      return c.json({ msg: "Error in creating a user" }, 400);
    }

    // Generate token and set cookie for authentication
    generateTokenAndSetCookie(newUser.id, c);

    return c.json(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      { status: 200 }
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleUserLogin(c: Context) {
  const prisma = prismaClient(c); // Initialize Prisma client
  const data = await c.req.json(); // Parse request body

  try {
    // Validate user input using Zod schema
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const { email, password } = validatedData.data;

    // Check if the user exists
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return c.json({ msg: "User not found" }, 404);
    }

    // Verify the password
    const isPasswordValid = passwordCompare(password, user.password);
    if (!isPasswordValid) {
      return c.json({ msg: "Invalid credentials" }, 401);
    }

    // Generate token and set cookie for authentication
    generateTokenAndSetCookie(user.id, c);

    return c.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      { status: 200 }
    );
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleUserLogout(c: Context) {
  const { id } = c.get("user");
  try {
    if (!id) {
      return c.json({ msg: "Unauthorized: No token provided" }, 401);
    }
    clearUserCookie(c);

    return c.json({ msg: "Logout successful" }, 200);
  } catch (error) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
}

export async function handleFetchUser(c: Context) {
  const prisma = prismaClient(c);
  const { id } = c.get("user");
  try {
    if (!id) {
      return c.json({ msg: "Unauthorized: No token provided" }, 401);
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return c.json({ msg: "User not found" }, 404);
    }
    return c.json(user, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
