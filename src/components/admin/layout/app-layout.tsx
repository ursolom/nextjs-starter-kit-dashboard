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

    const filteredSegments = segments.slice(2);

    const breadcrumbs: BreadcrumbItem[] = filteredSegments.map((segment, index) => ({
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: "/" + filteredSegments.slice(0, index + 1).join("/"),
    }));
    console.log("breadcrumbs==============", breadcrumbs);
    console.log("segments==============", segments);

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppSidebarLayout>
    );
}
