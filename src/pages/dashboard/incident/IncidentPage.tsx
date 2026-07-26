import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIncidentFilters } from "./hooks/use-incident-filters";
import { useIncidents, useOpenedIncidents } from "./hooks/use-incident";
import { ActiveOutagesPanel } from "./_components/ActiveOutagesPanel";
import { IncidentLedger } from "./_components/IncidentLedger";
import { useMonitors } from "../monitor/hooks/use-monitor";

export default function IncidentPages() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "table">("table");
  const [isExpanded, setIsExpanded] = useState(false);

  const { filters, apiFilters, setFilters, resetFilters } =
    useIncidentFilters();

  const listQuery = useIncidents(apiFilters);
  const openedQuery = useOpenedIncidents();

  const incidents = listQuery.data?.data ?? [];
  const meta = listQuery.data?.meta;
  const openedIncidents = openedQuery.data ?? [];

  const { data: monitorsResponse } = useMonitors();

  const monitorOptions = useMemo(() => {
    const monitors = monitorsResponse?.items || [];
    return monitors.map((m) => ({ id: m.id, name: m.name }));
  }, [monitorsResponse]);

  const hasActiveFilters = Boolean(
    filters.status ||
    filters.monitorId ||
    filters.dateBucket ||
    filters.startDate ||
    filters.endDate ||
    filters.date
  );

  const viewIncidentTrace = (id: string) => {
    navigate(`/dashboard/incidents/${id}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Incident Desk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track active system outages, alert escalations, and diagnostic
            forensics.
          </p>
        </div>

        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded transition-colors cursor-pointer"
          >
            ← Back to Split View
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {!isExpanded && (
          <div className="lg:col-span-2">
            <ActiveOutagesPanel
              incidents={openedIncidents}
              isLoading={openedQuery.isLoading}
              onSelect={viewIncidentTrace}
            />
          </div>
        )}

        <div className={isExpanded ? "lg:col-span-3" : "lg:col-span-1"}>
          <IncidentLedger
            incidents={incidents}
            meta={meta}
            filters={filters}
            isLoading={listQuery.isLoading}
            isExpanded={isExpanded}
            viewMode={viewMode}
            hasActiveFilters={hasActiveFilters}
            monitorOptions={monitorOptions}
            onViewModeChange={setViewMode}
            onExpandToggle={() => setIsExpanded((v) => !v)}
            onFilterChange={setFilters}
            onResetFilters={resetFilters}
            onSelect={viewIncidentTrace}
            onPrevPage={() => {
              if ((filters.page ?? 0) > 0) {
                setFilters({ page: (filters.page ?? 0) - 1 });
              }
            }}
            onNextPage={() => {
              if (!meta?.last) {
                setFilters({ page: (filters.page ?? 0) + 1 });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { IncidentPages };