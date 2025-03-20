import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookieConfig, decrypt, encrypt } from './lib/session';

export async function middleware(request: NextRequest) {
    let session = request.cookies.get(cookieConfig.name)?.value;

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const verified = await decrypt(session);
    if (!verified) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete(cookieConfig.name);
        return response;
    }

    if (verified.exp * 1000 - Date.now() < 30 * 60 * 1000) {
        const newSession = await encrypt({
            userId: verified.userId,
            expires: new Date(Date.now() + cookieConfig.duration)
        });

        const response = NextResponse.next();
        response.cookies.set({
            name: cookieConfig.name,
            value: newSession,
            ...cookieConfig.options,
            expires: new Date(Date.now() + cookieConfig.duration)
        });
        return response;
    }

    return NextResponse.next();
}