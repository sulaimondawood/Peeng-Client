import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Pause,
  Play,
  RefreshCw,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { MonitorDetailsHeaderSkeleton } from './_components/skeleton/MonitorDetailsHeaderSkeleton';
import { MonitorDetailsStatsSkeleton } from './_components/skeleton/MonitorDetailsStatsSkeleton';
import { MonitorChartSkeleton } from './_components/skeleton/MonitorChartSkeleton';
import { MonitorLogsSkeleton } from './_components/skeleton/MonitorLogsSkeleton';


export interface Monitor {
  id: string;
  name: string;
  url: string;
  status: 'UP' | 'DOWN' | 'PAUSED' | 'PENDING';
  uptime: number;
  responseTime: number;
  interval: number;
  timeout: number;
  sslStatus?: {
    expiresInDays: number;
    issuer: string;
  };
}

export interface CheckHistoryItem {
  id: string;
  timestamp: string;
  status: 'UP' | 'DOWN';
  statusCode: number;
  responseTime: number;
}

export interface Incident {
  id: string;
  monitorId: string;
  title: string;
  status: 'OPEN' | 'RESOLVED';
  openedAt: string;
}

export default function MonitorDetails() {
  const { monitorId } = useParams<{ monitorId: string }>();
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // Data Fetching Hook Placeholders (e.g. TanStack Query)
  // -------------------------------------------------------------
  const isMonitorLoading = false;
  const isHistoryLoading = false;

  // Real data state target initializations
  const monitor: Monitor | null = null;
  const history: CheckHistoryItem[] = [];
  const incidents: Incident[] = [];

  const handleDownloadLogs = () => {
    if (!history || history.length === 0) return;

    try {
      const csvHeaders = 'ID,Timestamp,Status,HTTP Status Code,Response Time (ms)\n';
      const csvRows = history
        .map(
          (h) => `"${h.id}","${h.timestamp}","${h.status}",${h.statusCode},${h.responseTime}`
        )
        .join('\n');

      const csvContent = csvHeaders + csvRows;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);

      const sanitizedFilename = (monitor?.name || 'monitor')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^_+|_+$)/g, '');

      link.setAttribute('download', `${sanitizedFilename}_telemetry_logs.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download logs:', error);
    }
  };

  const associatedIncidents = useMemo(() => {
    if (!monitor) return [];
    return incidents.filter((i) => i.monitorId === monitor.id);
  }, [incidents, monitor]);

  const handleDelete = () => {
    if (!monitor) return;
    if (
      confirm(
        `Are you sure you want to delete '${monitor.name}'? This operations node and all check histories will be destroyed.`
      )
    ) {
      // API Call: DELETE /api/monitors/:id
      navigate('/monitors');
    }
  };

  const triggerManualCheck = (id: string) => {
    // API Call: POST /api/monitors/:id/check
  };

  const togglePauseMonitor = (id: string) => {
    // API Call: PATCH /api/monitors/:id/pause
  };

  const chartData = useMemo(() => {
    return [...history].reverse().map((item) => {
      const parts = item.timestamp.split('T')[1]?.substring(0, 5) || '00:00';
      return {
        time: parts,
        latency: item.responseTime,
        status: item.status,
        code: item.statusCode
      };
    });
  }, [history]);

  if (!monitor && !isMonitorLoading) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-xs space-y-4 max-w-5xl mx-auto">
        <p>No monitor is currently selected for diagnostics check.</p>
        <button
          onClick={() => navigate('/monitors')}
          className="px-3 py-1.5 rounded bg-slate-800 text-white font-semibold cursor-pointer transition-colors"
        >
          View all monitors
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none">
      {/* Header */}
      {isMonitorLoading || !monitor ? (
        <MonitorDetailsHeaderSkeleton />
      ) : (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/monitors')}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-slate-100 tracking-tight truncate">
                  {monitor.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${monitor.status === 'UP'
                    ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/40'
                    : monitor.status === 'DOWN'
                      ? 'bg-rose-950/20 text-rose-400 border border-rose-900/40'
                      : 'bg-amber-950/20 text-amber-500 border border-amber-900/45'
                    }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${monitor.status === 'UP'
                      ? 'bg-emerald-400'
                      : monitor.status === 'DOWN'
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                      }`}
                  />
                  <span>{monitor.status}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono truncate mt-0.5" title={monitor.url}>
                {monitor.url}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerManualCheck(monitor.id)}
              disabled={monitor.status === 'PAUSED'}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 rounded-lg text-xs font-mono transition-colors uppercase cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test Probe</span>
            </button>

            <button
              onClick={handleDownloadLogs}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-mono transition-colors uppercase cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Download Logs</span>
            </button>

            <button
              onClick={() => togglePauseMonitor(monitor.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
            >
              {monitor.status === 'PAUSED' ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" /> <span>Resume Trace</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500" /> <span>Pause Trace</span>
                </>
              )}
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-900/40 hover:bg-rose-950/20 text-rose-400 hover:text-rose-300 rounded-lg text-xs transition-all cursor-pointer font-mono uppercase"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Kill Tracker</span>
            </button>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      {isMonitorLoading || !monitor ? (
        <MonitorDetailsStatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 hover:border-slate-700 transition-colors">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold block">
              Annualized Availability
            </span>
            <span className="text-2xl font-bold font-display text-emerald-400 block">
              {monitor.uptime}%
            </span>
            <span className="text-[9px] text-slate-500 font-mono uppercase block">
              Consecutive SLAs met
            </span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 hover:border-slate-700 transition-colors">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold block">
              Latest Response Speed
            </span>
            <span className="text-2xl font-bold font-display text-slate-100 block">
              {monitor.status === 'PAUSED' || monitor.responseTime === 0
                ? '—'
                : `${monitor.responseTime}ms`}
            </span>
            <span className="text-[9px] text-slate-500 font-mono uppercase block">
              Measured via Edge Node
            </span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 hover:border-slate-700 transition-colors">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold block">
              TLS Handshake Credentials
            </span>
            {monitor.sslStatus ? (
              <>
                <span className="text-2xl font-bold font-display text-indigo-400 block">
                  {monitor.sslStatus.expiresInDays} Days
                </span>
                <span className="text-[9px] text-slate-500 font-mono truncate block uppercase">
                  Issuer: {monitor.sslStatus.issuer}
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold font-display text-slate-600 block">None</span>
                <span className="text-[9px] text-slate-600 font-mono uppercase block">
                  Unencrypted transport
                </span>
              </>
            )}
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1 hover:border-slate-700 transition-colors">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold block">
              Frequency pace
            </span>
            <span className="text-2xl font-bold font-display text-slate-100 block">
              Every {monitor.interval}s
            </span>
            <span className="text-[9px] text-slate-500 font-mono uppercase block">
              {monitor.timeout}ms Timeout ceiling
            </span>
          </div>
        </div>
      )}

      {/* Latency Chart */}
      {isHistoryLoading ? (
        <MonitorChartSkeleton />
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Response Time Latency History
              </h3>
              <p className="text-[10px] text-slate-500 uppercase font-mono">
                Metrics over the last {history.length} continuous checks
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase bg-slate-950 px-2 py-1 border border-slate-800 text-slate-500 rounded">
              Measured in milliseconds (ms)
            </span>
          </div>

          {chartData.length > 0 ? (
            <div className="h-64 sm:h-72 w-full font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="#475569"
                    dy={10}
                    style={{ fontSize: '9px', fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis
                    stroke="#475569"
                    dx={-5}
                    style={{ fontSize: '9px', fontFamily: 'JetBrains Mono' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#1e293b',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#475569' }}
                    itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="latency"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorLatency)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center border border-dashed border-slate-800 rounded-lg text-xs text-slate-500 font-mono">
              Waiting for check cycles to establish data points...
            </div>
          )}

          {/* Operational Matrix Bar */}
          <div className="border-t border-slate-800 pt-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Operational Continuity Matrix</span>
              <span>99.9% Goal Rate</span>
            </div>

            <div className="flex gap-0.5 sm:gap-1 items-center">
              {chartData.map((d, index) => (
                <div
                  key={index}
                  className={`h-6 flex-1 rounded-sm ${d.status === 'UP'
                    ? 'bg-emerald-500/80 hover:bg-emerald-500'
                    : 'bg-rose-500/80 hover:bg-rose-500'
                    } transition-colors`}
                  title={`Ping at ${d.time}: ${d.status} (${d.latency > 0 ? `${d.latency}ms` : 'Timeout / Code ' + d.code
                    })`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-slate-500">
              <span>{history.length > 0 ? 'Chronological Genesis' : 'No records'}</span>
              <span>Current Check Period</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Telemetry Log */}
        <div className="lg:col-span-2 space-y-4">
          {isHistoryLoading ? (
            <MonitorLogsSkeleton count={5} />
          ) : (
            <>
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Raw Checked Telemetry Log
                </h3>
                <button
                  onClick={handleDownloadLogs}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-indigo-400" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950 font-mono text-xs text-slate-500 tracking-wider">
                      <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                      <th className="py-2.5 px-4 font-semibold">Ping Outcome</th>
                      <th className="py-2.5 px-4 font-semibold">Latency</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Payload Headers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {history.slice(0, 15).map((h) => (
                      <tr
                        key={h.id}
                        className="text-xs font-mono text-slate-300 hover:bg-slate-800/30 transition-all"
                      >
                        <td className="py-3 px-4 text-slate-500 select-all">
                          {new Date(h.timestamp).toLocaleTimeString()} —{' '}
                          {new Date(h.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${h.status === 'UP' ? 'bg-emerald-500' : 'bg-rose-500'
                                }`}
                            />
                            <span
                              className={
                                h.status === 'UP' ? 'text-slate-300' : 'text-rose-400 font-semibold'
                              }
                            >
                              {h.status === 'UP' ? 'SUCCESS' : 'FAILED'} (HTTP {h.statusCode})
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {h.responseTime > 0 ? `${h.responseTime}ms` : '— Timeout'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded border border-slate-800 text-slate-500 bg-slate-950">
                            {h.status === 'UP' ? 'VALID_BODY' : 'CRITICAL_TIMEOUT'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {history.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-slate-500 font-mono">
                          No telemetry audits captured yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Triggered Incidents */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono px-1">
            Triggered Incidents Ledger
          </h3>

          <div className="space-y-3">
            {associatedIncidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => navigate(`/incidents/${inc.id}`)}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold ${inc.status === 'OPEN'
                      ? 'bg-rose-950/20 border border-rose-900/40 text-rose-400'
                      : 'bg-slate-950 border border-slate-800 text-slate-500'
                      }`}
                  >
                    {inc.status}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {new Date(inc.openedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200 line-clamp-2 leading-relaxed">
                  {inc.title}
                </h4>
              </div>
            ))}

            {associatedIncidents.length === 0 && (
              <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/10 font-mono text-xs space-y-2 text-slate-500">
                <ShieldCheck className="w-6 h-6 text-emerald-500/50 mx-auto" />
                <p>Perfect score ledger.</p>
                <p className="text-[10px] text-slate-600">No outages triggered historically.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { MonitorDetails };