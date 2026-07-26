import { IncidentDiagnosticTraceDTO } from "@/src/types/incident";
import { Play, RefreshCw, SlidersHorizontal } from "lucide-react";


interface IncidentDiagnosticPanelProps {
    onRunTrace: () => void;
    isTracing: boolean;
    latestTrace?: IncidentDiagnosticTraceDTO;
}

export function IncidentDiagnosticPanel({
    onRunTrace,
    isTracing,
    latestTrace,
}: IncidentDiagnosticPanelProps) {
    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Diagnostic Probe Engine
                </span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase">Manual Probe</span>
            </div>

            <p className="text-xs text-zinc-400 font-sans">
                Dispatch an isolated HTTP probe to test endpoint responsiveness and assess current system status.
            </p>

            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2 font-mono text-xs text-zinc-300">
                {latestTrace ? (
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                            <span className={latestTrace.successful ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                                {latestTrace.successful ? "SUCCESS" : "FAILED"} (HTTP {latestTrace.statusCode})
                            </span>
                            <span className="text-zinc-500">{latestTrace.responseTimeMs}ms</span>
                        </div>
                        <p className="text-zinc-300 text-[11px]">{latestTrace.message}</p>
                    </div>
                ) : (
                    <div className="text-center py-4 text-zinc-600 italic">No manual trace recorded yet.</div>
                )}
            </div>

            <button
                onClick={onRunTrace}
                disabled={isTracing}
                className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black hover:bg-zinc-200 disabled:opacity-50 text-xs font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
                {isTracing ? (
                    <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Executing Trace...</span>
                    </>
                ) : (
                    <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Execute Manual Trace</span>
                    </>
                )}
            </button>
        </div>
    );
}