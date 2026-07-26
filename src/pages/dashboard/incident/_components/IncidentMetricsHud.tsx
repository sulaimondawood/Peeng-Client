import { IncidentOverview } from "@/src/types/incident";
import { Clock, Cpu, Network, Users } from "lucide-react";


interface IncidentMetricsHudProps {
    overview: IncidentOverview;
}

export function IncidentMetricsHud({ overview }: IncidentMetricsHudProps) {
    const formatDuration = (seconds: number | null) => {
        if (seconds === null || seconds === undefined) return "—";
        const mins = Math.max(1, Math.round(seconds / 60));
        return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl">
            <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                    Outage Duration
                </span>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-bold text-white font-mono">
                        {formatDuration(overview.outageDuration)}
                    </span>
                </div>
            </div>

            <div className="space-y-1 sm:border-l border-zinc-800 sm:pl-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                    Target Endpoint
                </span>
                <div className="flex items-center gap-1.5 truncate">
                    <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-sm font-bold text-zinc-200 truncate">{overview.monitor?.name}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono block truncate">
                    {overview.monitor?.url}
                </span>
            </div>

            <div className="space-y-1 sm:border-l border-zinc-800 sm:pl-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                    Check Status
                </span>
                <div className="flex items-center gap-1.5">
                    <Network className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white font-mono">
                        {overview.monitor?.status}
                    </span>
                </div>
            </div>

            <div className="space-y-1 sm:border-l border-zinc-800 sm:pl-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                    Assigned Owner
                </span>
                <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-zinc-200 truncate font-mono">
                        {overview.assignedTo || "Unassigned"}
                    </span>
                </div>
            </div>
        </div>
    );
}