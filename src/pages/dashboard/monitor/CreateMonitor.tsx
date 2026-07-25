import React, { useState } from 'react';
import { ArrowLeft, Save, Globe, Info, Sliders, CheckSquare, ShieldCheck, Terminal } from 'lucide-react';

export default function CreateMonitor() {

  // Field states
  const [name, setName] = useState('Acme Core Authentication Endpoint');
  const [url, setUrl] = useState('https://auth.acme.com/v2/health');
  const [interval, setIntervalVal] = useState<number>(30); // in seconds
  const [timeout, setTimeoutVal] = useState<number>(2000); // in ms
  const [expectedStatus, setExpectedStatus] = useState<number>(200);
  const [expectedKeyword, setExpectedKeyword] = useState('');
  const [failureThreshold, setFailureThreshold] = useState<number>(2);
  const [recoveryThreshold, setRecoveryThreshold] = useState<number>(2);
  const [tagInput, setTagInput] = useState('production, authentication');

  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setValidationError('Please configure a descriptive monitor identifier name.');
    if (!url.trim()) return setValidationError('A target endpoint validation host URL is required.');

    // Quick URL validation check
    try {
      new URL(url);
    } catch {
      return setValidationError('Host target is not a valid fully-qualified URI. Ensure you include the protocol, e.g. https://');
    }

    setValidationError('');

    // Parse tag inputs
    const tags = tagInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    // createMonitor({
    //   name,
    //   url,
    //   interval,
    //   timeout,
    //   expectedStatus,
    //   expectedKeyword,
    //   failureThreshold,
    //   recoveryThreshold,
    //   tags
    // });

    // setCurrentRoute('monitors');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 lg:p-6 font-sans select-none">

      {/* Upper header action area */}
      <div className="flex items-center gap-3">
        <button
          // onClick={() => setCurrentRoute('monitors')}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-405 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-100 font-display tracking-tight">Spawn HTTP(S) Node Tracker</h2>
          <p className="text-xs text-slate-450 mt-0.5">Define your tracking intervals, validation assertions, and diagnostic hooks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Form Body Fields (2 Columns) */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 md:p-6 space-y-5 shadow-2xl">

            {validationError && (
              <div className="rounded-lg bg-rose-950/20 border border-rose-900/50 p-3 text-xs text-rose-400 font-mono">
                🛑 Verification constraint error: {validationError}
              </div>
            )}

            {/* General monitor fields layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Monitor Label Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-all font-medium"
                  placeholder="e.g. Acme API Gateway"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Tracking Destination Host URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 my-auto flex items-center pr-3 pointer-events-none text-slate-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    required
                    className="w-full pl-10 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                    placeholder="https://api.example.com/v1/healthz"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Check Schedule Interval (Seconds)
                </label>
                <select
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-hidden focus:ring-0 cursor-pointer"
                  value={interval}
                  onChange={(e) => setIntervalVal(Number(e.target.value))}
                >
                  <option value={15}>Every 15 seconds (High frequency)</option>
                  <option value={30}>Every 30 seconds (Default)</option>
                  <option value={60}>Every 1 minute</option>
                  <option value={300}>Every 5 minutes</option>
                  <option value={1800}>Every 30 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Validation Timeout (MS)
                </label>
                <input
                  type="number"
                  min={100}
                  max={30000}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                  value={timeout}
                  onChange={(e) => setTimeoutVal(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Threshold checks layout */}
            <div className="border-t border-slate-850/80 pt-5 space-y-4">
              <h3 className="text-xxs font-mono uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Assertion & Escalation Threshold Rules
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-slate-550 font-semibold mb-2">
                    Expected HTTP Status Code
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={599}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                    value={expectedStatus}
                    onChange={(e) => setExpectedStatus(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-slate-550 font-semibold mb-2 flex items-center justify-between">
                    <span>Expected Keyword Assertion</span>
                    <span className="text-xxxxs text-slate-500 font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-all"
                    placeholder="e.g. system_healthy / uptime"
                    value={expectedKeyword}
                    onChange={(e) => setExpectedKeyword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-slate-550 font-semibold mb-1 flex items-center justify-between">
                    <span>Outage Failure Threshold</span>
                    <span className="text-xxxxs text-slate-500 font-sans font-normal">{failureThreshold} fails</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    className="w-full accent-indigo-500 h-1 bg-slate-850 rounded-lg cursor-pointer"
                    value={failureThreshold}
                    onChange={(e) => setFailureThreshold(Number(e.target.value))}
                  />
                  <span className="text-xxxxs font-mono text-slate-500 block mt-1">Declares DOWN after consecutive failed checks</span>
                </div>

                <div>
                  <label className="block text-xxs font-mono uppercase tracking-wider text-slate-550 font-semibold mb-1 flex items-center justify-between">
                    <span>Recovery Verification Target</span>
                    <span className="text-xxxxs text-slate-500 font-sans font-normal">{recoveryThreshold} wins</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    className="w-full accent-indigo-400 h-1 bg-slate-850 rounded-lg cursor-pointer"
                    value={recoveryThreshold}
                    onChange={(e) => setRecoveryThreshold(Number(e.target.value))}
                  />
                  <span className="text-xxxxs font-mono text-slate-500 block mt-1">Restores status UP after validation successes</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xxs font-mono uppercase tracking-wider text-slate-550 font-semibold mb-2">
                    Segmentation Tags (Comma-aligned values)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-hidden"
                    placeholder="e.g. staging, api, graphql"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="border-t border-slate-850/80 pt-5 flex items-center justify-end gap-3.5">
              <button
                type="button"
                // onClick={() => setCurrentRoute('monitors')}
                className="px-4 py-2 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
              >
                Abort
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-tight transition-all cursor-pointer shadow-md shadow-indigo-600/10"
              >
                <Save className="w-4 h-4" />
                <span>Initialize Tracker Node</span>
              </button>
            </div>

          </div>
        </form>

        {/* Live Visual Board Preview (1 Column) */}
        <div className="space-y-4">
          <div className="px-1 text-xxs font-mono uppercase font-semibold text-slate-450 tracking-wider">
            Monitor Preview
          </div>

          <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-4.5 shadow-xl font-sans relative overflow-hidden">
            {/* Simulation Header Preview */}
            <div className="flex items-center justify-between">
              <span className="text-xxxxs font-mono uppercase text-indigo-400 font-semibold flex items-center gap-1">
                <Terminal className="w-3 h-3 text-indigo-400" /> Live Preview
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-150 truncate leading-snug">{name || 'Monitor Name Placeholder'}</div>
              <div className="text-xxs font-mono text-slate-500 truncate" title={url}>{url || 'https://domain.com/path'}</div>
            </div>

            {/* Preview Parameters */}
            <div className="grid grid-cols-2 gap-3.5 border-t border-slate-850/80 pt-4 text-xxs font-mono">
              <div>
                <span className="text-slate-550 block text-xxxxs uppercase font-semibold">Frequency rate</span>
                <span className="text-slate-350 block mt-0.5">{interval}s</span>
              </div>
              <div>
                <span className="text-slate-550 block text-xxxxs uppercase font-semibold">Acceptable Code</span>
                <span className="text-slate-350 block mt-0.5">HTTP {expectedStatus}</span>
              </div>
              <div>
                <span className="text-slate-550 block text-xxxxs uppercase font-semibold">Fail Threshold</span>
                <span className="text-slate-350 block mt-0.5">{failureThreshold} fails</span>
              </div>
              <div>
                <span className="text-slate-550 block text-xxxxs uppercase font-semibold">Target SSL Check</span>
                <span className="text-slate-350 block mt-0.5">{url.startsWith('https://') ? 'ACTIVE (90D TLS)' : 'INACTIVE'}</span>
              </div>
            </div>

            <div className="rounded-lg p-3 bg-slate-950 border border-slate-850 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xxxxs text-slate-500 font-mono leading-relaxed uppercase">
                Free tier accounts can register up to 10 HTTP monitor checks. Alerts are sent via Email to your account (Slack & Webhook integrations arriving in next rollout).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { CreateMonitor };
