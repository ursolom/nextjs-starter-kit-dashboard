import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function formatForm<T extends Record<string, any>>(formData: FormData): T {
    return Object.fromEntries(formData.entries()) as T;
}

export function redirectMiddleware(urlToRedirect: string, req: NextRequest) {
    const url = req.nextUrl.clone();
    url.pathname = urlToRedirect;
    return NextResponse.redirect(url);
}

export type UrlData = {
    url: string;
    admin: boolean;
    segments: string[];
};
export async function getUrl(): Promise<UrlData> {
    const url = (await headers()).get("x-url") as string;
    const segments = url.split("/").filter(Boolean);
    const admin = segments.includes("admin");
    return { url, admin, segments };
}
export function isValidObjectId(id: string): boolean {
    return /^[a-fA-F0-9]{24}$/.test(id);
}
