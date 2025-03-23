"use server";
import { User } from "@prisma/client";
import { db } from "./db";
import { deleteSession, refreshSession, verifySession } from "./session";
import { cache } from "react";
import { isValidObjectId } from "@/helpers";
import { RefreshTokenPayload } from "@/types";
import { cookies } from "next/headers";

export async function LogoutUser(session: RefreshTokenPayload) {
    await deleteSession();
    await refreshSession(session);
    return {
        message: "logout successful"
    }
}

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session.success) { return null };

    if (!isValidObjectId(session.userId)) {
        console.log("------------------------------------------------------------------------------")
        console.log("hello world")
        const cookie = await cookies();
        const getCookies = cookie.get("session")
        console.log(getCookies)
        cookie.delete("session")
        await refreshSession(session);
        return null
    };
    const user = await db.user.findUnique({ where: { id: session.userId } });
    if (!user) {
        await LogoutUser(session)
        return null
    };
    return {
        id: user.id,
        name: user.name,
        role: user.role,
    };
});

export const getUserInClient = async () => {
    const user = await getUser();
    if (!user) return null;
    return user as User;
};

