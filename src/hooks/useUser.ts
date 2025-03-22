"use client";

import { getUserInClient } from "@/lib/user";
import { type User } from "@prisma/client";
import { useState, useEffect, useTransition } from "react";

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        startTransition(async () => {
            const userData = await getUserInClient();
            if (!userData) {
                setUser(null);
                setMessage("User not authorized");
            } else {
                setUser(userData);
                setMessage(null);
            }
        });
    }, []);

    const isAdmin = user?.role === "ADMIN";

    return { user, loading, message, isAdmin };
}
