import { z } from 'zod'

export const signupUserSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
});

export const signinUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const createBlogSchema = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string(),
});

export const updateBlogSchema = z.object({
    title: z.string(),
    content: z.string()
});

export type SignupUserSchema = z.infer<typeof signupUserSchema>;
export type SigninUserSchema = z.infer<typeof signinUserSchema>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;

