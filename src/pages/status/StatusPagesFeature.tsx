import { useAuth } from '@/src/context/AuthContext';
import { CheckCircle2, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';

export default function StatusPagesFeature() {
  const { addToast } = useAppState();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const { user } = useAuth()

  const handleNotify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    addToast(`Added ${emailInput.trim()} to Status Pages updates list.`, 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 lg:p-6 font-sans select-none">

      {/* Banner */}
      <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono">
            <span>Status Pages v2.0 • Active Development</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 font-display tracking-tight leading-tight">
            Share uptime status and incident updates with your users.
          </h2>

          <p className="text-xs text-slate-400 font-mono leading-relaxed">
            Create public or private status pages on custom domains. Share real-time latency status, uptime history, and active incident timelines automatically.
          </p>

          {/* Email Early Access Bar */}
          <form onSubmit={handleNotify} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
            <div className="relative flex-1">
              <input
                type="email"
                required
                disabled={true}
                value={user?.email}
                placeholder="user@company.com"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 font-mono focus:outline-hidden focus:border-indigo-500 disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all cursor-pointer shrink-0 ${subscribed
                ? 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white font-sans'
                }`}
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Updates Subscribed</span>
                </>
              ) : (
                <>
                  <span>Get Notified</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Feature Spec Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-200">Custom Domains & SSL</div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            Map status pages to custom domain CNAME records with automatic SSL certificates.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-200">Real-Time Metrics</div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            Display live response time charts, uptime percentages, and latency metrics.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-200">Subscriber Notifications</div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            Allow users to subscribe to email or SMS alerts when incidents occur.
          </p>
        </div>
      </div>

    </div>
  );
}

export { StatusPagesFeature };
