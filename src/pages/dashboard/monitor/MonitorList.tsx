import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Activity, Pause, Play, Plus, Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { MonitorFilterSkeleton } from "./_components/skeleton/MonitorFilterSkeleton";
import { MonitorListSkeleton } from "./_components/skeleton/MonitorListSkeleton";
import { useDeleteMonitor, useMonitors, useToggleMonitor } from "./hooks/use-monitor";
import { useDebounce } from "@/src/hooks/use-debounce";
import { PATHS } from "@/src/utils/routes/paths";

export default function MonitorList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const statusParam = searchParams.get("status") || "ALL";
  const keywordParam = searchParams.get("keyword") || "";
  const pageNoParam = parseInt(searchParams.get("pageNo") || "0", 10);
  const pageSize = 25;


  const [searchInput, setSearchInput] = useState(keywordParam);
  const debouncedSearchInput = useDebounce(searchInput, 500);


  useEffect(() => {
    if (keywordParam !== debouncedSearchInput && keywordParam !== searchInput) {
      setSearchInput(keywordParam);
    }
  }, [keywordParam]);


  useEffect(() => {
    if (debouncedSearchInput === keywordParam) return;

    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        if (debouncedSearchInput.trim()) {
          newParams.set("keyword", debouncedSearchInput.trim());
        } else {
          newParams.delete("keyword");
        }
        newParams.set("pageNo", "0");
        return newParams;
      },
      { replace: true }
    );
  }, [debouncedSearchInput]);

  const { data, isLoading, isFetching, isError, isSuccess } = useMonitors({
    pageNo: pageNoParam,
    pageSize,
    status: statusParam === "ALL" ? undefined : statusParam,
    keyword: keywordParam || undefined,
  });

  const toggleMutation = useToggleMonitor();
  const deleteMutation = useDeleteMonitor();

  const updateUrlParams = (updates: Record<string, string | number | undefined>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "ALL") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });
      return newParams;
    });
  };

  const handleStatusFilter = (status: string) => {
    updateUrlParams({ status, pageNo: 0 });
  };

  const handlePageChange = (newPage: number) => {
    updateUrlParams({ pageNo: newPage });
  };

  const handleSelectMonitor = (id: string) => {
    navigate(PATHS.DASHBOARD.MONITORS.DETAILS(id));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this monitor and wipe its telemetry history?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMutation.mutate(id);
  };

  const statusOptions = ["ALL", "UP", "DOWN"];
  const monitors = data?.items || [];
  const meta = data?.meta;

  const isInitialLoading = isLoading && !data;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none text-zinc-100">
      {/* Header controls section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Monitors</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time status checks and latency telemetry for HTTP(S) endpoints.
          </p>
        </div>

        <button
          onClick={() => navigate(PATHS.DASHBOARD.MONITORS.CREATE)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>New Monitor</span>
        </button>
      </div>

      {
        isInitialLoading && <MonitorFilterSkeleton />
      }
      {
        isSuccess &&
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-zinc-500" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors font-mono"
              placeholder="Search by name or endpoint URL..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 rounded-lg p-1 border border-zinc-800 self-start md:self-auto">
            {statusOptions.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusFilter(st)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded transition-colors cursor-pointer ${statusParam === st
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      }

      {/* Monitors Datatable container */}
      {isInitialLoading ? (
        <MonitorListSkeleton count={5} />
      ) : isError ? (
        <div className="p-4 border border-red-900/50 bg-red-950/20 text-red-400 rounded text-xs">
          Failed to load monitors. Check your connection or refresh the page.
        </div>
      ) : monitors.length === 0 ? (
        <div className="text-center py-20 bg-zinc-950 border border-dashed border-zinc-800 rounded-xl space-y-4">
          <Activity className="w-8 h-8 text-zinc-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-zinc-300">No monitors found</h3>
            <p className="text-[11px] text-zinc-500">
              No configured monitors match your current search or status filter.
            </p>
          </div>
          {(statusParam !== "ALL" || keywordParam !== "") && (
            <button
              onClick={() => {
                setSearchInput("");
                setSearchParams(new URLSearchParams());
              }}
              className="text-xs font-mono text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900 font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Monitor</th>
                  <th className="py-3 px-4">Endpoint URL</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Interval</th>
                  <th className="py-3 px-4">Latest Latency</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {monitors.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => handleSelectMonitor(m.id)}
                    className="hover:bg-zinc-900/50 transition-colors cursor-pointer group text-xs text-zinc-300"
                  >
                    <td className="py-3.5 px-4 font-semibold text-white group-hover:text-zinc-200">
                      {m.name}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-500">
                      <span className="truncate max-w-xs block">{m.url}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={m.status} lifecycle={m.lifecycle} />
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[10px] text-zinc-400 uppercase">
                      {m.method}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">
                      {m.intervalInSeconds}s
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {m.lifecycle === "PAUSED" || m.latestResponseTimeMs === null ? (
                        <span className="text-zinc-600">—</span>
                      ) : (
                        <span className="text-zinc-200 font-semibold">
                          {m.latestResponseTimeMs} ms
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => handleToggle(m.id, e)}
                          disabled={toggleMutation.isPending}
                          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title={m.lifecycle === "PAUSED" ? "Resume Monitor" : "Pause Monitor"}
                        >
                          {m.lifecycle === "PAUSED" ? (
                            <Play className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Pause className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </button>
                        <button
                          onClick={(e) => handleDelete(m.id, e)}
                          disabled={deleteMutation.isPending}
                          className="p-1.5 rounded hover:bg-zinc-800 hover:text-red-400 text-zinc-500 transition-colors cursor-pointer"
                          title="Delete Monitor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between text-xs text-zinc-500 font-mono px-1">
              <span>
                Showing page {meta.pageNumber + 1} of {meta.totalPages} ({meta.totalElements} total)
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={meta.pageNumber === 0}
                  onClick={() => handlePageChange(meta.pageNumber - 1)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button
                  disabled={meta.last}
                  onClick={() => handlePageChange(meta.pageNumber + 1)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, lifecycle }: { status: string; lifecycle: string }) {
  if (lifecycle === "PAUSED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-amber-950/40 text-amber-400 border border-amber-900/50">
        <span className="w-1 h-1 rounded-full bg-amber-400" />
        PAUSED
      </span>
    );
  }

  const isUp = status === "UP";
  const isDown = status === "DOWN";

  const colorStyle = isUp
    ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/50"
    : isDown
      ? "bg-red-950/40 text-red-400 border-red-900/50"
      : "bg-zinc-800 text-zinc-400 border-zinc-700/50";

  const dotStyle = isUp ? "bg-emerald-400" : isDown ? "bg-red-500" : "bg-zinc-400";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border ${colorStyle}`}>
      <span className={`w-1 h-1 rounded-full ${dotStyle}`} />
      <span>{status}</span>
    </span>
  );
}

export { MonitorList };