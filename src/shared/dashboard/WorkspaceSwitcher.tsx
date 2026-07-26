import { MembershipSession } from "@/src/types/auth";
import { PATHS } from "@/src/utils/routes/paths";
import { Check, ChevronDown, LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface WorkspaceSwitcherProps {
    collapsed: boolean;
    currentMembership: MembershipSession | null;
    memberships: MembershipSession[];
    onSelectWorkspace: (membership: MembershipSession) => void;
    onLogout: () => void;
}

export function WorkspaceSwitcher({
    collapsed,
    currentMembership,
    memberships,
    onSelectWorkspace,
    onLogout,
}: WorkspaceSwitcherProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()


    if (!currentMembership) {
        return null;
    }

    if (collapsed) {
        return (
            <div className="p-4 flex justify-center border-b border-zinc-900">
                <div
                    className="w-7 h-7 bg-zinc-100 rounded flex items-center justify-center font-bold text-xs text-zinc-900"
                    title={currentMembership.workspaceName}
                >
                    {currentMembership.workspaceName.charAt(0).toUpperCase()}
                </div>
            </div>
        );
    }

    return (
        <div className="relative p-3 border-b border-zinc-900">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-zinc-900 transition-colors text-left"
            >
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 bg-zinc-100 rounded flex items-center justify-center font-bold text-xs text-zinc-900 shrink-0">
                        {currentMembership.workspaceName.charAt(0).toUpperCase()}
                    </div>
                    <div className="truncate min-w-0">
                        <div className="text-xs font-semibold text-zinc-100 truncate">
                            {currentMembership.workspaceName}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                            {currentMembership.role}
                        </div>
                    </div>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
            </button>

            {open && (
                <div className="absolute left-3 right-3 top-14 p-1 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl z-50 space-y-1">
                    <div className="px-2 py-1 text-[10px] font-semibold uppercase text-zinc-500 font-mono">
                        Workspaces
                    </div>

                    {memberships.map((m) => (
                        <button
                            key={m.tenantId}
                            onClick={() => {
                                onSelectWorkspace(m);
                                setOpen(false);
                            }}
                            className={`flex items-center justify-between w-full px-2 py-1.5 text-xs rounded text-left ${m.tenantId === currentMembership.tenantId
                                ? "bg-zinc-800 text-white font-medium"
                                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                                }`}
                        >
                            <span className="truncate">{m.workspaceName}</span>
                            {m.tenantId === currentMembership.tenantId && (
                                <Check className="w-3.5 h-3.5 text-zinc-300" />
                            )}
                        </button>
                    ))}

                    <div className="border-t border-zinc-800 my-1 pt-1 space-y-0.5">
                        <button
                            onClick={() =>
                                navigate(PATHS.ONBOARDING.NO_WORKSPACE)
                            }
                            className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" /> Create Workspace
                        </button>

                        <button
                            onClick={() => {
                                setOpen(false);
                                onLogout();
                            }}
                            className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-red-400 hover:bg-zinc-800 rounded transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" /> Log out
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
}