import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Building,
  Check,
  CheckCircle2,
  LogOut,
  Plus,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import InitialsAvatar from '@/src/shared/InitialsAvatar';
import { useAppState } from '@/src/context/StateContext';
import { useAuth } from '@/src/context/AuthContext';

export function NoWorkspacePage() {
  const {
    addToast
  } = useAppState();
  const { user } = useAuth()
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState('My Telemetry Hub');
  const [slug, setSlug] = useState('my-telemetry-hub');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('pro');
  const [isCreating, setIsCreating] = useState(false);

  const handleNameChange = (val: string) => {
    setWorkspaceName(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setSlug(generatedSlug || 'my-workspace');
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) {
      addToast('Please enter a valid workspace name.', 'warning');
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      const newWs = {
        slug: slug || `ws-${Date.now()}`,
        name: workspaceName.trim(),
        plan: selectedPlan
      };

      // setWorkspaces(prev => [...prev, newWs]);
      // setCurrentWorkspace(newWs);
      // setIsCreating(false);

      addToast(`Workspace "${newWs.name}" successfully provisioned! Welcome aboard.`, 'success');
      // setCurrentRoute('dashboard');
      navigate('/dashboard');
    }, 1000);
  };

  const handleRestoreDemoWorkspace = () => {
    const demoWs = { slug: 'acme-corp', name: 'Acme Corp', plan: 'pro' as const };
    // if (!workspaces.some(w => w.slug === 'acme-corp')) {
    //   setWorkspaces(prev => [...prev, demoWs]);
    // }
    // setCurrentWorkspace(demoWs);
    addToast('Restored demo workspace membership (Acme Corp).', 'info');
    // setCurrentRoute('dashboard');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    // setUser(null);
    addToast('Logged out of operator account.', 'info');
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans select-none">
      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-2 border-b border-slate-900 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-black font-bold flex items-center justify-center font-display shadow-md">
            P
          </div>
          <span className="font-bold text-sm tracking-tight font-display text-white">PEENG</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono">
            <InitialsAvatar name={user?.name || 'User'} size="xs" />
            <span className="text-slate-300 text-xxs hidden sm:inline">{user?.email || 'sulaimond70@gmail.com'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 border border-rose-900/40 text-rose-400 hover:bg-rose-900/30 text-xxs font-mono transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto w-full my-auto py-8 relative z-10 space-y-6">

        {/* Warning Banner: No Workspace Membership */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-800/40 shadow-xl space-y-3">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-900/40 border border-amber-700/50 text-amber-400 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-amber-200 font-sans">No Active Workspace Membership</h2>
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Your account (<span className="text-white font-semibold">{user?.email || 'sulaimond70@gmail.com'}</span>) is signed in, but you currently do not belong to any active workspace.
              </p>
              <p className="text-xs text-amber-300/80 font-mono pt-1">
                To continue, create a workspace below or accept an invitation from an administrator.
              </p>
            </div>
          </div>
        </div>

        {/* Workspace Creation Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-400" /> Create Workspace
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Set up a workspace to manage monitors, incidents, and status pages
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateWorkspace} className="space-y-6">

            {/* Inputs: Name & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  Workspace Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Operations"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-indigo-500 font-sans"
                  value={workspaceName}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  Workspace URL Slug
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xxs font-mono text-slate-500">
                    peeng.io/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="my-workspace"
                    className="w-full pl-20 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-indigo-300 focus:outline-hidden focus:border-indigo-500 font-mono"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Plan Selector Matrix */}
            <div className="space-y-2.5">
              <label className="block text-xxs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Select Workspace Membership Tier
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Free Tier */}
                <div
                  onClick={() => setSelectedPlan('free')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative space-y-2 ${selectedPlan === 'free'
                    ? 'bg-slate-950 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/5'
                    : 'bg-slate-950/60 border-slate-850 hover:border-slate-800'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Starter Free</span>
                    {selectedPlan === 'free' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className="text-lg font-bold text-white font-mono">$0 <span className="text-xxs text-slate-500 font-normal">/mo</span></div>
                  <ul className="text-[10px] font-mono text-slate-400 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> 10 HTTP Check Nodes</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> 5-minute intervals</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Email SLA Warnings</li>
                  </ul>
                </div>

                {/* Pro Tier (Popular) */}
                <div
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative space-y-2 ${selectedPlan === 'pro'
                    ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-850 hover:border-slate-800'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-200">Pro Cluster</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[8px] font-mono uppercase font-bold">Recommended</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">$49 <span className="text-xxs text-slate-400 font-normal">/mo</span></div>
                  <ul className="text-[10px] font-mono text-slate-300 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-indigo-400" /> 100 Check Nodes</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-indigo-400" /> 30s checks & SSL alerts</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-indigo-400" /> Live Status Pages</li>
                  </ul>
                </div>

                {/* Enterprise Tier */}
                <div
                  onClick={() => setSelectedPlan('enterprise')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative space-y-2 ${selectedPlan === 'enterprise'
                    ? 'bg-slate-950 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/5'
                    : 'bg-slate-950/60 border-slate-850 hover:border-slate-800'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">Enterprise Mesh</span>
                    {selectedPlan === 'enterprise' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className="text-lg font-bold text-white font-mono">$199 <span className="text-xxs text-slate-500 font-normal">/mo</span></div>
                  <ul className="text-[10px] font-mono text-slate-400 space-y-1 pt-1">
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Unlimited Monitors</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> 1s Realtime pings</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Dedicated SLA Guarantee</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-850">
              <p className="text-xxs text-slate-400 font-mono">
                You will be assigned as <span className="text-white font-semibold">Workspace Owner</span> with full administrative clearance.
              </p>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-xs transition-all shadow-lg active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>{isCreating ? 'Provisioning Environment...' : 'Provision Workspace & Enter Dashboard'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Secondary Options: Restore Demo or Accept Invite */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-850 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-200">Have an Invitation Code?</h4>
              <p className="text-xxs text-slate-400 font-mono">Accept pending workspace operator invite</p>
            </div>
            <Link
              to="/invite/accept"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-indigo-300 text-xxs font-mono font-semibold shrink-0"
            >
              Accept Invite
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-850 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-200">Testing Environment?</h4>
              <p className="text-xxs text-slate-400 font-mono">Re-connect to Acme Corp demo workspace</p>
            </div>
            <button
              type="button"
              onClick={handleRestoreDemoWorkspace}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-emerald-300 text-xxs font-mono font-semibold shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore Acme</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="max-w-5xl mx-auto w-full text-center text-xxs font-mono text-slate-600 py-4 border-t border-slate-900/60 relative z-10">
        Peeng Infrastructure Telemetry Platform • Multi-tenant Isolation Gate
      </div>
    </div>
  );
}

export default NoWorkspacePage;
