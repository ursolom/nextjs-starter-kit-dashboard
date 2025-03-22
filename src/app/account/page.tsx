"use client";

import { useUser } from "@/hooks/useUser";

export default function Account() {
    const { user } = useUser();
    return (
        <div className="container mx-auto min-h-screen relative">
            <div>
                hello {user?.name}
            </div>
        </div>
    )
}