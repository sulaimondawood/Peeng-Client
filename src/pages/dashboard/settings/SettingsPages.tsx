import {
  Building,
  KeyRound,
  Lock,
  Plus,
  ShieldAlert,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotificationChannelsPanel } from './_components/NotificationChannelsPanel';
import { SettingsProfileSkeleton } from './_components/skeleton/SettingsProfileSkeleton';
import { UpdateNameForm } from './_components/UpdateNameForm';
import { UpdatePasswordForm } from './_components/UpdatePasswordForm';
import { useAuth } from '@/src/context/AuthContext';
import { getLastTenantId } from '@/src/lib/api/auth-storage';
import { PATHS } from '@/src/utils/routes/paths';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface UserProfile {
  name: string;
  email: string;
}

export default function SettingsPages() {
  const navigate = useNavigate();
  const { user, memberships, activeTenantId } = useAuth()

  const currentMembership = useMemo(() => {
    if (memberships.length === 0) return null;

    if (activeTenantId) {
      const found = memberships.find((m) => m.tenantId === activeTenantId);
      if (found) return found;
    }

    return memberships[0];
  }, [memberships, activeTenantId, getLastTenantId()]);


  const isProfileLoading = false;



  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: 'ws-1', name: 'peeng Corp', slug: 'peeng-corp', plan: 'pro' },
  ]);



  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 lg:p-6 font-sans select-none text-zinc-100">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
          Workspace & Profile Settings
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5 font-mono">
          Modify core registry configs, credential tokens, escalation channels, and profile controls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Panel 1: Profile Name & Account Password Forms */}
        {isProfileLoading ? (
          <SettingsProfileSkeleton />
        ) : (
          <div className="space-y-6">
            <UpdateNameForm initialName={user?.name || ''} />
            <UpdatePasswordForm />
          </div>
        )}


        {/* Panel 3: API Authentication Tokens (Coming Soon) */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap gap-y-2 items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-400" /> API Authentication Tokens
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-indigo-400" /> Disabled in v1 • Coming Soon
            </span>
          </div>

          <div className="space-y-4 opacity-50 pointer-events-none select-none">
            <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-3xl">
              Integrate telemetry into your CI/CD pipelines, Ansible setups, or Terraform providers using automated API tokens. Token management is restricted in v1 preview mode.
            </p>

            <div className="flex flex-wrap gap-2.5 max-w-md">
              <input
                type="text"
                disabled
                className="flex-1 px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 cursor-not-allowed"
                placeholder="e.g. Jenkins Staging Runner Ingest"
                readOnly
              />
              <button
                type="button"
                disabled
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg bg-zinc-800 text-zinc-500 font-semibold text-xs cursor-not-allowed shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create Key</span>
              </button>
            </div>
          </div>
        </div>


        <NotificationChannelsPanel userEmail={user?.email} />

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap gap-y-2  items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-400" /> Workspace Memberships & Controls
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-medium">
              {workspaces.length} Active {workspaces.length === 1 ? 'Workspace' : 'Workspaces'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-zinc-200">
                Current Workspace: {currentMembership?.workspaceName ?? "-"}
              </h4>
              <p className="text-xs text-zinc-400 font-mono">
                Slug: <span className="text-indigo-300">{currentMembership?.slug ?? "-"}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate(PATHS.ONBOARDING.NO_WORKSPACE)}
                className="px-3 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0"
              >
                Create Workspace
              </button>
            </div>
          </div>
        </div>


        <div className="border border-zinc-800 rounded-xl p-5 md:p-6 bg-zinc-950 space-y-4 shadow-xl">
          <div className="flex flex-wrap gap-y-2  items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" /> Dangerous Area Functions
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-mono font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-zinc-500" /> Disabled in v1
            </span>
          </div>

          <div className="space-y-3 opacity-50 pointer-events-none select-none">
            <p className="text-xs text-zinc-400 font-mono max-w-2xl leading-relaxed">
              Workspace sweep and deletion operations are restricted in this preview build to prevent accidental data loss across shared monitoring nodes.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                disabled
                type="button"
                className="px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 text-xs font-mono uppercase tracking-wider font-bold cursor-not-allowed"
              >
                Flush Telemetry Archives
              </button>
              <button
                disabled
                type="button"
                className="px-3.5 py-2 rounded-lg bg-red-950/40 border border-red-900/40 text-red-500 text-xs font-mono uppercase tracking-wider font-bold cursor-not-allowed"
              >
                Destroy Workspace Instance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export { SettingsPages };
