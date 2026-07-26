import { useAuth } from '@/src/context/AuthContext';
import {
  Check,
  Copy,
  Github
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';

export function LandingPage() {
  const { addToast } = useAppState();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { user, isAuthenticated } = useAuth()

  const terminalCommand = `git clone https://github.com/peeng/peeng-monitoring.git
cd peeng-monitoring
docker compose up -d`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(terminalCommand);
    setCopied(true);
    addToast('Copied deployment command to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrimaryCta = () => {
    if (user && isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans select-none relative pb-16">

      {/* Hero Header - Structured 2-column left-aligned split */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-sans">
              Real-time endpoint monitoring and incident tracking for your services.
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Track HTTP response status, configure failure thresholds, and monitor global latency across isolated workspace environments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handlePrimaryCta}
                className="px-5 py-2.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Get Started
              </button>

              <Link
                to="https://github.com/sulaimondawood/Peeng"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
              <div className="text-slate-200 font-bold">Multi-Tenant</div>
              <div className="text-slate-400 text-xxs mt-0.5 font-sans">Isolated team workspaces</div>
            </div>
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
              <div className="text-slate-200 font-bold">Custom Assertions</div>
              <div className="text-slate-400 text-xxs mt-0.5 font-sans">Status & response checks</div>
            </div>
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
              <div className="text-slate-200 font-bold">Incident Triggers</div>
              <div className="text-slate-400 text-xxs mt-0.5 font-sans">Threshold failure alerts</div>
            </div>
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg">
              <div className="text-slate-200 font-bold">Open Source</div>
              {/* <div className="text-slate-400 text-xxs mt-0.5 font-sans">MIT licensed software</div> */}
            </div>
          </div>

        </div>
      </section>

      {/* Live Monitor Matrix Preview */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-sans">Console Operational View</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time status feed across active workspace target endpoints.</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-left">
          {/* Window title bar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="ml-2 font-mono text-xs text-slate-400 font-medium">peeng-console // workspace: peeng-production</span>
            </div>
            <div className="flex items-center gap-2 text-xxs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>LIVE FEED</span>
            </div>
          </div>

          {/* Monitor Matrix Table Header */}
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="text-slate-200 font-bold">ACTIVE MONITORS (4)</span>
              <span className="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded text-xxs">
                3 OPERATIONAL
              </span>
              <span className="text-rose-400 font-semibold bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded text-xxs">
                1 DEGRADED
              </span>
            </div>
            <div className="text-slate-400 text-xxs">
              Last checked 12 seconds ago
            </div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-slate-800/80 font-mono text-xs">

            {/* Row 1 */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-850/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 flex items-center gap-2">
                    <span>Auth Service Endpoint</span>
                    <span className="text-[10px] text-slate-500 font-mono">GET</span>
                  </div>
                  <div className="text-xxs text-slate-400 truncate">https://auth.peeng.com/healthz</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xxs shrink-0">
                <div className="text-right">
                  <div className="text-emerald-400 font-bold">200 OK</div>
                  <div className="text-slate-500">HTTP Status</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-200 font-bold">84 ms</div>
                  <div className="text-slate-500">Latency</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-slate-300">Every 30s</div>
                  <div className="text-slate-500">Interval</div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-850/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 flex items-center gap-2">
                    <span>Primary Database Cluster</span>
                    <span className="text-[10px] text-slate-500 font-mono">POST</span>
                  </div>
                  <div className="text-xxs text-slate-400 truncate">https://db-primary.peeng.internal/ping</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xxs shrink-0">
                <div className="text-right">
                  <div className="text-emerald-400 font-bold">200 OK</div>
                  <div className="text-slate-500">HTTP Status</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-200 font-bold">120 ms</div>
                  <div className="text-slate-500">Latency</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-slate-300">Every 60s</div>
                  <div className="text-slate-500">Interval</div>
                </div>
              </div>
            </div>

            {/* Row 3 - Degraded */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-rose-950/20 hover:bg-rose-950/30 transition-colors border-l-2 border-rose-500">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 flex items-center gap-2">
                    <span>Billing Gateway Proxy</span>
                    <span className="text-[10px] text-rose-400 font-mono font-semibold">INCIDENT OPEN</span>
                  </div>
                  <div className="text-xxs text-slate-400 truncate">https://billing.peeng.com/v1/status</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xxs shrink-0">
                <div className="text-right">
                  <div className="text-rose-400 font-bold">504 Gateway Timeout</div>
                  <div className="text-slate-500">HTTP Status</div>
                </div>
                <div className="text-right">
                  <div className="text-rose-400 font-bold">3,120 ms</div>
                  <div className="text-slate-500">Latency</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-amber-300">3 Failures</div>
                  <div className="text-slate-500">Consecutive</div>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-850/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 flex items-center gap-2">
                    <span>Payment Webhook Processor</span>
                    <span className="text-[10px] text-slate-500 font-mono">GET</span>
                  </div>
                  <div className="text-xxs text-slate-400 truncate">https://webhooks.peeng.com/health</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xxs shrink-0">
                <div className="text-right">
                  <div className="text-emerald-400 font-bold">200 OK</div>
                  <div className="text-slate-500">HTTP Status</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-200 font-bold">62 ms</div>
                  <div className="text-slate-500">Latency</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-slate-300">Every 15s</div>
                  <div className="text-slate-500">Interval</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            Core Monitoring Capabilities
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Engineered for straightforward operation with high visibility into service uptime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
            <h3 className="font-semibold text-sm text-white">Configurable HTTP Health Checks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitor endpoints with customizable check intervals, timeout thresholds, and HTTP method support (GET, POST, etc.).
            </p>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
            <h3 className="font-semibold text-sm text-white">Smart Failure & Recovery Rules</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Define consecutive failure thresholds to prevent false alarms before an incident is opened, and set recovery limits to verify resolution.
            </p>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
            <h3 className="font-semibold text-sm text-white">Isolated Workspace Workflows</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Organize projects into isolated team workspaces with role-based member permissions (Owners, Admins, Members).
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            How It Works
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            A simple three-step workflow to establish complete visibility over your endpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase">Step 01</div>
            <h3 className="font-semibold text-sm text-white">Create a Workspace</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set up your organization or project environment in seconds.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase">Step 02</div>
            <h3 className="font-semibold text-sm text-white">Add Your Endpoints</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Configure URL targets, expected HTTP status codes, response time limits, and evaluation intervals.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase">Step 03</div>
            <h3 className="font-semibold text-sm text-white">Track & Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              View active incident reports, detailed audit log histories, and response time metrics on your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Developer & Deployment Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-white font-sans">
              Self-Hostable & Developer-First
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploy on your own infrastructure or run locally. Built for full operational control.
            </p>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Quickstart via Docker Compose</span>
              <button
                type="button"
                onClick={handleCopyCommand}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xxs"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded p-3 font-mono text-xs text-slate-200 overflow-x-auto">
              <pre className="text-indigo-300 leading-relaxed">{terminalCommand}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Start Monitoring Today</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Free and open-source uptime monitoring built for developers and teams.
            </p>
          </div>
          <button
            onClick={handlePrimaryCta}
            className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
          >
            Launch Console
          </button>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;
