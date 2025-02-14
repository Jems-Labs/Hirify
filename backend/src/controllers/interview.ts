import { Context } from "hono";
import { prismaClient } from "../utils/prismaClient";
import { scheduleSchema } from "../zod/interviewSchemas";

export async function handleScheduleInterview(c: Context) {
  const prisma = prismaClient(c);
  const { id } = c.get("user");
  const data = await c.req.json();
  try {
    const validatedData = scheduleSchema.safeParse(data);
    if (!validatedData.success) {
      return c.json(
        {
          msg: "Invalid inputs",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const {title,description, roleOffered, candidateEmail, date} = validatedData.data;
    if(!id) return c.json({msg: "Unauthorized"}, 401);

    const newInterview = await prisma.interview.create({
        data: {
            title,
            description,
            roleOffered,
            candidateEmail,
            date,
            interviewerId: id
        }
    })
    if(!newInterview){
        return c.json({msg: "Scheduling interview failed"}, 400);
    }
    return c.json(newInterview, 200)
  } catch (error) {
    return c.json({msg: "Internal Server Error"}, 500);
  }
}
