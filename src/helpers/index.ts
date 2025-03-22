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

export async function getUrl() {
    const url = (await headers()).get("x-url");
    const admin = url?.includes("/admin");
    return { url, admin };
}