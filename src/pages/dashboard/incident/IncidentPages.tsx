import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  List,
  Table,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { ActiveOutagesSkeleton } from './_components/skeletons/ActiveOutagesSkeleton';
import { IncidentLedgerSkeleton } from './_components/skeletons/IncidentLedgerSkeleton';

export interface Incident {
  id: string;
  title: string;
  monitorName: string;
  status: 'OPEN' | 'RESOLVED';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  openedAt: string;
  resolvedAt?: string;
}

export default function IncidentPages() {
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // Data Fetching Hook Placeholders (e.g. TanStack Query)
  // -------------------------------------------------------------
  const isOpenIncidentsLoading = false;
  const isLedgerLoading = false;

  // Real data state target (initialize empty array)
  const incidents: Incident[] = [];

  const openIncidents = useMemo(() => incidents.filter((i) => i.status === 'OPEN'), [incidents]);

  const viewIncidentTrace = (id: string) => {
    navigate(`/incidents/${id}`);
  };

  const computeDuration = (openedStr: string, resolvedStr?: string) => {
    const end = resolvedStr ? new Date(resolvedStr).getTime() : Date.now();
    const durationMs = end - new Date(openedStr).getTime();
    const mins = Math.max(1, Math.round(durationMs / 60000));
    return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
  };

  // View & Pagination States
  const [viewMode, setViewMode] = useState<'list' | 'table'>('table');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  // Filter States
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMonitor, setFilterMonitor] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterDatePreset, setFilterDatePreset] = useState<string>('all');
  const [customDate, setCustomDate] = useState<string>('');

  const uniqueMonitors = useMemo(() => {
    const names = new Set<string>();
    incidents.forEach((inc) => {
      if (inc.monitorName) {
        names.add(inc.monitorName);
      }
    });
    return Array.from(names);
  }, [incidents]);

  const filteredIncidents = useMemo(() => {
    let result = [...incidents];

    if (filterStatus !== 'all') {
      result = result.filter((inc) => inc.status === filterStatus);
    }

    if (filterMonitor !== 'all') {
      result = result.filter((inc) => inc.monitorName === filterMonitor);
    }

    if (filterSeverity !== 'all') {
      result = result.filter((inc) => inc.severity === filterSeverity);
    }

    if (filterDatePreset !== 'all' && filterDatePreset !== 'custom') {
      const now = new Date();
      result = result.filter((inc) => {
        const openedDate = new Date(inc.openedAt);
        if (filterDatePreset === 'today') {
          return openedDate.toDateString() === now.toDateString();
        } else if (filterDatePreset === '7days') {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return openedDate >= sevenDaysAgo;
        } else if (filterDatePreset === '30days') {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return openedDate >= thirtyDaysAgo;
        }
        return true;
      });
    }

    if (filterDatePreset === 'custom' && customDate) {
      result = result.filter((inc) => {
        const openedDateStr = new Date(inc.openedAt).toISOString().split('T')[0];
        return openedDateStr === customDate;
      });
    }

    return result;
  }, [incidents, filterStatus, filterMonitor, filterSeverity, filterDatePreset, customDate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterMonitor, filterSeverity, filterDatePreset, customDate]);

  const totalItems = filteredIncidents.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedIncidents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredIncidents.slice(start, start + pageSize);
  }, [filteredIncidents, currentPage, pageSize]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const hasActiveFilters =
    filterStatus !== 'all' ||
    filterMonitor !== 'all' ||
    filterSeverity !== 'all' ||
    filterDatePreset !== 'all' ||
    customDate !== '';

  const clearAllFilters = () => {
    setFilterStatus('all');
    setFilterMonitor('all');
    setFilterSeverity('all');
    setFilterDatePreset('all');
    setCustomDate('');
  };

  const handleExportIncidents = () => {
    if (!filteredIncidents || filteredIncidents.length === 0) return;

    try {
      const csvHeaders = 'ID,Status,Title,Monitor Name,Severity,Opened At,Resolved At,Duration (mins)\n';
      const csvRows = filteredIncidents
        .map((inc) => {
          const openedStr = inc.openedAt;
          const resolvedStr = inc.resolvedAt || '';

          let durationMins = '';
          if (openedStr) {
            const end = resolvedStr ? new Date(resolvedStr).getTime() : Date.now();
            const durationMs = end - new Date(openedStr).getTime();
            durationMins = Math.max(1, Math.round(durationMs / 60000)).toString();
          }

          return `"${inc.id}","${inc.status}","${inc.title.replace(/"/g, '""')}","${inc.monitorName.replace(
            /"/g,
            '""'
          )}","${inc.severity}","${inc.openedAt}","${inc.resolvedAt || 'N/A'}",${durationMins}`;
        })
        .join('\n');

      const csvContent = csvHeaders + csvRows;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);

      const dateStr = new Date().toISOString().split('T')[0];
      link.setAttribute('download', `incidents_report_${dateStr}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to export incidents:', error);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
            Incident Desk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track active system outages, alerts escalation handshakes, and diagnostic forensics.
          </p>
        </div>

        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded transition-colors cursor-pointer shadow"
          >
            ← Back to Split View
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Active Outages Column */}
        {!isExpanded && (
          <div className="lg:col-span-2 space-y-4">
            {isOpenIncidentsLoading ? (
              <ActiveOutagesSkeleton count={2} />
            ) : (
              <>
                <div className="px-1 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    Unresolved Defect Alarms
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-rose-950/20 text-rose-400 font-mono text-[10px] uppercase border border-rose-900/40">
                    {openIncidents.length} active
                  </span>
                </div>

                <div className="space-y-3">
                  {openIncidents.map((inc) => (
                    <div
                      key={inc.id}
                      onClick={() => viewIncidentTrace(inc.id)}
                      className="p-5 rounded-xl bg-slate-900 border border-rose-900/35 hover:border-rose-900/50 transition-all cursor-pointer group space-y-4 shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1 p-0.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                            <span className="text-xs font-mono text-rose-400 uppercase font-bold tracking-wider">
                              {inc.severity} SEVERITY FAULT
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-100 group-hover:text-rose-400 transition-colors leading-snug">
                            {inc.title}
                          </h4>

                          <p className="text-xs text-slate-500 font-mono">
                            Target Node:{' '}
                            <span className="text-slate-300 font-semibold">{inc.monitorName}</span>
                          </p>
                        </div>

                        <span className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded">
                          Elapsed: {computeDuration(inc.openedAt)}
                        </span>
                      </div>

                      <div className="border-t border-slate-800 pt-3.5 flex items-center justify-between">
                        <div className="flex -space-x-1 overflow-hidden">
                          <span className="px-1.5 py-0.5 rounded font-mono text-[9px] text-slate-400 border border-slate-800 bg-slate-950">
                            Notifications Sent
                          </span>
                          <span className="px-1.5 py-0.5 rounded font-mono text-[9px] text-slate-400 border border-slate-800 bg-slate-950 ml-1">
                            Diagnostics Logged
                          </span>
                        </div>

                        <span className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-bold group-hover:text-indigo-300">
                          Investigate Trace{' '}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}

                  {openIncidents.length === 0 && (
                    <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/20 font-mono text-xs space-y-3.5 text-slate-500">
                      <CheckCircle className="w-8 h-8 text-emerald-500/50 mx-auto" />
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-300">
                          Optimal operational baseline verified.
                        </p>
                        <p className="text-[10px] text-slate-500">
                          No unresolved critical outages pending action.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Resolved Ledger Column */}
        <div className={`space-y-4 ${isExpanded ? 'lg:col-span-3' : 'lg:col-span-1'}`}>
          {isLedgerLoading ? (
            <IncidentLedgerSkeleton count={pageSize} viewMode={viewMode} isExpanded={isExpanded} />
          ) : (
            <>
              <div className="px-1 flex items-center justify-between border-b border-slate-900 pb-2">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    System Audit Ledger
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono">Incident Archive & Forensics</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportIncidents}
                    title="Export Alarms Report to CSV"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400 hover:text-white rounded transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline">Export</span>
                  </button>

                  <div className="flex bg-slate-950 p-0.5 rounded border border-slate-800">
                    <button
                      onClick={() => setViewMode('list')}
                      title="List view"
                      className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      title="Table view"
                      className={`p-1.5 rounded transition-colors cursor-pointer ${viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                      <Table className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? 'Split view' : 'Full audit desk view'}
                    className="p-1.5 rounded bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              {viewMode === 'table' && (
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400 font-semibold">
                      <SlidersHorizontal className="w-3 h-3 text-indigo-400" />
                      <span>Ledger Filters</span>
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>

                  <div
                    className={`grid gap-3 ${isExpanded
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5'
                      : 'grid-cols-1 sm:grid-cols-2'
                      }`}
                  >
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        Status
                      </label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="OPEN">OPEN / OUTAGE</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        Monitor Node
                      </label>
                      <select
                        value={filterMonitor}
                        onChange={(e) => setFilterMonitor(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Monitors</option>
                        {uniqueMonitors.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        Severity
                      </label>
                      <select
                        value={filterSeverity}
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Severities</option>
                        <option value="CRITICAL">CRITICAL</option>
                        <option value="WARNING">WARNING</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        Date Range
                      </label>
                      <select
                        value={filterDatePreset}
                        onChange={(e) => {
                          setFilterDatePreset(e.target.value);
                          if (e.target.value !== 'custom') setCustomDate('');
                        }}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="custom">Specific Date...</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-slate-500 mb-1 font-semibold">
                        {filterDatePreset === 'custom' ? 'Select Date' : 'Custom Picker'}
                      </label>
                      <input
                        type="date"
                        value={customDate}
                        disabled={filterDatePreset !== 'custom'}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-mono rounded px-2 py-1 focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Table / List Rendering */}
              <div className="space-y-3">
                {viewMode === 'list' ? (
                  <>
                    {paginatedIncidents.map((inc) => (
                      <div
                        key={inc.id}
                        onClick={() => viewIncidentTrace(inc.id)}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer space-y-3 shadow-md group"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full border ${inc.status === 'OPEN'
                              ? 'bg-rose-950/20 text-rose-400 border-rose-900/30'
                              : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30'
                              }`}
                          >
                            {inc.status === 'OPEN' ? 'Open Outage' : 'Resolved'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />{' '}
                            {new Date(inc.openedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="text-xs font-semibold text-slate-200 line-clamp-2 leading-relaxed group-hover:text-indigo-400 transition-colors">
                            {inc.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-mono">
                            Downtime duration: {computeDuration(inc.openedAt, inc.resolvedAt)}
                          </p>
                        </div>

                        <div className="text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
                          <span>
                            Node: <strong className="text-slate-300 font-medium">{inc.monitorName}</strong>
                          </span>
                          <span className="text-indigo-400 flex items-center gap-0.5">
                            Trace <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}

                    {filteredIncidents.length === 0 && (
                      <div className="text-center p-8 border border-dashed border-slate-800 bg-slate-900/10 rounded-xl text-xs font-mono text-slate-500">
                        No matching incidents logged.
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-950/40">
                            {isExpanded ? (
                              <>
                                <th className="px-4 py-3 text-left font-semibold">Timestamp</th>
                                <th className="px-4 py-3 text-left font-semibold">Incident ID</th>
                                <th className="px-4 py-3 text-left font-semibold">Target Node</th>
                                <th className="px-4 py-3 text-left font-semibold">Incident Title</th>
                                <th className="px-4 py-3 text-center font-semibold">Status</th>
                                <th className="px-4 py-3 text-center font-semibold">Severity</th>
                                <th className="px-4 py-3 text-right font-semibold">Duration</th>
                                <th className="px-4 py-3 text-center font-semibold">Diagnostic</th>
                              </>
                            ) : (
                              <>
                                <th className="px-3 py-2.5 text-left font-semibold">Date & Node</th>
                                <th className="px-3 py-2.5 text-center font-semibold">Status</th>
                                <th className="px-3 py-2.5 text-center font-semibold">Severity</th>
                                <th className="px-3 py-2.5 text-right font-semibold">Duration</th>
                                <th className="px-3 py-2.5 text-center font-semibold">Trace</th>
                              </>
                            )}
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-800/50">
                          {paginatedIncidents.map((inc) =>
                            isExpanded ? (
                              <tr
                                key={inc.id}
                                onClick={() => viewIncidentTrace(inc.id)}
                                className="hover:bg-slate-950/30 transition-colors cursor-pointer text-xs group"
                              >
                                <td className="px-4 py-3.5 font-mono text-slate-300">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                    {new Date(inc.openedAt).toLocaleDateString()}
                                  </span>
                                </td>
                                <td className="px-4 py-3.5 font-mono text-slate-500 text-xs">{inc.id}</td>
                                <td className="px-4 py-3.5 text-slate-200 font-bold font-mono">{inc.monitorName}</td>
                                <td className="px-4 py-3.5 text-slate-300 font-sans max-w-xs truncate">
                                  <div className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                                    {inc.title}
                                  </div>
                                </td>
                                <td className="px-4 py-3.5 text-center">
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-widest border ${inc.status === 'OPEN'
                                      ? 'bg-rose-950/20 text-rose-400 border-rose-900/30'
                                      : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30'
                                      }`}
                                  >
                                    {inc.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3.5 text-center">
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-widest ${inc.severity === 'CRITICAL'
                                      ? 'bg-rose-950/30 text-rose-400 border border-rose-900/30'
                                      : 'bg-amber-950/30 text-amber-400 border border-amber-900/30'
                                      }`}
                                  >
                                    {inc.severity}
                                  </span>
                                </td>
                                <td className="px-4 py-3.5 text-right font-mono text-slate-400">
                                  {computeDuration(inc.openedAt, inc.resolvedAt)}
                                </td>
                                <td className="px-4 py-3.5 text-center">
                                  <button className="text-indigo-400 group-hover:text-indigo-300 font-mono text-[10px] inline-flex items-center gap-0.5 hover:underline cursor-pointer">
                                    Trace <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                  </button>
                                </td>
                              </tr>
                            ) : (
                              <tr
                                key={inc.id}
                                onClick={() => viewIncidentTrace(inc.id)}
                                className="hover:bg-slate-950/30 transition-colors cursor-pointer text-xs group"
                              >
                                <td className="px-3 py-3">
                                  <div className="font-semibold text-slate-200 truncate max-w-[130px]" title={inc.title}>
                                    {inc.title}
                                  </div>
                                  <div className="text-[9px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                                    <span className="text-indigo-400 font-bold">{inc.monitorName}</span>
                                    <span>•</span>
                                    <span>{new Date(inc.openedAt).toLocaleDateString()}</span>
                                  </div>
                                </td>
                                <td className="px-3 py-3 text-center">
                                  <span
                                    className={`inline-block px-1 rounded text-[7px] font-mono uppercase font-bold tracking-wider border ${inc.status === 'OPEN'
                                      ? 'bg-rose-950/20 text-rose-400 border-rose-900/30'
                                      : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30'
                                      }`}
                                  >
                                    {inc.status}
                                  </span>
                                </td>
                                <td className="px-3 py-3 text-center">
                                  <span
                                    className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-widest ${inc.severity === 'CRITICAL'
                                      ? 'bg-rose-950/20 text-rose-400 border border-rose-900/30'
                                      : 'bg-amber-950/20 text-amber-400 border border-amber-900/30'
                                      }`}
                                  >
                                    {inc.severity === 'CRITICAL' ? 'CRT' : 'WRN'}
                                  </span>
                                </td>
                                <td className="px-3 py-3 text-right font-mono text-slate-400">
                                  {computeDuration(inc.openedAt, inc.resolvedAt)}
                                </td>
                                <td className="px-3 py-3 text-center">
                                  <span className="text-indigo-400 group-hover:text-indigo-300 font-bold font-mono text-[11px] block">
                                    →
                                  </span>
                                </td>
                              </tr>
                            )
                          )}

                          {totalItems === 0 && (
                            <tr>
                              <td
                                colSpan={isExpanded ? 8 : 5}
                                className="px-4 py-8 text-center text-slate-500 font-mono text-xs"
                              >
                                {hasActiveFilters
                                  ? 'No ledger items match active filter metrics.'
                                  : 'No system incidents logged.'}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalItems > 0 && (
                      <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/30 flex items-center justify-between flex-wrap gap-2 text-[10px] font-mono uppercase text-slate-500">
                        <div>
                          Showing{' '}
                          <strong className="text-slate-300">
                            {Math.min(totalItems, (currentPage - 1) * pageSize + 1)}
                          </strong>{' '}
                          to{' '}
                          <strong className="text-slate-300">
                            {Math.min(totalItems, currentPage * pageSize)}
                          </strong>{' '}
                          of <strong className="text-slate-300">{totalItems}</strong> entries
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold font-mono text-xs">
                            {currentPage} / {totalPages}
                          </span>
                          <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { IncidentPages };