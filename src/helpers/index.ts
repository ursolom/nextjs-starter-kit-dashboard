import bcrypt from "bcryptjs";
import config from "@/config";

export function formatForm<T extends Record<string, any>>(formData: FormData): T {
    return Object.fromEntries(formData.entries()) as T;
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
