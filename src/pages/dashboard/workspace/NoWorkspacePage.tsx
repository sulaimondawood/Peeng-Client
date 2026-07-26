import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Loader2, LogOut, Plus, ShieldAlert } from 'lucide-react';


import { useAuth } from '@/src/context/AuthContext';
import { useCreateWorkspace } from '@/src/hooks/use-tenant';
import InitialsAvatar from '@/src/shared/InitialsAvatar';
import { PATHS } from '@/src/utils/routes/paths';
import { clearAuth } from '@/src/lib/api/auth-storage';

export function NoWorkspacePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState('');
  const createWorkspaceMutation = useCreateWorkspace();

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    createWorkspaceMutation.mutate(
      { workspaceName: workspaceName.trim() },
      {
        onSuccess: () => {
          navigate(PATHS.DASHBOARD.ROOT);
        },
      }
    );
  };

  const handleLogout = () => {
    clearAuth();
    navigate(PATHS.AUTH.LOGIN);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans select-none">
      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-2 border-b border-zinc-900 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-sm tracking-tight font-display text-white">PEENG</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono">
            <InitialsAvatar name={user?.name || 'User'} size="xs" />
            <span className="text-zinc-300 text-[10px] hidden sm:inline">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:bg-red-900/30 text-[10px] font-mono transition-all cursor-pointer"
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
              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                Your account (<span className="text-white font-semibold">{user?.email}</span>) is signed in, but you currently do not belong to any active workspace.
              </p>
              <p className="text-xs text-amber-300/80 font-mono pt-1">
                To continue, create a workspace below or accept an invitation from an administrator.
              </p>
            </div>
          </div>
        </div>

        {/* Workspace Creation Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h1 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-400" /> Create Workspace
              </h1>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Set up a workspace to manage monitors, incidents, and status pages.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateWorkspace} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Workspace Title
              </label>
              <input
                type="text"
                required
                disabled={createWorkspaceMutation.isPending}
                placeholder="e.g. Peeng Operations"
                className="w-full px-3.5 py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-zinc-700 font-sans transition-colors"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
              <p className="text-[10px] text-zinc-400 font-mono">
                You will be assigned as <span className="text-white font-semibold">Workspace Owner</span> with full administrative clearance.
              </p>

              <button
                type="submit"
                disabled={createWorkspaceMutation.isPending || !workspaceName.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                {createWorkspaceMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Provisioning Environment...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Provision Workspace & Enter Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-[10px] font-mono text-zinc-600 py-4 border-t border-zinc-900 relative z-10">
        Peeng Infrastructure Telemetry Platform • Multi-tenant Isolation Gate
      </div>
    </div>
  );
}

export default NoWorkspacePage;