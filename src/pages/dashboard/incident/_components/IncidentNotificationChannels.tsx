import { IncidentNotificationTraceDTO } from "@/src/types/incident";
import { BellDot, Mail } from "lucide-react";


interface IncidentNotificationChannelsProps {
    notifications?: IncidentNotificationTraceDTO[];
}

export function IncidentNotificationChannels({ notifications = [] }: IncidentNotificationChannelsProps) {
    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-1.5">
                    <BellDot className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Escalation Channels
                </span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase">Audit Log</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-zinc-400">
                {notifications.length === 0 ? (
                    <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center text-zinc-500 text-xs italic">
                        No dispatch traces recorded for this incident.
                    </div>
                ) : (
                    notifications.map((trace, idx) => (
                        <div
                            key={trace.id || idx}
                            className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-between gap-2.5"
                        >
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                                    <span className="text-zinc-200 block font-bold font-sans">
                                        {trace.channel || "Email Alert"}
                                    </span>
                                </div>
                                {trace.sentAt && (
                                    <span className="text-[10px] text-zinc-500 block">
                                        {new Date(trace.sentAt).toLocaleString()}
                                    </span>
                                )}
                            </div>
                            <span
                                className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider border ${trace.status === "DELIVERED" || trace.status === "SENT"
                                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/50"
                                    : "bg-red-950/40 text-red-400 border-red-900/50"
                                    }`}
                            >
                                {trace.status || "DISPATCHED"}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}