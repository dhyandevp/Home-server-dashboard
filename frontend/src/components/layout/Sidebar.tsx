import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
    LayoutDashboard,
    Container,
    Settings,
    ScrollText,
    LogOut,
    Network
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Docker', href: '/docker', icon: Container },
    { name: 'Logs', href: '/logs', icon: ScrollText },
    { name: 'Network', href: '/network', icon: Network },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const { pathname } = useLocation();
    const { logout } = useAuth();

    return (
        <aside className="hidden h-screen w-64 flex-col border-r border-border bg-panel px-3 py-4 md:flex">
            <div className="mb-8 flex items-center px-2">
                <h1 className="text-xl font-bold tracking-tight">Battlestation</h1>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-base",
                            pathname === item.href ? "bg-accent text-base" : "text-muted"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="border-t pt-4">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
