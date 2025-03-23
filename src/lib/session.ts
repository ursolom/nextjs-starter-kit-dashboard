import "server-only";
import config from "@/config";
import { CookieConfig, RefreshTokenPayload, SessionPayload, SessionResponse } from "@/types";
import { type Role } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(config.env.secretKey);

// Session cookie configuration
export const cookieConfig: CookieConfig = {
    name: "session", // ----> Cookie name
    options: {
        httpOnly: true, // ---> Prevents JavaScript access (enhances security)
        secure: process.env.NODE_ENV === "production", // Only enabled in production
        sameSite: "lax", // Helps mitigate CSRF attacks
        path: "/" // Available across the entire site
    },
    duration: 24 * 60 * 60 * 1000, // Session duration (24 hours)
};

/**
 * Encrypts session data into a JSON Web Token (JWT)
 * @param payload Session data (userId, role, expires)
 * @returns Encrypted session token
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
    return new SignJWT({ ...payload, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(secretKey);
}

/**
 * Decrypts and verifies the session token
 * @param session The session token stored in cookies
 * @returns Session data or null if invalid
 */

export async function decrypt(session: string): Promise<RefreshTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(session, secretKey, { algorithms: ["HS256"] });
        if (!payload.exp) return null;
        return payload as RefreshTokenPayload;
    } catch (error) {
        return null;
    }
}

/**
 * Creates a session and stores it in cookies after login
 * @param userId The user's unique ID
 * @param role The user's role
 */

export async function createSession(userId: string, role: Role) {
    const expires = new Date(Date.now() + cookieConfig.duration);
    const session = await encrypt({ userId, role, expires });
    const cookiesStore = await cookies();
    cookiesStore.set(cookieConfig.name, session, { ...cookieConfig.options, expires });
}

/**
 * Verifies the stored session in cookies
 * @returns Session data or an error message if invalid
 */

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

/**
 * Deletes the session from cookies (logout)
 */
export async function deleteSession() {
    const cookiesStore = await cookies();
    cookiesStore.delete(cookieConfig.name);
    return {
        status: 200,
        message: "Logged out successfully"
    };
}

/**
 * Refreshes the session when needed (e.g., extending session time)
 * @param session The current session data
 */
export async function refreshSession(session: RefreshTokenPayload) {
    if (!session.userId) return;

    const expires = new Date(Date.now() + cookieConfig.duration);
    const newSession = await encrypt({ userId: session.userId, role: session.role, expires });

    const cookiesStore = await cookies();
    cookiesStore.set(cookieConfig.name, newSession, { ...cookieConfig.options, expires });
}

/**
 * **How to Use:**
 * 
 * 1. **Create a session after login:**
 *    ```ts
 *    await createSession(user.id, user.role);
 *    ```
 * 
 * 2. **Verify session in protected routes:**
 *    ```ts
 *    const session = await verifySession();
 *    if (!session.success) {
 *       return new Response("Unauthorized", { status: 401 });
 *    }
 *    ```
 * 
 * 3. **Delete session on logout:**
 *    ```ts
 *    await deleteSession();
 *    ```
 * 
 * 4. **Refresh session when needed:**
 *    ```ts
 *    await refreshSession(currentSession);
 *    ```
 */
