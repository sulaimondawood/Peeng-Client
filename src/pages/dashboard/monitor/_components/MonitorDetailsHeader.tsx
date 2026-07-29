
import { PATHS } from '@/src/utils/routes/paths';
import { ArrowLeft, Download, Loader2, Pause, Play, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { MonitorResponse } from '@/src/types/dashboard';


interface MonitorDetailsHeaderProps {
  monitor: MonitorResponse;
  onExportCsv: () => void;
  onToggle: () => void;
  onDelete: () => void;
  isExportDisabled: boolean;
  isTogglePending: boolean;
  isDeletePending: boolean;
}

export function MonitorDetailsHeader({
  monitor,
  onExportCsv,
  onToggle,
  onDelete,
  isExportDisabled,
  isTogglePending,
  isDeletePending,
}: MonitorDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => navigate(PATHS.DASHBOARD.MONITORS.LIST)}
          className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-white tracking-tight truncate">
              {monitor.name}
            </h1>
            <StatusBadge status={monitor.status} lifecycle={monitor.lifecycle} />
          </div>
          <p className="text-xs text-zinc-500 font-mono truncate mt-0.5" title={monitor.url}>
            <span className="text-zinc-400 uppercase font-semibold mr-1">{monitor.method}</span>
            {monitor.url}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onExportCsv}
          disabled={isExportDisabled}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-40 rounded-lg text-xs font-mono transition-colors uppercase cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span>Export CSV</span>
        </button>

        <button
          onClick={onToggle}
          disabled={isTogglePending}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
        >
          {isTogglePending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
              <span>{monitor.lifecycle === "PAUSED" ? "Resuming..." : "Pausing..."}</span>
            </>
          ) : monitor.lifecycle === "PAUSED" ? (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resume Monitor</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-500" />
              <span>Pause Monitor</span>
            </>
          )}
        </button>

        <button
          onClick={onDelete}
          disabled={isDeletePending}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-red-900/40 bg-red-950/20 hover:bg-red-900/40 text-red-400 rounded-lg text-xs transition-colors cursor-pointer font-mono uppercase"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}