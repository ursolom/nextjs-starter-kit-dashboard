import "server-only";
import config from "@/config";
import { CookieConfig, RefreshTokenPayload, SessionPayload, SessionResponse } from "@/types";
import { type Role } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(config.env.secretKey);

export const cookieConfig: CookieConfig = {
    name: "session",
    options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    },
    duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload): Promise<string> {
    return new SignJWT({ ...payload, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(secretKey);
}

export async function decrypt(session: string): Promise<RefreshTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(session, secretKey, { algorithms: ["HS256"] });
        if (!payload.exp) return null;
        return payload as RefreshTokenPayload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string, role: Role) {
    const expires = new Date(Date.now() + cookieConfig.duration);
    const session = await encrypt({ userId, role, expires });
    const cookiesStore = await cookies();
    cookiesStore.set(cookieConfig.name, session, { ...cookieConfig.options, expires });
}

export async function verifySession(): Promise<SessionResponse> {
    const cookiesStore = await cookies();
    const sessionToken = cookiesStore.get(cookieConfig.name)?.value;
    if (!sessionToken) {
        return {
            success: false,
            status: 401,
            message: "Unauthorized",
        };
    }
    const session = await decrypt(sessionToken);
    if (!session?.userId) {
        return {
            success: false,
            status: 401,
            message: "Unauthorized",
        };
    }
    return {
        success: true,
        userId: session.userId,
        role: session.role,
        expires: new Date(session.expires),
    };
}

// export async function refreshSession() {
//     const session = await verifySession();
//     if (session.expires.getTime() - Date.now() < 30 * 60 * 1000) {
//         await createSession(session.userId, session.role);
//     }
// }

export async function deleteSession() {
    const cookiesStore = await cookies();
    cookiesStore.delete(cookieConfig.name);
    return {
        status: 200,
        message: "log out successfully"
    };
}
