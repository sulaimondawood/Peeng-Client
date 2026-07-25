import {
    Activity,
    AlertTriangle,
    FileText,
    Monitor as MonitorIcon,
    Settings,
    Users,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarNavProps {
    collapsed: boolean;
    onNavigateMobile?: () => void;
}

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Activity },
    { path: '/monitors', label: 'Monitors', icon: MonitorIcon },
    { path: '/incidents', label: 'Incidents', icon: AlertTriangle },
    { path: '/status-pages', label: 'Status Pages', icon: FileText },
    { path: '/members', label: 'Team Members', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings },
];

export function SidebarNav({ collapsed, onNavigateMobile }: SidebarNavProps) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {!collapsed && (
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 font-mono">
                    Monitoring
                </div>
            )}
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);

                return (
                    <button
                        key={item.path}
                        onClick={() => {
                            navigate(item.path);
                            onNavigateMobile?.();
                        }}
                        className={`flex items-center w-full text-xs rounded transition-colors ${collapsed ? 'p-2.5 justify-center' : 'px-3 py-2 gap-2.5'
                            } ${isActive
                                ? 'bg-zinc-800 text-white font-medium'
                                : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
                            }`}
                        title={collapsed ? item.label : undefined}
                    >
                        <Icon
                            className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500'
                                }`}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                );
            })}
        </nav>
    );
}