import config from "@/config";
import { PAGES } from "@/constants";
import { cookieStore } from "@/helpers";
import { CookieConfig, RefreshTokenPayload, SessionPayload } from "@/types";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const loginPage = PAGES.PUBLIC.AUTH.LOGIN;

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
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secretKey);
}

export async function decrypt(token: string): Promise<RefreshTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ["HS256"],
        });
        return payload as RefreshTokenPayload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string): Promise<void> {
    const expires = new Date(Date.now() + cookieConfig.duration);
    const session = await encrypt({ userId, expires });

    cookieStore.set(
        cookieConfig.name,
        session,
        {
            ...cookieConfig.options,
            expires
        }
    );
}

export async function verifySession(): Promise<SessionPayload> {
    const sessionToken = cookieStore.get(cookieConfig.name)?.value;

    if (!sessionToken) redirect(loginPage);

    const session = await decrypt(sessionToken);
    if (!session?.userId) redirect(loginPage);

    return {
        userId: session.userId,
        expires: new Date(session.expires)
    };
}

export async function refreshSession(): Promise<void> {
    const session = await verifySession();
    if (session.expires.getTime() - Date.now() < 30 * 60 * 1000) {
        await createSession(session.userId);
    }
}

export async function deleteSession(): Promise<void> {
    cookieStore.delete(cookieConfig.name);
    redirect(loginPage);
}
