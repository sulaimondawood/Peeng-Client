import { useAppState } from '@/src/context/StateContext';
import { CreateMonitorRequest, MonitorHttpType, MonitorType, TimeUnit } from '@/src/types/monitor';
import { PATHS } from '@/src/utils/routes/paths';
import { AlertCircle, ArrowLeft, Globe, Loader2, Save, Sliders, Terminal } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMonitor } from './hooks/use-monitor';


export default function CreateMonitor() {
  const navigate = useNavigate();
  const createMonitorMutation = useCreateMonitor();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [intervalValue, setIntervalValue] = useState<number>(60);
  const [intervalUnit, setIntervalUnit] = useState<TimeUnit>('SECONDS');
  const [timeoutSeconds, setTimeoutSeconds] = useState<number>(5);
  const [expectedStatusCode, setExpectedStatusCode] = useState<number>(200);
  const [expectedKeyword, setExpectedKeyword] = useState('');
  const [failureThreshold, setFailureThreshold] = useState<number>(3);
  const [recoveryThreshold, setRecoveryThreshold] = useState<number>(1);
  const [validationError, setValidationError] = useState('');
  const { addToast } = useAppState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return setValidationError('Please enter a monitor name.');
    }
    if (!url.trim()) {
      return setValidationError('Please enter a target URL.');
    }

    try {
      new URL(url);
    } catch {
      return setValidationError('Target URL is invalid. Please include the protocol (e.g. https://).');
    }

    setValidationError('');

    const payload: CreateMonitorRequest = {
      name: name.trim(),
      url: url.trim(),
      intervalValue,
      intervalUnit,
      timeoutSeconds,
      failureThreshold,
      recoveryThreshold,
      expectedStatusCode,
      expectedKeyword: expectedKeyword.trim() || undefined,
    };

    createMonitorMutation.mutate(payload, {
      onSuccess: () => {
        navigate(PATHS.DASHBOARD.MONITORS.LIST);
      }
    });
  };

  const minAllowedValue = (unit: TimeUnit = intervalUnit) => {
    switch (unit) {
      case 'SECONDS':
        return 60;
      case 'MINUTES':
      case 'HOURS':
      default:
        return 1;
    }
  }

  const handleUnitChange = (newUnit: TimeUnit) => {
    setIntervalUnit(newUnit);
    const min = minAllowedValue(newUnit);
    if (intervalValue < min) {
      setIntervalValue(min);
    }
  };

  const handleBlur = () => {
    const min = minAllowedValue();
    if (intervalValue < min) {
      setIntervalValue(min);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none text-zinc-100">
      {/* Header Area */}
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Create Monitor</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure automated health checks and threshold assertions for your API endpoints.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Main Form Fields */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 space-y-5 shadow-xl">
            {validationError && (
              <div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* General Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Monitor Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors font-medium"
                  placeholder="e.g. Authentication API Service"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Endpoint URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 my-auto flex items-center pr-3 pointer-events-none text-zinc-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    required
                    className="w-full pl-10 pr-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors font-mono"
                    placeholder="https://api.example.com/health"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onBlur={() => {
                      if (url.trim() && !/^https?:\/\//i.test(url.trim())) {
                        setUrl(`https://${url.trim()}`);
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  HTTP Method
                </label>
                <select
                  disabled
                  value="GET"
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white opacity-60 cursor-not-allowed font-mono"
                >
                  <option value="GET">GET</option>
                </select>
                <p className="mt-1 text-[10px] text-zinc-500 font-mono">
                  Only GET checks are supported for now.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Monitor Type
                </label>
                <select
                  disabled
                  value="HTTP"
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white opacity-60 cursor-not-allowed font-mono"
                >
                  <option value="HTTP">HTTP / HTTPS</option>
                </select>
                <p className="mt-1 text-[10px] text-zinc-500 font-mono">
                  Only HTTP/HTTPS monitors are available for now.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Check Interval
                </label>
                <input
                  type="number"
                  min={minAllowedValue()}
                  required
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none font-mono"
                  value={intervalValue}
                  onChange={(e) => setIntervalValue(Number(e.target.value))}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Interval Unit
                </label>
                <select
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none cursor-pointer font-mono"
                  value={intervalUnit}
                  onChange={(e) => handleUnitChange(e.target.value as TimeUnit)}
                >
                  <option value="SECONDS">Seconds</option>
                  <option value="MINUTES">Minutes</option>
                  <option value="HOURS">Hours</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Timeout (1–15 Seconds)
                </label>
                <input
                  type="number"
                  min={2}
                  max={15}
                  required
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none font-mono"
                  value={timeoutSeconds}
                  onChange={(e) => setTimeoutSeconds(Number(e.target.value))}
                />
              </div>
            </div>


            <div className="border-t border-zinc-800 pt-5 space-y-4">
              <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-zinc-400" /> Assertion Rules & Incident Thresholds
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Expected Status Code
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={599}
                    required
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none font-mono"
                    value={expectedStatusCode}
                    onChange={(e) => setExpectedStatusCode(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2 flex items-center justify-between">
                    <span>Expected Keyword</span>
                    <span className="text-[10px] text-zinc-500 font-normal lowercase">optional</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none"
                    placeholder="e.g. 'status':'ok'"
                    value={expectedKeyword}
                    onChange={(e) => setExpectedKeyword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1 flex items-center justify-between">
                    <span>Failure Threshold</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{failureThreshold} fails</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    className="w-full accent-white h-1 bg-zinc-800 rounded-lg cursor-pointer"
                    value={failureThreshold}
                    onChange={(e) => setFailureThreshold(Number(e.target.value))}
                  />
                  <span className="text-[10px] font-mono text-zinc-500 block mt-1">
                    Triggers incident after consecutive check failures
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1 flex items-center justify-between">
                    <span>Recovery Threshold</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{recoveryThreshold} wins</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    className="w-full accent-white h-1 bg-zinc-800 rounded-lg cursor-pointer"
                    value={recoveryThreshold}
                    onChange={(e) => setRecoveryThreshold(Number(e.target.value))}
                  />
                  <span className="text-[10px] font-mono text-zinc-500 block mt-1">
                    Resolves incident after successful checks
                  </span>
                </div>
              </div>
            </div>


            <div className="border-t border-zinc-800 pt-5 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(PATHS.DASHBOARD.MONITORS.LIST)}
                className="px-4 py-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMonitorMutation.isPending}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs tracking-tight transition-colors cursor-pointer disabled:opacity-50"
              >
                {createMonitorMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Monitor</span>
              </button>
            </div>
          </div>
        </form>

        {/* Live Preview Panel */}
        <div className="space-y-4">
          <div className="px-1 text-[11px] font-mono uppercase font-semibold text-zinc-500">
            Monitor Preview
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4 shadow-xl text-xs font-sans">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" /> Target Summary
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white truncate">
                {name || 'Service Name'}
              </div>
              <div className="text-[11px] font-mono text-zinc-500 truncate" title={url}>
                {url || 'https://api.domain.com/health'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-zinc-800 pt-4 text-[11px] font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Method</span>
                <span className="text-zinc-300 block mt-0.5">GET</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Frequency</span>
                <span className="text-zinc-300 block mt-0.5">
                  {intervalValue} {intervalUnit.toLowerCase()}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Expected Code</span>
                <span className="text-zinc-300 block mt-0.5">HTTP {expectedStatusCode}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Timeout</span>
                <span className="text-zinc-300 block mt-0.5">{timeoutSeconds}s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export { CreateMonitor };
