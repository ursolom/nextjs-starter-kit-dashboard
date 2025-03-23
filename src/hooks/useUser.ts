"use client";

import { getUserInClient } from "@/lib/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type User } from "@prisma/client";

export function useUser() {
    const queryClient = useQueryClient();

    const { data: user, isLoading, error } = useQuery<User | null>({
        queryKey: ["user"],
        queryFn: getUserInClient,
        staleTime: 1000 * 60 * 5,
    });

    const refreshUser = async () => {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
    };
    const logout = async () => {
        await fetch("/api/logout", { method: "POST" });
        refreshUser();
    };

    const isAdmin = user?.role === "ADMIN";

    return { user, loading: isLoading, message: error ? "User not authorized" : null, isAdmin, refreshUser, logout };
}
