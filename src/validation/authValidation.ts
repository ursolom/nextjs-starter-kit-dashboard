import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Please enter your name" })
            .max(50, { message: "Name must not exceed 50 characters" }),

        email: z
            .string()
            .trim()
            .email({
                message: "Please enter a valid email address",
            })
            .min(2, { message: "Please enter an email address" })
            .max(50, { message: "Email must not exceed 50 characters" }),

        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(50, { message: "Password must not exceed 50 characters" }),
        confirmPassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(50, { message: "Password must not exceed 50 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type ValidationErrors =
    | {
        [key: string]: string[];
    }
    | undefined;
