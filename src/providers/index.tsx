"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster
                toastOptions={{
                    style: {
                        backgroundColor: "transparent",
                        color: "#fff",
                        border: "1px solid #ffffff20",
                        backdropFilter: "blur(4px)",
                    },
                }}
                position="bottom-right"
            />
            {children}
        </QueryClientProvider>
    )
}
