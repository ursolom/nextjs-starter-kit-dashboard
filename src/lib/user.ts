import { db } from "./db";
import { verifySession } from "./session";

export const getUser = async () => {
    const session = await verifySession();
    if (!session.success) return null;

    if (session.role === "ADMIN") {
        return await db.user.findUnique({
            where: { id: session.userId, role: "ADMIN" },
        });
    } else if (session.role === "USER") {
        return await db.user.findUnique({
            where: { id: session.userId, role: "USER" },
        });
    }
    return null;
};
