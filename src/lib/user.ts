"use server";
import { User } from "@prisma/client";
import { db } from "./db";
import { verifySession } from "./session";
import { cache } from "react";

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session.success) return null;

    const user = await db.user.findUnique({
        where: { id: session.userId },
    });

    if (!user) return null;

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

