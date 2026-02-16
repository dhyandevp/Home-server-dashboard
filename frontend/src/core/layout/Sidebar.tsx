import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Container,
    Network,
    HardDrive,
    Settings,
    ShieldCheck,
    Activity,
    TerminalSquare
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Observability', path: '/' },
    { icon: Container, label: 'Containers', path: '/containers' },
    { icon: HardDrive, label: 'Storage', path: '/storage', disabled: true },
    { icon: Network, label: 'Network', path: '/network', disabled: true },
    { icon: ShieldCheck, label: 'Security', path: '/security', disabled: true },
    { icon: TerminalSquare, label: 'Terminal', path: '/terminal', disabled: true },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl">
            <div className="flex h-16 items-center px-6 border-b border-slate-800/50">
                <Activity className="mr-2 h-6 w-6 text-cyan-500" />
                <span className="text-lg font-bold tracking-tight text-slate-100">Battlestation</span>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={(e) => item.disabled && e.preventDefault()}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all group relative overflow-hidden",
                            item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                            isActive
                                ? "bg-cyan-500/10 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] border-l-2 border-cyan-500"
                                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                        {item.disabled && (
                            <span className="ml-auto text-[10px] uppercase font-bold text-slate-700 bg-slate-900 px-1.5 py-0.5 rounded">
                                Soon
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800/50">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-200">Commander</span>
                        <span className="text-xs text-slate-500">System Admin</span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={logout}
                >
                    Disconnect
                </Button>
            </div>
        </aside>
    );
}
