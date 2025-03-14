import { usePathname, useRouter } from "next/navigation";

export async function useAuth({ middleware, redirectIfAuthenticated }: { middleware: string, redirectIfAuthenticated: boolean }) {
    const router = useRouter()
    const pathName = usePathname()
}
