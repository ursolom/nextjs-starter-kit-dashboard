import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { AppShell } from './app-shell';
import { AppSidebar } from './app-sidebar';
import { AppContent } from './app-content';
import { AppSidebarHeader } from './app-sidebar-header';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}