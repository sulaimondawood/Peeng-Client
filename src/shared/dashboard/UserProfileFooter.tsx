import { useState } from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InitialsAvatar from '../InitialsAvatar';
import { UserSession } from '@/src/types/auth';


interface UserProfileFooterProps {
    collapsed: boolean;
    user: UserSession | null;
    onLogout: () => void;
}

export function UserProfileFooter({
    collapsed,
    user,
    onLogout,
}: UserProfileFooterProps) {
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);

    if (collapsed) {
        return (
            <div className="p-4 border-t border-zinc-900 flex justify-center">
                <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    title={user?.name}
                    className="hover:opacity-80 transition-opacity"
                >
                    <InitialsAvatar name={user?.name} size="sm" />
                </button>
            </div>
        );
    }

    return (
        <div className="p-3 border-t border-zinc-900 relative">
            <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 w-full text-left p-1.5 rounded hover:bg-zinc-900 transition-colors"
            >
                <InitialsAvatar name={user?.name} size="sm" />
                <div className="truncate min-w-0">
                    <div className="text-xs font-semibold text-zinc-200 truncate leading-none">
                        {user?.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono truncate mt-1">
                        {user?.email}
                    </div>
                </div>
            </button>

            {profileOpen && (
                <div className="absolute bottom-16 left-3 right-3 p-1 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl z-50 space-y-1 text-xs">
                    <button
                        onClick={() => {
                            setProfileOpen(false);
                            navigate('/settings');
                        }}
                        className="flex items-center gap-2 w-full px-2 py-1.5 text-zinc-300 hover:bg-zinc-800 rounded text-left"
                    >
                        <UserIcon className="w-3.5 h-3.5" /> Profile Settings
                    </button>
                    <button
                        onClick={() => {
                            setProfileOpen(false);
                            onLogout();
                        }}
                        className="flex items-center gap-2 w-full px-2 py-1.5 text-red-400 hover:bg-zinc-800 rounded text-left"
                    >
                        <LogOut className="w-3.5 h-3.5" /> Log out
                    </button>
                </div>
            )}
        </div>
    );
}