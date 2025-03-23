import { getUrl, type UrlData } from "@/helpers";
import AppSidebarLayout from "./app-sidebar-layout";

export type BreadcrumbItem = {
    title: string;
    href: string;
};

export type AppLayoutProps = {
    children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
    const { segments }: UrlData = await getUrl();
    const breadcrumbs: BreadcrumbItem[] = segments.map((segment, index) => ({
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: "/" + segments.slice(0, index + 1).join("/"),
    }));

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppSidebarLayout>
    );
}
