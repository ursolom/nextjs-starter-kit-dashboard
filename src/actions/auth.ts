"use server";

import { registerSchema } from "@/validation/authValidation";




export async function registerAction(prevState: unknown, formData: FormData) {
    const inputs = Object.fromEntries(formData.entries())
    const validation = registerSchema.safeParse(inputs)
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
            message:"sucesslly",
            status:200
        };
    } catch (error) {
        return {
            message: `error in server please tray again`,
            status: 500,
        }
    }
}
export async function loginAction(prevState: unknown, formData: FormData) {
    // 
}