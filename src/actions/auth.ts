"use server";

import { formatForm } from "@/helpers";
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
        // const hashedPassword =  await 
    } catch (error) {
        return {
            message: `error in server please tray again`,
            status: 500,
        }
    }
}
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