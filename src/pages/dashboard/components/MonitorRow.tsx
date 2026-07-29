
import { MonitorResponse } from "@/src/types/dashboard";
import { PATHS } from "@/src/utils/routes/paths";
import { Loader2, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToggleMonitor } from "../monitor/hooks/use-monitor";

export function MonitorRow({ m }: { m: MonitorResponse }) {
    const navigate = useNavigate();

    const toggleMonitor = useToggleMonitor();
    const isPaused = m.lifecycle === "PAUSED";
    const isPending = toggleMonitor.isPending;

    const viewMonitor = (id: string) => {
        navigate(PATHS.DASHBOARD.MONITORS.DETAILS(id));
    };

    return (
        <div
            key={m.id}
            className="p-3.5 flex items-center justify-between hover:bg-slate-800/40 transition-colors group"
        >
            <div
                onClick={() => viewMonitor(m.id)}
                className="flex items-center gap-3 cursor-pointer min-w-0 flex-1 mr-4"
            >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${m.status === 'UP' ? 'bg-emerald-500' :
                    m.status === 'DOWN' ? 'bg-rose-500' :
                        m.status === 'PAUSED' ? 'bg-amber-500' : 'bg-slate-500'
                    }`} />
                <div className="truncate">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
                            {m.name}
                        </h3>
                    </div>
                    <p className="text-xs text-slate-400 truncate font-mono mt-0.5">{m.url}</p>
                </div>
            </div>


            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <span className="text-xs text-slate-300 block font-mono">

                        {m?.latestResponseTimeMs > 0 ? `${m?.latestResponseTimeMs}ms` : '—'}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">latency</span>
                </div>

                <div className="text-right hidden sm:block">
                    <span className={`text-xs block font-mono font-medium ${m.status === 'UP' ? 'text-emerald-400' :
                        m.status === 'DOWN' ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                        {m.status}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">status</span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => toggleMonitor.mutate(m.id)}
                        disabled={toggleMonitor.isPending}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                        title={m.status === 'PAUSED' ? 'Resume Monitor' : 'Pause Monitor'}
                    >
                        {isPending ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
                        ) : isPaused ? (
                            <Play className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                            <Pause className="w-3.5 h-3.5 text-amber-400" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}