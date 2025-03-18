'use server';

import { loginSchema, registerSchema } from "@/validation/authValidation";

function formatFormData(formData: FormData) {
    return Object.fromEntries(formData.entries());
}

export async function registerAction(
    prevState: unknown,
    formData: FormData
) {
    const validated = registerSchema.safeParse(formatFormData(formData));

    if (!validated.success) {
        console.log(validated.error.flatten().fieldErrors)
        console.log("=============================")
        console.log(error.formErrors.fieldErrors)
        return {
            status: 'error',
            fieldErrors: validated.error.flatten().fieldErrors,
            message: 'البيانات المدخلة غير صالحة',
        };
    }

    try {
        return {
            status: 'success',
            message: 'تم التسجيل بنجاح',
        };
    } catch (error) {
        console.error('Register error:', error);
        return {
            status: 'error',
            message: 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى',
        };
    }
}

export async function loginAction(
    prevState: unknown,
    formData: FormData
) {
    const validated = loginSchema.safeParse(formatFormData(formData));

    if (!validated.success) {
        return {
            status: 'error',
            fieldErrors: validated.error.flatten().fieldErrors,
            message: 'بيانات الدخول غير صحيحة',
        };
    }

    try {
        return {
            status: 'success',
            message: 'تم الدخول بنجاح',
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            status: 'error',
            message: 'حدث خطأ أثناء الدخول، يرجى المحاولة مرة أخرى',
        };
    }
}

