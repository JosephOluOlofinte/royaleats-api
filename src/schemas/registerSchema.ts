import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email().min(5).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export default registerSchema;