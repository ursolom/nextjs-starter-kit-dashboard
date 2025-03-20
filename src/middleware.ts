import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookieConfig, decrypt } from './lib/session';
import { PAGES } from './constants';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const reqHeader = new Headers(req.headers);

    reqHeader.set("x-url", req.url);

    const response = NextResponse.next({
        request: { headers: reqHeader },
    });

    const userProtectedPages = ["account"];
    const adminProtectedPages = ["admin"];

    const isUserPage = userProtectedPages.some((page) => pathname.startsWith(`/${page}`));
    const isAdminPage = adminProtectedPages.some((page) => pathname.startsWith(`/${page}`));


    const sessionToken = req.cookies.get(cookieConfig.name)?.value;
    const session = sessionToken ? await decrypt(sessionToken) : null;

    if (!session || !session.userId) {

        if (isUserPage) return NextResponse.redirect(new URL(PAGES.PUBLIC.AUTH.LOGIN, req.url));

        if (isAdminPage) return NextResponse.redirect(new URL(PAGES.ADMIN.LOGIN, req.url));

        return response;
    }

    if (isAdminPage && session.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (isUserPage && session.role === 'ADMIN') {
        return NextResponse.redirect(new URL(PAGES.ADMIN.LOGIN, req.url));
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
