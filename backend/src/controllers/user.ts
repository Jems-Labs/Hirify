import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";
import {
  loginSchema,
  signupSchema,
  workExperienceSchema,
} from "../zod/userSchemas";
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
    const isPasswordValid = await passwordCompare(password, user.password);
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
        bio: true,
        roles: true,
        skills: true,
        status: true,
        workExperience: true,
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

export async function handleProfileUpdate(c: Context) {
  const prisma = prismaClient(c);
  const data = await c.req.json();
  const { id } = c.get("user");
  try {
    const { name, email, bio, status } = data;
    const updatedProfile = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        bio,
        status,
      },
    });

    if (!updatedProfile)
      return c.json({ msg: "Error in updating profile" }, 400);

    return c.json({ msg: "Updated Profile" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function handleSkillsUpdate(c: Context) {
  const prisma = prismaClient(c);
  const data = await c.req.json();
  const { id } = c.get("user");
  try {
    const { selectedRoles, selectedSkills } = data;
    const updatedSkills = await prisma.user.update({
      where: {
        id,
      },
      data: {
        roles: selectedRoles,
        skills: selectedSkills,
      },
    });

    if (!updatedSkills) {
      return c.json({ msg: "Error in updating skills" }, 400);
    }
    return c.json({ msg: "Updated Skills" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function handleAddWorkExperience(c: Context) {
  const prisma = prismaClient(c);
  const data = await c.req.json();
  const { id } = c.get("user");
  try {
    const validatedData = workExperienceSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }
    const { employer, role, fromDate, toDate, description } =
      validatedData.data;
    const newExperience = await prisma.workExperience.create({
      data: {
        employer,
        role,
        fromDate,
        toDate,
        description,
        userId: id,
      },
    });
    if (!newExperience)
      return c.json({ msg: "Failed to add new experience" }, 400);

    return c.json({ msg: "Added New Experience" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function handleUpdateWorkExperience(c: Context) {
  const prisma = prismaClient(c);
  const data = await c.req.json();
  const id = parseInt(c.req.param("id"), 10);
  try {
    const { employer, role, fromDate, toDate, description } = data;
    const updatedExperience = await prisma.workExperience.update({
      where: { id },
      data: { employer, role, fromDate, toDate, description },
    });
    return c.json({ msg: "Updated Work Experience" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
export async function handleDeleteWorkExperience(c: Context) {
  const prisma = prismaClient(c);
  const id = parseInt(c.req.param("id"), 10);
  try {
    const existingWorkExperience = await prisma.workExperience.findUnique({
      where: { id },
    });

    if (!existingWorkExperience) {
      return c.json({ error: "Work experience not found" }, 404);
    }
    await prisma.workExperience.delete({
      where: { id },
    });
    return c.json({ msg: "Work experience deleted successfully" }, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function handleFindCandidates(c: Context) {
  const prisma = prismaClient(c);
  const data = await c.req.json();
  const { id } = c.get("user"); 

  try {
    const { roles = [], skills = [], query } = data;

    const candidates = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: id } },
          query
            ? {
                OR: [
                  { name: { contains: query, mode: "insensitive" } },
                  { roles: { hasSome: [query] } },
                  { skills: { hasSome: [query] } },
                ],
              }
            : {},
          roles.length > 0 ? { roles: { hasSome: roles } } : {},
          skills.length > 0 ? { skills: { hasSome: skills } } : {},
        ],
      },
    });

    if (candidates.length === 0) {
      return c.json({ msg: "No Candidate found" }, 404);
    }
    
    return c.json(candidates, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
