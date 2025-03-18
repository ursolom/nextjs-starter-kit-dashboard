import bcrypt from "bcryptjs";
import config from "@/config";

export function formatForm<T extends Record<string, any>>(formData: FormData): T {
    return Object.fromEntries(formData.entries()) as T;
}

