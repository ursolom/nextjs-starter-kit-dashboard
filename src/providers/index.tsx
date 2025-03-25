"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes"
const queryClient = new QueryClient()

export function Providers({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
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
