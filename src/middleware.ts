import { NextRequest, NextResponse } from "next/server";
import { LOGGED_OUT_ROUTES, PAGES, PUBLIC_ROUTES } from "./constants";
import { cookies } from "next/headers";
import { cookieConfig, decrypt, refreshSession } from "./lib/session";
import { redirectMiddleware } from "./helpers";
import { Role } from "@prisma/client";

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const cookieStore = await cookies();
    const cookie = cookieStore.get(cookieConfig.name)?.value;
    const reqHeader = new Headers(req.headers);
    reqHeader.set("x-url", req.url); // this is url use in server
    const response = NextResponse.next({ request: { headers: reqHeader } });

    let session = await decrypt(cookie as string);

    if (session?.userId) {
        console.log(session.expires);
        console.log(Number(session.expires) > Date.now());

        if (!cookie) {
            return;
        } else {
            await refreshSession(session);
        }
    }

    // --------------------------- Protected Pages ---------------------------

    const fullyProtectedPages = ["account", "admin"]; // Fully protected, including subpages
    const singleProtectedPages = ["products", "categories"]; // Only the main page is protected

    // Check if the page is fully protected (e.g., /admin, /admin/settings)
    const isFullyProtectedPage = fullyProtectedPages.some(page => pathname.startsWith(`/${page}`));

    // Check if the page is exactly one of the single protected pages (e.g., /products, but not /products/123)
    const isSingleProtectedPage = singleProtectedPages.some(page => pathname === `/${page}`);

    // -----------------------------------------------------------------------

    // Redirect authenticated users away from logged-out pages
    if (session?.userId && LOGGED_OUT_ROUTES.includes(pathname)) {
        return redirectMiddleware(
            session.role === Role.ADMIN ? PAGES.ADMIN.DASHBOARD : PAGES.USER.ACCOUNT,
            req
        );
    }

    // Redirect unauthenticated users from fully protected or single protected pages
    if (!session?.userId && (isFullyProtectedPage || isSingleProtectedPage)) {
        return redirectMiddleware(
            isFullyProtectedPage ? PAGES.ADMIN.LOGIN : PAGES.PUBLIC.AUTH.LOGIN,
            req
        );
    }

    // Role-based access: Prevent non-admin users from accessing admin routes
    if (session?.userId && pathname.startsWith(PAGES.ADMIN.DASHBOARD) && session.role !== Role.ADMIN) {
        return redirectMiddleware(PAGES.USER.ACCOUNT, req);
    }

    return response;
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
