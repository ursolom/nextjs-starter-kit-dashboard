import { NextRequest, NextResponse } from "next/server";
import { LOGGED_OUT_ROUTES, PAGES, PUBLIC_ROUTES } from "./constants";
import { cookieStore, redirectMiddleware } from "./helpers";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

export default async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;
    const cookiesStore = await cookies()
    const cookie = cookiesStore.get('session')?.value;
    //  check for valid session
    const session = await decrypt(cookie as string)
    // redirect unauthed users
    if (session?.userId) {
        return redirectMiddleware(PAGES.PUBLIC.AUTH.LOGIN, req)
    }
    //  render route
    const response = NextResponse.next()
    return response;
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}