import {z} from 'zod';

export const scheduleSchema = z.object({
    title: z.string().min(5,"Title must be of 5 characters"),
    description: z.string().min(5, "Description must be of 5 characters"),
    roleOffered: z.string(),
    candidateEmail: z.string(),
    date: z.string()
})