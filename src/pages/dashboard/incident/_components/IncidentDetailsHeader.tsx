
import { MonitorResponse } from "@/src/types/dashboard";
import { PATHS } from "@/src/utils/routes/paths";
import { ArrowLeft, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface IncidentDetailsHeaderProps {
    incidentId: string;
    monitor?: MonitorResponse;
}

export function IncidentDetailsHeader({ incidentId, monitor }: IncidentDetailsHeaderProps) {
    const navigate = useNavigate();

    const copyId = () => {
        navigator.clipboard.writeText(incidentId);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={() => navigate(PATHS.DASHBOARD.INCIDENTS.LIST)}
                    className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="space-y-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
                        <span className="text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                            Ref: <span className="text-zinc-300">{incidentId}</span>
                            <button onClick={copyId} title="Copy Incident ID" className="hover:text-white">
                                <Copy className="w-3 h-3 text-zinc-600 hover:text-zinc-300 cursor-pointer ml-0.5" />
                            </button>
                        </span>
                    </div>

                    <h1 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">
                        {monitor ? `Incident on ${monitor.name}` : "Incident Details"}
                    </h1>
                </div>
            </div>
        </div>
    );
}