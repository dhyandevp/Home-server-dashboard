import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 overflow-auto relative">
                <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />
                <div className="relative z-10 px-8 py-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
