
import { SlidersHorizontal } from "lucide-react";
import type { IncidentFilterRequest } from "@/src/types/incident";
import { DATE_PRESETS } from "../utils";

interface Props {
    filters: IncidentFilterRequest;
    monitorOptions: { id: string; name: string }[];
    hasActiveFilters: boolean;
    isExpanded: boolean;
    onChange: (patch: Partial<IncidentFilterRequest>) => void;
    onReset: () => void;
}

export function IncidentFilters({
    filters,
    monitorOptions,
    hasActiveFilters,
    isExpanded,
    onChange,
    onReset,
}: Props) {
    return (
        <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    <SlidersHorizontal className="w-3 h-3 text-indigo-400" />
                    <span>Ledger Filters</span>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={onReset}
                        className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 cursor-pointer"
                    >
                        Reset Filters
                    </button>
                )}
            </div>

            <div
                className={`grid gap-3 ${isExpanded
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2"
                    }`}
            >
                <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        Status
                    </label>
                    <select
                        value={filters.status ?? ""}
                        onChange={(e) =>
                            onChange({ status: e.target.value || undefined })
                        }
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none cursor-pointer"
                    >
                        <option value="">All Statuses</option>
                        <option value="OPEN">OPEN</option>
                        <option value="INVESTIGATING">INVESTIGATING</option>
                        <option value="RESOLVED">RESOLVED</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        Monitor Node
                    </label>
                    <select
                        value={filters.monitorId ?? ""}
                        onChange={(e) =>
                            onChange({ monitorId: e.target.value || undefined })
                        }
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none cursor-pointer"
                    >
                        <option value="">All Monitors</option>
                        {monitorOptions.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        Date Range
                    </label>
                    <select
                        value={filters.dateBucket ?? ""}
                        onChange={(e) =>
                            onChange({
                                dateBucket: e.target.value || undefined,
                                startDate: undefined,
                                endDate: undefined,
                                date: undefined,
                            })
                        }
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none cursor-pointer"
                    >
                        {DATE_PRESETS.map((p) => (
                            <option key={p.label} value={p.value ?? ""}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>

                {filters.dateBucket === "CUSTOM" && (
                    <div className="sm:col-span-2 flex gap-2">
                        <div className="flex-1">
                            <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                                Start
                            </label>
                            <input
                                type="date"
                                value={filters.startDate ?? ""}
                                onChange={(e) =>
                                    onChange({ startDate: e.target.value || undefined })
                                }
                                className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2 py-1.5 focus:outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                                End
                            </label>
                            <input
                                type="date"
                                value={filters.endDate ?? ""}
                                onChange={(e) =>
                                    onChange({ endDate: e.target.value || undefined })
                                }
                                className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2 py-1.5 focus:outline-none"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}