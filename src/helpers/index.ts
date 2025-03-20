import { cookies } from "next/headers";

export function formatForm<T extends Record<string, any>>(formData: FormData): T {
    return Object.fromEntries(formData.entries()) as T;
}


export const cookieStore = await cookies()