import { NextRequest, NextResponse } from "next/server";
import { LOGGED_OUT_ROUTES, PUBLIC_ROUTES } from "./constants";
import { cookieStore } from "./helpers";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;
    const cookiesStore = await cookies()
    const session = cookiesStore.get('session')?.value;

    console.log(session)
    const response = NextResponse.next()
    return response
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}