
import type { IncidentDTO, IncidentFilterRequest, Meta } from "@/src/types/incident";
import {
    ArrowRight,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Download,
    List,
    Maximize2,
    Minimize2,
    Table,
} from "lucide-react";
import { exportIncidentsCsv, formatDuration, getIncidentTitle } from "../utils";
import { IncidentFilters } from "./IncidentFilters";
import { IncidentLedgerSkeleton } from "./skeletons/IncidentLedgerSkeleton";

interface Props {
    incidents: IncidentDTO[];
    meta?: Meta;
    filters: IncidentFilterRequest;
    isLoading: boolean;
    isExpanded: boolean;
    viewMode: "list" | "table";
    hasActiveFilters: boolean;
    monitorOptions: { id: string; name: string }[];
    onViewModeChange: (mode: "list" | "table") => void;
    onExpandToggle: () => void;
    onFilterChange: (patch: Partial<IncidentFilterRequest>) => void;
    onResetFilters: () => void;
    onSelect: (id: string) => void;
    onPrevPage: () => void;
    onNextPage: () => void;
}

export function IncidentLedger({
    incidents,
    meta,
    filters,
    isLoading,
    isExpanded,
    viewMode,
    hasActiveFilters,
    monitorOptions,
    onViewModeChange,
    onExpandToggle,
    onFilterChange,
    onResetFilters,
    onSelect,
    onPrevPage,
    onNextPage,
}: Props) {
    const page = filters.page ?? 0;
    const size = filters.size ?? 25;
    const totalItems = meta?.totalElements ?? 0;
    const totalPages = Math.max(meta?.totalPages ?? 1, 1);

    if (isLoading) {
        return (
            <IncidentLedgerSkeleton
                count={size}
                viewMode={viewMode}
                isExpanded={isExpanded}
            />
        );
    }

    return (
        <div className="space-y-4">
            <div className="px-1 flex items-center justify-between border-b border-slate-900 pb-2">
                <div className="space-y-0.5">
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                        System Audit Ledger
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono">
                        Incident Archive & Forensics
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => exportIncidentsCsv(incidents)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="hidden sm:inline">Export</span>
                    </button>

                    <div className="flex bg-slate-950 p-0.5 rounded border border-slate-800">
                        <button
                            onClick={() => onViewModeChange("list")}
                            className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === "list"
                                ? "bg-slate-800 text-white"
                                : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => onViewModeChange("table")}
                            className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === "table"
                                ? "bg-slate-800 text-white"
                                : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            <Table className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <button
                        onClick={onExpandToggle}
                        className="p-1.5 rounded bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                        {isExpanded ? (
                            <Minimize2 className="w-3.5 h-3.5" />
                        ) : (
                            <Maximize2 className="w-3.5 h-3.5" />
                        )}
                    </button>
                </div>
            </div>

            {viewMode === "table" && (
                <IncidentFilters
                    filters={filters}
                    monitorOptions={monitorOptions}
                    hasActiveFilters={hasActiveFilters}
                    isExpanded={isExpanded}
                    onChange={onFilterChange}
                    onReset={onResetFilters}
                />
            )}

            {viewMode === "list" ? (
                <div className="space-y-3">
                    {incidents.map((inc) => (
                        <div
                            key={inc.id}
                            onClick={() => onSelect(inc.id)}
                            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer space-y-3 shadow-md group"
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={`inline-flex items-center text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full border ${inc.status === "OPEN" || inc.status === "INVESTIGATING"
                                        ? "bg-rose-950/20 text-rose-400 border-rose-900/30"
                                        : "bg-emerald-950/20 text-emerald-400 border-emerald-900/30"
                                        }`}
                                >
                                    {inc.status}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDuration(inc.durationSeconds)}
                                </span>
                            </div>
                            <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                                {getIncidentTitle(inc)}
                            </h4>
                            <div className="text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
                                <span>
                                    Node:{" "}
                                    <strong className="text-slate-300">
                                        {inc.monitor?.name ?? "—"}
                                    </strong>
                                </span>
                                <span className="text-indigo-400 flex items-center gap-0.5">
                                    Trace <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    ))}
                    {incidents.length === 0 && (
                        <div className="text-center p-8 border border-dashed border-slate-800 rounded-xl text-xs font-mono text-slate-500">
                            No matching incidents logged.
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-950/40">
                                    {isExpanded ? (
                                        <>
                                            <th className="px-4 py-3">Incident</th>
                                            <th className="px-4 py-3">Target Node</th>
                                            <th className="px-4 py-3 text-center">Status</th>
                                            <th className="px-4 py-3 text-center">Severity</th>
                                            <th className="px-4 py-3 text-right">Duration</th>
                                            <th className="px-4 py-3 text-center">Trace</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="px-3 py-2.5">Incident & Node</th>
                                            <th className="px-3 py-2.5 text-center">Status</th>
                                            <th className="px-3 py-2.5 text-center">Severity</th>
                                            <th className="px-3 py-2.5 text-right">Duration</th>
                                            <th className="px-3 py-2.5 text-center">Trace</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {incidents.map((inc) => (
                                    <tr
                                        key={inc.id}
                                        onClick={() => onSelect(inc.id)}
                                        className="hover:bg-slate-950/30 transition-colors cursor-pointer text-xs group"
                                    >
                                        <td className={isExpanded ? "px-4 py-3.5" : "px-3 py-3"}>
                                            <div className="font-semibold text-slate-200 group-hover:text-indigo-400 truncate max-w-[220px]">
                                                {getIncidentTitle(inc)}
                                            </div>
                                            {!isExpanded && (
                                                <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                                                    {inc.monitor?.name ?? "—"}
                                                </div>
                                            )}
                                        </td>
                                        {isExpanded && (
                                            <td className="px-4 py-3.5 font-mono text-slate-200">
                                                {inc.monitor?.name ?? "—"}
                                            </td>
                                        )}
                                        <td className="px-3 py-3 text-center">
                                            <span
                                                className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold border ${inc.status === "OPEN" ||
                                                    inc.status === "INVESTIGATING"
                                                    ? "bg-rose-950/20 text-rose-400 border-rose-900/30"
                                                    : "bg-emerald-950/20 text-emerald-400 border-emerald-900/30"
                                                    }`}
                                            >
                                                {inc.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span
                                                className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold ${inc.severity === "CRITICAL"
                                                    ? "bg-rose-950/20 text-rose-400 border border-rose-900/30"
                                                    : "bg-amber-950/20 text-amber-400 border border-amber-900/30"
                                                    }`}
                                            >
                                                {inc.severity ?? "—"}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-right font-mono text-slate-400">
                                            {formatDuration(inc.durationSeconds)}
                                        </td>
                                        <td className="px-3 py-3 text-center text-indigo-400 font-mono">
                                            →
                                        </td>
                                    </tr>
                                ))}
                                {totalItems === 0 && (
                                    <tr>
                                        <td
                                            colSpan={isExpanded ? 6 : 5}
                                            className="px-4 py-8 text-center text-slate-500 font-mono text-xs"
                                        >
                                            {hasActiveFilters
                                                ? "No ledger items match active filter metrics."
                                                : "No system incidents logged."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalItems > 0 && (
                        <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/30 flex items-center justify-between flex-wrap gap-2 text-[10px] font-mono uppercase text-slate-500">
                            <div>
                                Showing{" "}
                                <strong className="text-slate-300">
                                    {page * size + 1}
                                </strong>{" "}
                                to{" "}
                                <strong className="text-slate-300">
                                    {Math.min(totalItems, (page + 1) * size)}
                                </strong>{" "}
                                of <strong className="text-slate-300">{totalItems}</strong>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={onPrevPage}
                                    disabled={page === 0}
                                    className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                                    {page + 1} / {totalPages}
                                </span>
                                <button
                                    onClick={onNextPage}
                                    disabled={meta?.last ?? true}
                                    className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                                >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}