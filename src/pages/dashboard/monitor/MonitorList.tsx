import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Filter, Pause, Play, Plus, Search, Trash2 } from 'lucide-react';
import { MonitorFilterSkeleton } from './_components/skeleton/MonitorFilterSkeleton';
import { MonitorListSkeleton } from './_components/skeleton/MonitorListSkeleton';
export interface Monitor {
  id: string;
  name: string;
  url: string;
  status: 'UP' | 'DOWN' | 'PAUSED' | 'PENDING';
  responseTime: number;
  uptime: number;
  tags?: string[];
  sslStatus?: {
    expiresInDays: number;
    issuer: string;
  };
}

export default function MonitorList() {
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // Data Fetching Hook Placeholders (e.g. TanStack Query)
  // -------------------------------------------------------------
  const isLoading = false;

  // Real data state target (initialize empty array)
  const monitors: Monitor[] = [];

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const allTags = Array.from(new Set(monitors.flatMap((m) => m.tags || [])));

  const filtered = monitors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.url.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || m.status === selectedStatus;
    const matchesTag = selectedTag === 'ALL' || (m.tags && m.tags.includes(selectedTag));
    return matchesSearch && matchesStatus && matchesTag;
  });

  const handleSelectMonitor = (id: string) => {
    navigate(`/monitors/${id}`);
  };

  const statusOptions = ['ALL', 'UP', 'DOWN', 'PAUSED', 'PENDING'];

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      confirm(
        'Are you sure you want to stop tracking and delete this monitor permanently? All history metrics will be wiped.'
      )
    ) {
      // API Call: DELETE /api/monitors/:id
    }
  };

  const triggerManualCheck = (id: string) => {
    // API Call: POST /api/monitors/:id/check
  };

  const togglePauseMonitor = (id: string) => {
    // API Call: PATCH /api/monitors/:id/pause
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none">
      {/* Header controls section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
            Monitors Desk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time operations status checkups of HTTP(S) endpoints and gateway tunnels.
          </p>
        </div>

        <button
          onClick={() => navigate('/monitors/create')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-black font-semibold text-xs transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>New Monitor</span>
        </button>
      </div>

      {/* Filter and search utilities bar */}
      {isLoading ? (
        <MonitorFilterSkeleton />
      ) : (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between shadow-xl">
          <div className="relative flex-1">
            <Search className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-slate-500" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-mono"
              placeholder="Filter by monitor name, target host URL or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-950 rounded-lg p-1 border border-slate-800">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded-md transition-colors cursor-pointer ${selectedStatus === st
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
              <Filter className="w-3 h-3 text-slate-500" />
              <select
                className="bg-transparent border-none text-[10px] text-slate-400 font-mono focus:ring-0 outline-none pr-6 cursor-pointer"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="ALL">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Monitors Datatable container */}
      {isLoading ? (
        <MonitorListSkeleton count={5} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl space-y-4">
          <Activity className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-slate-300">No monitored endpoints matched</h3>
            <p className="text-[10px] text-slate-500 font-mono">
              Alter your filter parameters or spawn another dynamic ping tracker node.
            </p>
          </div>
          <button
            onClick={() => {
              setSearch('');
              setSelectedStatus('ALL');
              setSelectedTag('ALL');
            }}
            className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 font-mono text-[10px] text-slate-500 tracking-wider font-semibold">
                <th className="py-3 px-4">Monitor Name</th>
                <th className="py-3 px-4">Tracking URL</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">SSL Auth</th>
                <th className="py-3 px-4">30D Uptime</th>
                <th className="py-3 px-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => handleSelectMonitor(m.id)}
                  className="hover:bg-slate-800/30 transition-all cursor-pointer group text-xs text-slate-300"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {m.name}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">
                    <span className="truncate max-w-xs block select-all">{m.url}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider ${m.status === 'UP'
                          ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/40'
                          : m.status === 'DOWN'
                            ? 'bg-rose-950/20 text-rose-400 border border-rose-900/40'
                            : m.status === 'PAUSED'
                              ? 'bg-amber-950/20 text-amber-400 border border-amber-900/40'
                              : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                        }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${m.status === 'UP'
                            ? 'bg-emerald-400'
                            : m.status === 'DOWN'
                              ? 'bg-rose-500'
                              : m.status === 'PAUSED'
                                ? 'bg-amber-400'
                                : 'bg-slate-400'
                          }`}
                      />
                      <span>{m.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[10px]">
                    {m.status === 'PAUSED' || m.responseTime === 0 ? (
                      <span className="text-slate-600">—</span>
                    ) : (
                      <span className="text-slate-300 font-semibold">{m.responseTime} ms</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {m.sslStatus ? (
                      <span
                        className="text-[9px] font-mono uppercase bg-indigo-950/20 border border-indigo-900/40 px-1.5 py-0.5 rounded text-indigo-400"
                        title={`Issuer: ${m.sslStatus.issuer}`}
                      >
                        Secured ({m.sslStatus.expiresInDays}D)
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-600 uppercase">None</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[10px] font-semibold">
                    <span className="text-emerald-400">{m.uptime}%</span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerManualCheck(m.id);
                        }}
                        disabled={m.status === 'PAUSED'}
                        className="p-1 px-2 text-[10px] font-mono rounded hover:bg-slate-800 uppercase text-indigo-400 hover:text-indigo-300 disabled:opacity-20 transition-all font-semibold cursor-pointer"
                        title="Force Immediate Probe Check"
                      >
                        Probe
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePauseMonitor(m.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        title={m.status === 'PAUSED' ? 'Resume Monitor' : 'Pause Monitor'}
                      >
                        {m.status === 'PAUSED' ? (
                          <Play className="w-3.5 h-3.5" />
                        ) : (
                          <Pause className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={(e) => handleDelete(m.id, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-rose-400 text-slate-600 transition-colors cursor-pointer"
                        title="Delete Monitor node"
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
      )}
    </div>
  );
}

export { MonitorList };