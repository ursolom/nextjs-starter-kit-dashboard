import { db } from "./db";
import { verifySession } from "./session";

export const getUser = async () => {
    const session = await verifySession();
    if (!session.success) return null;

    const user = await db.user.findUnique({
        where: { id: session.userId },
    });

    if (!user) return null;

    return {
        ...user,
        isAdmin: user.role === "ADMIN",
    };
};
