
import { ArrowRight, CheckCircle } from "lucide-react";
import type { IncidentDTO } from "@/src/types/incident";
import { getIncidentTitle, formatDuration } from "../utils";
import { ActiveOutagesSkeleton } from "./skeletons/ActiveOutagesSkeleton";

interface Props {
    incidents: IncidentDTO[];
    isLoading: boolean;
    onSelect: (id: string) => void;
}

export function ActiveOutagesPanel({ incidents, isLoading, onSelect }: Props) {
    if (isLoading) return <ActiveOutagesSkeleton count={2} />;

    return (
        <div className="space-y-4">
            <div className="px-1 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    Unresolved Defect Alarms
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-950/20 text-rose-400 font-mono text-[10px] uppercase border border-rose-900/40">
                    {incidents.length} active
                </span>
            </div>

            <div className="space-y-3">
                {incidents.length > 0 && incidents.map((inc) => (
                    <div
                        key={inc.id}
                        onClick={() => onSelect(inc.id)}
                        className="p-5 rounded-xl bg-slate-900 border border-rose-900/35 hover:border-rose-900/50 transition-all cursor-pointer group space-y-4 shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                    <span className="text-xs font-mono text-rose-400 uppercase font-bold tracking-wider">
                                        {inc?.severity ?? "UNKNOWN"} SEVERITY FAULT
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-100 group-hover:text-rose-400 transition-colors leading-snug">
                                    {getIncidentTitle(inc)}
                                </h4>
                                <p className="text-xs text-slate-500 font-mono">
                                    Target Node:{" "}
                                    <span className="text-slate-300 font-semibold">
                                        {inc.monitor?.name ?? "—"}
                                    </span>
                                </p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded">
                                Elapsed: {formatDuration(inc.durationSeconds)}
                            </span>
                        </div>

                        <div className="border-t border-slate-800 pt-3.5 flex items-center justify-between">
                            <div className="flex gap-1">
                                <span className="px-1.5 py-0.5 rounded font-mono text-[9px] text-slate-400 border border-slate-800 bg-slate-950">
                                    Notifications Sent
                                </span>
                                <span className="px-1.5 py-0.5 rounded font-mono text-[9px] text-slate-400 border border-slate-800 bg-slate-950">
                                    Diagnostics Logged
                                </span>
                            </div>
                            <span className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-bold group-hover:text-indigo-300">
                                Investigate Trace
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </div>
                ))}

                {incidents.length === 0 && (
                    <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/20 font-mono text-xs space-y-3.5 text-slate-500">
                        <CheckCircle className="w-8 h-8 text-emerald-500/50 mx-auto" />
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-slate-300">
                                Optimal operational baseline verified.
                            </p>
                            <p className="text-[10px] text-slate-500">
                                No unresolved critical outages pending action.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}