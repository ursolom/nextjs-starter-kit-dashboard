"use client";

import { useUser } from "@/hooks/useUser";

export default function Account() {
    const { user, loading, refreshUser } = useUser();

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <button onClick={refreshUser} className="btn">
                🔄 Refresh User
            </button>
        </div>
    )
}