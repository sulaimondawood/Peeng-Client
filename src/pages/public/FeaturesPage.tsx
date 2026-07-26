import { useAuth } from '@/src/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function FeaturesPage() {
  const { user, isAuthenticated } = useAuth()

  const navigate = useNavigate();

  const handlePrimaryCta = () => {
    if (user && isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth/login');
    }
  };
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans select-none relative pb-16">

      {/* Page Header - Left-aligned, tight vertical padding */}
      <div className="border-b border-slate-800 bg-slate-950 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
            Platform Capabilities
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            A complete breakdown of monitoring, incident management, and workspace features supported in Peeng.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* Section 1: Endpoint & Synthetic Monitoring */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white font-sans">Endpoint & Synthetic Monitoring</h2>
            <p className="text-xs text-slate-400">Core parameters for tracking service availability and health assertions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">HTTP/HTTPS Monitoring</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Support for tracking web endpoints, REST APIs, and microservices.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Configurable Check Frequencies</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Set custom check intervals (in seconds) and execution timeout limits.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Expected Response Assertions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Validate target HTTP status codes (e.g., 200 OK) and expected body keyword matches.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Performance Metrics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track latest response times (in ms) and monitor 30-day rolling uptime percentages.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Incident Management & Threshold Rules */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white font-sans">Incident Management & Threshold Rules</h2>
            <p className="text-xs text-slate-400">Automated failure triggering and recovery state verification.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Consecutive Failure Thresholds</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Set custom failure count rules before marking a service as DOWN to prevent false alerts.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Automatic Incident Creation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically flag endpoints as 'Incident Open' when failure criteria are met.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Recovery Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure recovery thresholds to confirm full service restoration.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Active Defect Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                View unresolved critical defects and investigate underlying issue logs directly from the workspace.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Audit Logging & Activity Feed */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white font-sans">Audit Logging & Activity Feed</h2>
            <p className="text-xs text-slate-400">Historical records of system health checks and manual operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Real-Time Activity Feeds</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chronological tracking of status updates, checks, and incident state changes.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Event Categorization</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Distinct severity classifications (Critical Alerts, Info, Resolved events) for clear observability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Multi-Tenant Workspace Management */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white font-sans">Multi-Tenant Workspace Management</h2>
            <p className="text-xs text-slate-400">Team isolation and access governance for enterprise projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Workspace Isolation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Separate endpoints, incident boards, and log feeds by team or project workspace.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Seamless Workspace Switching</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly switch active workspace contexts without re-authenticating.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">Role-Based Access Control</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Granular member status controls (Active, Invited, Suspended) with defined roles (Owner, Admin, Member).
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Explore Peeng Today</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Open-source uptime monitoring built with clean developer workflows.
            </p>
          </div>
          <button
            // onClick={handlePrimaryCta}
            className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
          >
            Launch Console
          </button>
        </div>
      </section>

    </div>
  );
}

export default FeaturesPage;
