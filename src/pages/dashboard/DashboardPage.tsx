import { CardListSkeleton, ListTableSkeleton, PageHeaderSkeleton, StatsGridSkeleton } from '@/src/pages/dashboard/components/skeletons';
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MonitorRow } from './components/MonitorRow';
import { useDashboardOverview, useRecentIncidents, useRecentMonitors } from './hooks/use-dashboard';
import { PATHS } from '@/src/utils/routes/paths';


export default function DashboardPage() {
  const navigate = useNavigate();

  const { data: overview, isLoading: isLoadingOverview, isSuccess: isSuccessLoadingOverview } = useDashboardOverview();
  const { data: recentMonitors, isLoading: isLoadingMonitors, isSuccess: isSuccessLoadingRecentMonitors } = useRecentMonitors();
  const { data: recentIncidents, isLoading: isLoadingRecentIncidents, isSuccess: isSuccessLoadingRecentIncidents } = useRecentIncidents();

  const viewIncident = (id: string) => {
    navigate(PATHS.DASHBOARD.INCIDENTS.DETAILS(id));
  };


  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none">
      {isLoadingOverview && <PageHeaderSkeleton />}
      {
        isSuccessLoadingOverview &&
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-white tracking-tight">
                System Overview
              </h1>
              {overview?.downMonitorsCount > 0 || overview?.openIncidentsCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium">
                  {overview?.openIncidentsCount > 0
                    ? `${overview?.openIncidentsCount} Incident${overview?.openIncidentsCount > 1 ? 's' : ''} Active`
                    : 'Node Degradation Detected'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-medium">
                  All Systems Operational
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Real-time infrastructure health, active incidents, and response time metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => navigate(PATHS.DASHBOARD.INCIDENTS.LIST)}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              Incidents
            </button>
            <button
              onClick={() => navigate(PATHS.DASHBOARD.MONITORS.CREATE)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>New Monitor</span>
            </button>
          </div>
        </div>
      }


      {isLoadingOverview && <StatsGridSkeleton />}
      {
        isSuccessLoadingOverview &&
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Trackers Active */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-col justify-between h-24">
            <div className="text-xs text-slate-400 font-medium">Active Trackers</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white">{overview?.activeMonitorsCount}</span>
              <span className="text-xs text-slate-400 font-mono">/ {overview?.totalMonitorsCount} nodes</span>
            </div>
          </div>

          {/* Metric 2: Nodes Degraded */}
          <div className={`border p-4 rounded-lg flex flex-col justify-between h-24 ${overview?.downMonitorsCount > 0 ? 'bg-rose-950/10 border-rose-900/60' : 'bg-slate-900 border-slate-800'
            }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Nodes Degraded</span>
              <span className={`w-2 h-2 rounded-full ${overview?.downMonitorsCount > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-bold ${overview?.downMonitorsCount > 0 ? 'text-rose-400' : 'text-white'}`}>
                {overview?.downMonitorsCount}
              </span>
              <span className="text-xs text-slate-400 font-mono">Currently Down</span>
            </div>
          </div>

          {/* Metric 3: Open Incidents */}
          <div className={`border p-4 rounded-lg flex flex-col justify-between h-24 ${overview?.openIncidentsCount > 0 ? 'bg-amber-950/10 border-amber-900/60' : 'bg-slate-900 border-slate-800'
            }`}>
            <div className="text-xs text-slate-400 font-medium">Open Incidents</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-bold ${overview?.openIncidentsCount > 0 ? 'text-amber-400' : 'text-white'}`}>
                {overview?.openIncidentsCount}
              </span>
              <span className="text-xs text-slate-400 font-mono">Unresolved</span>
            </div>
          </div>

          {/* Metric 4: Mean Ping Latency */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-col justify-between h-24">
            <div className="text-xs text-slate-400 font-medium">Mean Ping Latency</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white">{overview?.avgLatencyMs}ms</span>
            </div>
          </div>
        </div>
      }


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Node Health Matrix</h2>
            <button
              onClick={() => navigate(PATHS.DASHBOARD.MONITORS.LIST)}
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Manage all monitors ({overview?.totalMonitorsCount}) <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {isLoadingMonitors && <ListTableSkeleton />}
          {
            isSuccessLoadingRecentMonitors &&
            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800">
              {recentMonitors?.length > 0 ? (
                recentMonitors.map((m) => (
                  <MonitorRow m={m} key={m.id} />
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 space-y-2">
                  <Activity className="w-6 h-6 mx-auto text-slate-600" />
                  <p className="text-slate-300 font-medium">No monitors configured yet.</p>
                  <p className="text-slate-500">Create your first monitor to start receiving telemetry from your backend.</p>
                </div>
              )}
            </div>
          }
        </div>

        {/* Right Column (1/3 width): Recent Incidents */}
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-sm font-semibold text-white">Recent Incidents</h2>
              <button
                onClick={() => navigate(PATHS.DASHBOARD.INCIDENTS.LIST)}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                View all →
              </button>
            </div>

            {
              isLoadingRecentIncidents && <CardListSkeleton />
            }
            {
              isSuccessLoadingRecentIncidents && <>
                {recentIncidents.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {recentIncidents.map((inc) => (
                      <div
                        key={inc.id}
                        onClick={() => viewIncident(inc.id)}
                        className={`p-3 rounded border cursor-pointer transition-colors space-y-1.5 ${inc.status === 'OPEN'
                          ? 'bg-rose-950/20 border-rose-900/50 hover:bg-rose-950/30'
                          : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/40'
                          }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${inc.status === 'OPEN' ? 'bg-rose-500' : 'bg-emerald-500'
                              }`} />
                            <span className={`text-xs font-mono font-semibold ${inc.status === 'OPEN' ? 'text-rose-400' : 'text-emerald-400'
                              }`}>
                              {inc.status === 'OPEN' ? 'Active Defect' : 'Resolved'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            {inc.severity}

                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <h3 className="text-xs font-semibold text-slate-100 line-clamp-1">{inc?.latestErrorMessage}</h3>
                          {inc?.monitor?.name && (
                            <p className="text-xs text-slate-400 font-mono line-clamp-1">{inc?.monitor?.name}</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                          <span>
                            Opened {new Date(inc?.startedAt
                            ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300">
                            Investigate <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center rounded border border-dashed border-slate-800 bg-slate-950/40 text-xs space-y-1 text-slate-500">
                    <p className="text-slate-300 font-medium">No incidents logged.</p>
                    <p className="text-slate-500">All services running normally.</p>
                  </div>
                )}
              </>
            }
          </div>
        </div>
      </div>
    </div >
  );
}

export { DashboardPage };
