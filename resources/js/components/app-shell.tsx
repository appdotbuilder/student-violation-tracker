import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';
import { SidebarProvider } from '@/components/ui/sidebar';
import { type BreadcrumbItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    breadcrumbs?: BreadcrumbItem[];
}

export function AppShell({ children, variant = 'sidebar', breadcrumbs = [] }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar />
            <main className="flex flex-1 flex-col">
                <AppHeader breadcrumbs={breadcrumbs} />
                <AppContent>
                    {children}
                </AppContent>
            </main>
        </SidebarProvider>
    );
}
