import { NextRequest, NextResponse } from "next/server";
import { LOGGED_OUT_ROUTES, PAGES, PUBLIC_ROUTES } from "./constants";
import { cookies } from "next/headers";
import { decrypt, refreshSession } from "./lib/session";
import { redirectMiddleware } from "./helpers";
import { Role } from "@prisma/client";

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const reqHeader = new Headers(req.headers);
    reqHeader.set("x-url", req.url);
    const response = NextResponse.next({ request: { headers: reqHeader } });
    let session = await decrypt(cookie as string);
    if (session?.userId) {
        console.log(session.expires)
        console.log(Number(session.expires) > Date.now())
        await refreshSession(session);
        session = await decrypt(cookie as string);
    }

    // ---------------------------pages
    const isAdminRoute = pathname.startsWith(PAGES.ADMIN.DASHBOARD);
    const protectedPages = ["account", "admin"];
    const isProtectedPage = protectedPages.some(page => pathname.startsWith(`/${page}`));
    // ---------------------------

    // Redirect authenticated users from logged-out routes
    if (session?.userId && LOGGED_OUT_ROUTES.includes(pathname)) {
        return redirectMiddleware(
            session.role === Role.ADMIN ? PAGES.ADMIN.DASHBOARD : PAGES.USER.ACCOUNT,
            req
        );
    }
    // Redirect unauthenticated users from protected pages
    if (!session?.userId && isProtectedPage) {
        return redirectMiddleware(
            isAdminRoute ? PAGES.ADMIN.LOGIN : PAGES.PUBLIC.AUTH.LOGIN,
            req
        );
    }
    // Role-based access control
    if (session?.userId) {
        if (isAdminRoute && session.role !== Role.ADMIN) {
            return redirectMiddleware(PAGES.USER.ACCOUNT, req);
        }
    }

    return response;
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};