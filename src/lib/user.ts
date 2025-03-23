"use server";
import { User } from "@prisma/client";
import { db } from "./db";
import { deleteSession, refreshSession, verifySession } from "./session";
import { cache } from "react";
import { isValidObjectId } from "@/helpers";
import { RefreshTokenPayload } from "@/types";
import { cookies } from "next/headers";

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session.success) { return null };

    if (!isValidObjectId(session.userId)) {
        console.log("------------------------------------------------------------------------------");
        console.log("hello world");

        const cookieStore = await cookies();
        const getCookies = cookieStore.get("session");
        console.log("-------------------------------------before-----------------------------------------");
        console.log(getCookies);
        await deleteSession();
        console.log("-------------------------------------after-----------------------------------------");
        console.log(getCookies);
        return null
    };
    const user = await db.user.findUnique({ where: { id: session.userId } });
    if (!user) {
        await deleteSession();
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

