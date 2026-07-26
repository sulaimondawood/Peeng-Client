import { IncidentResponse } from '@/src/types/monitor';
import { PATHS } from '@/src/utils/routes/paths';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MonitorIncidentsSidebarProps {
    incidents: IncidentResponse[];
    isLoading: boolean;
}

export function MonitorIncidentsSidebar({ incidents, isLoading }: MonitorIncidentsSidebarProps) {
    const navigate = useNavigate();

    return (
        <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono px-1">
                Associated Incidents
            </h2>

            <div className="space-y-2">
                {isLoading ? (
                    <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-950 text-xs text-zinc-500 font-mono">
                        Loading incidents...
                    </div>
                ) : incidents.length === 0 ? (
                    <div className="p-8 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 font-mono text-xs space-y-2 text-zinc-500">
                        <ShieldCheck className="w-6 h-6 text-emerald-500/60 mx-auto" />
                        <p className="font-semibold text-zinc-400">Zero active incidents</p>
                        <p className="text-[10px] text-zinc-600">No recent outages recorded for this endpoint.</p>
                    </div>
                ) : (
                    incidents.map((inc) => (
                        <div
                            key={inc.id}
                            onClick={() => navigate(PATHS.DASHBOARD.INCIDENTS.DETAILS(inc.id))}
                            className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-colors cursor-pointer space-y-1.5"
                        >
                            <div className="flex items-center justify-between text-xs">
                                <span
                                    className={`font-mono text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded border ${inc.status === 'OPEN'
                                        ? 'bg-red-950/50 border-red-900/60 text-red-400'
                                        : inc.status === 'INVESTIGATING'
                                            ? 'bg-amber-950/50 border-amber-900/60 text-amber-400'
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                                        }`}
                                >
                                    {inc.status}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500">{inc.severity}</span>
                            </div>
                            <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                                {inc.latestErrorMessage || 'HTTP check threshold failure'}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}