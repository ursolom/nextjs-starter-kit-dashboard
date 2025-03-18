"use server";

import { formatForm } from "@/helpers";
import { db } from "@/lib/db";
import { handleServerError } from "@/types/handleServerError";
import { loginSchema, registerSchema } from "@/validation/authValidation";
import bcrypt from "bcryptjs";


export async function registerAction(prevState: unknown, formData: FormData) {
    const validation = registerSchema.safeParse(formatForm(formData))
    const { data, error, success } = validation;

    if (!success) {
        return {
            status: 400,
            error: error.formErrors.fieldErrors,
            formData,
        };
    }

    const { name, email, password } = data
    try {
        // check if the email is already registered
        const user = await db.user.findUnique({
            where: {
                email
            },
        });
        if (user) {
            return {
                error: { email: ["This email is already in use"] },
                status: 409,
                formData,
            };

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return {
            status: 201,
            message: "User registered successfully",
        };

    } catch (error) {
        return handleServerError(error, "Registration failed, please try again");
    }
}


//-------------------->  login user  <--------------------------

export async function loginAction(prevState: unknown, formData: FormData) {
    const validation = loginSchema.safeParse(formatForm(formData))
    const { data, error, success } = validation;
    if (!success) {
        return {
            status: 400,
            error: error.formErrors.fieldErrors,
            formData,
        };
    }
    try {
        return {
            message: "sucesslly",
            status: 200
        };
    } catch (error) {
        return {
            message: `error in server please tray again`,
            status: 500,
        }
    }
}