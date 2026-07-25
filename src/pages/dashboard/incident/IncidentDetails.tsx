import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Terminal,
  SendHorizontal,
  Users,
  Clock,
  Play,
  Check,
  Copy,
  FileText,
  Wrench,
  Network,
  Mail,
  SlidersHorizontal,
  RefreshCw,
  Lock,
  Unlock,
  Cpu,
  BellDot
} from 'lucide-react';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
}

export interface Incident {
  id: string;
  title: string;
  monitorId: string;
  monitorName: string;
  status: 'OPEN' | 'RESOLVED';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  openedAt: string;
  resolvedAt?: string;
  assignee?: string;
  timeline: TimelineEvent[];
  rcaSummary?: string;
  rcaMitigations?: string;
  rcaActionItems?: string;
  rcaSaved?: boolean;
}

export interface Monitor {
  id: string;
  name: string;
  url: string;
  interval?: number;
  timeout?: number;
  sslStatus?: {
    expiresInDays: number;
  };
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function IncidentDetails() {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // Data Fetching Hook Placeholders
  // -------------------------------------------------------------
  // Toggle `isLoading` to true to test the independent skeleton component
  const isLoading = false;

  const [incident, setIncident] = useState<Incident | null>(null);
  const [associatedMonitor, setAssociatedMonitor] = useState<Monitor | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  // Local Form & Diagnostic States
  const [messageInput, setMessageInput] = useState('');
  const [operatorTitle, setOperatorTitle] = useState('Operator Diagnostic Update');

  const [rcaSaved, setRcaSaved] = useState(false);
  const [rcaSummary, setRcaSummary] = useState('');
  const [rcaMitigations, setRcaMitigations] = useState('');
  const [rcaActionItems, setRcaActionItems] = useState<string>('');

  const [diagnosticState, setDiagnosticState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);

  // Sync RCA details when incident data changes
  useEffect(() => {
    if (incident) {
      setRcaSummary(incident.rcaSummary || '');
      setRcaMitigations(incident.rcaMitigations || '');
      setRcaActionItems(
        incident.rcaActionItems ||
        '- Upgrade database connection limits\n- Defer non-critical analytics processes\n- Set up secondary read-replica endpoints'
      );
      setRcaSaved(!!incident.rcaSaved);
    }
  }, [incident]);

  // Early return with the independent skeleton component
  if (isLoading) {
    return;
  }

  if (!incident) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono text-xs space-y-4 max-w-5xl mx-auto">
        <p>No active incident investigation selected or incident not found.</p>
        <button
          onClick={() => navigate('/incidents')}
          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer transition-colors"
        >
          Return to Incident Desk
        </button>
      </div>
    );
  }

  const currentAssignee = incident.assignee || 'unassigned';

  const handleResolve = () => {
    setIncident((prev) =>
      prev
        ? {
          ...prev,
          status: 'RESOLVED',
          resolvedAt: new Date().toISOString()
        }
        : null
    );
  };

  const handleAddTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newEvent: TimelineEvent = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: operatorTitle,
      description: messageInput.trim()
    };

    setIncident((prev) =>
      prev
        ? {
          ...prev,
          timeline: [...prev.timeline, newEvent]
        }
        : null
    );

    setMessageInput('');
  };

  const handleAssigneeChange = (email: string) => {
    const selectedMember = members.find((m) => m.email === email);
    const assigneeName = selectedMember ? selectedMember.name : 'Unassigned';

    const newEvent: TimelineEvent = {
      id: `evt-assign-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: 'On-Call Assignment Calibrated',
      description: `Incident owner reassigned to: ${assigneeName} (${email || 'None'}).`
    };

    setIncident((prev) =>
      prev
        ? {
          ...prev,
          assignee: email,
          timeline: [...prev.timeline, newEvent]
        }
        : null
    );
  };

  const toggleSeverity = () => {
    const nextSeverity = incident.severity === 'CRITICAL' ? 'WARNING' : 'CRITICAL';

    const newEvent: TimelineEvent = {
      id: `evt-severity-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: 'Incident Severity Reconfigured',
      description: `Telemetry severity level adjusted from ${incident.severity} to ${nextSeverity} by Operator.`
    };

    setIncident((prev) =>
      prev
        ? {
          ...prev,
          severity: nextSeverity,
          timeline: [...prev.timeline, newEvent]
        }
        : null
    );
  };

  const startDiagnosticRun = () => {
    if (diagnosticState === 'running') return;

    setDiagnosticState('running');
    setDiagnosticProgress(10);
    setDiagnosticLogs([`[${new Date().toLocaleTimeString()}] > INITIALIZING NETWORK PROBE ENGINE...`]);

    setTimeout(() => {
      setDiagnosticProgress(40);
      setDiagnosticLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] > DNS Resolution: Resolving host domain A-records...`,
        `[${new Date().toLocaleTimeString()}] > SUCCESS: Target IP reachable (Latency: 12.8ms)`
      ]);
    }, 600);

    setTimeout(() => {
      setDiagnosticProgress(80);
      setDiagnosticLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] > SSL/TLS Negotiation: Verified Certificate Authority`,
        `[${new Date().toLocaleTimeString()}] > Transmitting HTTP GET probe payload...`
      ]);
    }, 1200);

    setTimeout(() => {
      setDiagnosticProgress(100);
      setDiagnosticLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] < HTTP RESPONSE RECEIVED: 200 OK (Stable Handshake)`,
        `[${new Date().toLocaleTimeString()}] ✓ VERDICT: Node recovered and operating within normal parameters.`
      ]);
      setDiagnosticState('completed');
    }, 1800);
  };

  const handleSaveRca = () => {
    setIncident((prev) =>
      prev
        ? {
          ...prev,
          rcaSummary,
          rcaMitigations,
          rcaActionItems,
          rcaSaved: true
        }
        : null
    );
    setRcaSaved(true);
  };

  const handleUnlockRca = () => {
    setRcaSaved(false);
  };

  const copyIncidentId = () => {
    navigator.clipboard.writeText(incident.id);
  };

  const computeDuration = (openedStr: string, resolvedStr?: string) => {
    const end = resolvedStr ? new Date(resolvedStr).getTime() : Date.now();
    const durationMs = end - new Date(openedStr).getTime();
    const mins = Math.max(1, Math.round(durationMs / 60000));
    return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none pb-16">
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/incidents')}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                Ref: <span className="text-indigo-400 select-all font-semibold">{incident.id}</span>
                <button onClick={copyIncidentId} title="Copy Incident ID" className="hover:text-white">
                  <Copy className="w-3 h-3 text-slate-600 hover:text-indigo-400 cursor-pointer" />
                </button>
              </span>
              <span>•</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${incident.status === 'OPEN'
                    ? 'bg-rose-950/20 text-rose-400 border-rose-900/30'
                    : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30'
                  }`}
              >
                {incident.status === 'OPEN' ? 'Open Outage' : 'Audit Resolved'}
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-slate-100 tracking-tight leading-tight">
              {incident.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSeverity}
            className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border uppercase transition-colors cursor-pointer ${incident.severity === 'CRITICAL'
                ? 'bg-rose-950/20 border-rose-900/40 text-rose-400 hover:bg-rose-900/30'
                : 'bg-amber-950/20 border-amber-900/40 text-amber-400 hover:bg-amber-900/30'
              }`}
          >
            Priority: {incident.severity}
          </button>

          {incident.status === 'OPEN' ? (
            <button
              onClick={handleResolve}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-tight transition-all cursor-pointer shadow-lg shadow-emerald-950/20"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Resolve Outage</span>
            </button>
          ) : (
            <div className="px-3.5 py-1.5 text-xs font-mono bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Resolved{' '}
              {incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleDateString() : 'Now'}
            </div>
          )}
        </div>
      </div>

      {/* Metrics HUD Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Outage Duration
          </span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-bold text-slate-100 font-mono">
              {computeDuration(incident.openedAt, incident.resolvedAt)}
            </span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono">
            {incident.status === 'OPEN' ? 'Active accumulating metric' : 'Archived lifetime metric'}
          </span>
        </div>

        <div className="space-y-1 border-l border-slate-800 pl-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Associated Target Node
          </span>
          <div className="flex items-center gap-1.5 truncate">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-slate-100 font-sans truncate">{incident.monitorName}</span>
          </div>
          <span className="text-[9px] text-indigo-400 font-mono block truncate">
            {associatedMonitor?.url || 'VPC Local Loop'}
          </span>
        </div>

        <div className="space-y-1 border-l border-slate-800 pl-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Verification Rate
          </span>
          <div className="flex items-center gap-1.5">
            <Network className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-slate-100 font-mono">
              Every {associatedMonitor?.interval || 30} seconds
            </span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono">
            Timeout configuration: {associatedMonitor?.timeout || 3000}ms
          </span>
        </div>

        <div className="space-y-1 border-l border-slate-800 pl-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            Responsible Lead
          </span>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-slate-100 font-sans">
              {members.find((m) => m.email === currentAssignee)?.name || 'Unassigned'}
            </span>
          </div>
          <span className="text-[9px] text-slate-500 font-mono">Status: On-Call active roster</span>
        </div>
      </div>

      {/* Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Timeline & Post-Mortem */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline trace */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-rose-400" /> Audited Forensics Timeline Trace
              </h3>
              <span className="text-[10px] font-mono text-slate-500">
                {incident.timeline.length} handshakes logged
              </span>
            </div>

            <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-6">
              {incident.timeline.map((evt, idx) => (
                <div key={evt.id || idx} className="relative group">
                  <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-bold font-mono flex items-center justify-center shadow-lg group-hover:border-indigo-400 transition-colors">
                    {idx + 1}
                  </span>

                  <div className="p-3.5 bg-slate-950/40 border border-slate-800/60 rounded-xl space-y-1.5 hover:border-slate-800 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-semibold text-slate-200 text-xs font-sans">{evt.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-600" />
                        {new Date(evt.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono leading-relaxed">{evt.description}</p>
                  </div>
                </div>
              ))}

              {incident.status === 'RESOLVED' && (
                <div className="relative">
                  <span className="absolute -left-[33px] top-0.5 w-6 h-6 rounded-full bg-emerald-950 border border-emerald-900 text-[10px] text-emerald-400 font-bold font-mono flex items-center justify-center shadow-lg">
                    ✓
                  </span>

                  <div className="p-4 bg-emerald-950/10 border border-emerald-900/30 rounded-xl space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-semibold text-emerald-400 text-xs font-sans flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Diagnostic Closure Handshake
                      </h4>
                      <span className="text-[10px] text-emerald-500 font-mono">
                        {incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono leading-relaxed">
                      All verification handshakes succeeded. Performance baseline returned to stable region. Automated
                      incident trace archived.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RCA Workspace */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-400" /> Collaborative RCA & Post-Mortem
                </h3>
                <p className="text-[9px] text-slate-500 font-mono">SOC-2 Auditable Incident Compliance Block</p>
              </div>

              {rcaSaved ? (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-950/20 border border-emerald-900/40 rounded text-[9px] text-emerald-400 font-bold font-mono uppercase tracking-widest flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" /> Audit Locked
                  </span>
                  <button
                    onClick={handleUnlockRca}
                    className="text-[10px] font-mono uppercase text-indigo-400 hover:text-indigo-300 tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Unlock className="w-2.5 h-2.5" /> Unlock Revision
                  </button>
                </div>
              ) : (
                <span className="px-2 py-0.5 bg-amber-950/20 border border-amber-900/40 rounded text-[9px] text-amber-400 font-bold font-mono uppercase tracking-widest flex items-center gap-1">
                  <Unlock className="w-3 h-3 text-amber-400" /> Drafting State
                </span>
              )}
            </div>

            {rcaSaved ? (
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs relative">
                <div className="space-y-3.5 divide-y divide-slate-800 divide-dashed">
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                      01. Root Cause Summary
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">{rcaSummary || 'No summary committed.'}</p>
                  </div>

                  <div className="space-y-1 pt-3">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                      02. Preventive Actions
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      {rcaMitigations || 'No preventative mitigations committed.'}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                      03. Audit Action Items
                    </span>
                    <div className="space-y-1.5">
                      {rcaActionItems
                        .split('\n')
                        .filter(Boolean)
                        .map((line, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-2 text-slate-400 font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{line.replace(/^-\s*/, '')}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                      01. ROOT CAUSE STATEMENT
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                      placeholder="e.g. Memory leak in cache nodes causing socket pool exhaustion..."
                      value={rcaSummary}
                      onChange={(e) => setRcaSummary(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                      02. PREVENTATIVE ACTIONS
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                      placeholder="e.g. Added secondary failover clustering, pruned connection queue pools..."
                      value={rcaMitigations}
                      onChange={(e) => setRcaMitigations(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    03. REMEDIATION TASKS (ONE PER LINE)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                    placeholder="- Action item 1&#10;- Action item 2"
                    value={rcaActionItems}
                    onChange={(e) => setRcaActionItems(e.target.value)}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveRca}
                    disabled={!rcaSummary || !rcaMitigations}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold rounded-lg tracking-wide cursor-pointer text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Lock RCA & Post-Mortem Report</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Diagnostic Simulator & Controls */}
        <div className="space-y-6">
          {/* Live Diagnostic Probe */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Live Tracer Probe
              </span>
              <span className="text-[9px] text-slate-500 font-mono">AD-HOC WAN</span>
            </div>

            <p className="text-xs text-slate-400 leading-normal font-sans">
              Dispatch an isolated HTTP handshake probe to measure node response times and certificate integrity.
            </p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5 font-mono text-xs text-indigo-300 relative select-text">
              {diagnosticLogs.length > 0 ? (
                <div className="space-y-1.5 overflow-y-auto max-h-[160px] leading-relaxed">
                  {diagnosticLogs.map((log, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        log.includes('✓')
                          ? 'text-emerald-400'
                          : log.includes('⚠')
                            ? 'text-rose-400'
                            : 'text-slate-300'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-600 italic">No active probe records. Launch a trace below.</div>
              )}

              {diagnosticState === 'running' && (
                <div className="space-y-1 pt-1.5">
                  <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${diagnosticProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-slate-500 uppercase tracking-widest text-[8px]">
                    <span>PROBING INTERNET ACCELERATOR...</span>
                    <span>{diagnosticProgress}%</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={startDiagnosticRun}
              disabled={diagnosticState === 'running'}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white disabled:opacity-45 text-xs font-mono uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer"
            >
              {diagnosticState === 'running' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Probing Handshake...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Launch Diagnostic Trace</span>
                </>
              )}
            </button>
          </div>

          {/* On-Call Assignee Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" /> Operator Assignee
            </span>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 font-mono">
                  Assigned Team Lead
                </label>
                <select
                  className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs font-mono focus:outline-none cursor-pointer"
                  value={currentAssignee}
                  onChange={(e) => handleAssigneeChange(e.target.value)}
                >
                  <option value="unassigned">Unassigned (Alert pool)</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.email}>
                      {m.name} ({m.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Duty Roster Sync</span>
                  <span className="text-emerald-400 font-bold">● Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Escalation Rule</span>
                  <span className="text-slate-400 font-semibold">Tier-1 On-Call (12m max)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Escalation Notification Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                <BellDot className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Escalation Channels
              </span>
              <span className="text-[9px] text-slate-500 font-mono">AUTONOMIC</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-slate-400">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-2.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="text-slate-200 block font-bold font-sans">Slack Webhook</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block">Target: #ops-alerts</span>
                </div>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-bold rounded-full uppercase tracking-wider">
                  Next Rollout
                </span>
              </div>

              <div
                className={`p-3 bg-slate-950 border rounded-lg flex flex-col gap-2 ${incident.status === 'OPEN' ? 'border-rose-900/40 bg-rose-950/5' : 'border-slate-800'
                  }`}
              >
                <div className="flex items-center justify-between gap-2.5">
                  <div className="space-y-0.5">
                    <span className="text-slate-200 block font-bold font-sans flex items-center gap-1.5">
                      {incident.status === 'OPEN' && <Mail className="w-3.5 h-3.5 text-rose-400" />}
                      Corporate Email Desk
                    </span>
                    <span className="text-[9px] text-slate-500 block">Dispatched warning statements</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${incident.status === 'OPEN'
                        ? 'bg-rose-950/20 text-rose-400 border border-rose-900/40'
                        : 'bg-emerald-950/10 text-emerald-400 border border-emerald-900/30'
                      }`}
                  >
                    {incident.status === 'OPEN' ? 'Delivery Warning' : 'Delivered'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Note Entry Box */}
      {incident.status === 'OPEN' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-indigo-400" /> Post Timeline Diagnostic Update Note
          </h3>

          <form onSubmit={handleAddTimeline} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">
                  Event Category
                </label>
                <select
                  className="w-full px-2.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:outline-none cursor-pointer"
                  value={operatorTitle}
                  onChange={(e) => setOperatorTitle(e.target.value)}
                >
                  <option value="Operator Diagnostic Update">Operator Diagnosis</option>
                  <option value="Clustering Failover Initiated">Cluster Failover</option>
                  <option value="Upstream Rollback Dispatched">Queue Rollback</option>
                  <option value="Third-party Cloud Escalation">Cloud Provider Escalation</option>
                  <option value="Continuous verification probe run">Continuous probe test</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">
                  Detailed Note Description
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder="e.g. Memory profiling indicates connection pool exhaust; recycling instances..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                <SendHorizontal className="w-3.5 h-3.5 shrink-0" />
                <span>Publish Update Note</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default IncidentDetails;