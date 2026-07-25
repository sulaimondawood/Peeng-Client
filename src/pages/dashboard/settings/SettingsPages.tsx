import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sliders,
  KeyRound,
  BellRing,
  Plus,
  Save,
  ShieldAlert,
  Lock,
  Mail,
  MessageSquare,
  PhoneCall,
  Radio,
  Send,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  Check,
  Key,
  Building
} from 'lucide-react';
import { SettingsProfileSkeleton } from './_components/skeleton/SettingsProfileSkeleton';
import InitialsAvatar from '@/src/shared/InitialsAvatar';
import { SettingsPanelSkeleton } from './_components/skeleton/SettingsPanelSkeleton';



export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  created: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export default function SettingsPages() {
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // Data Fetching Hook Placeholders (e.g. TanStack Query)
  // -------------------------------------------------------------
  const isProfileLoading = false;
  const isWorkspaceLoading = false;

  // Real data state target initializations
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Sulaimon D.',
    email: 'sulaimond70@gmail.com'
  });

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>({
    id: 'ws-1',
    name: 'Acme Corp',
    slug: 'acme-corp',
    plan: 'pro'
  });

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: 'ws-1', name: 'Acme Corp', slug: 'acme-corp', plan: 'pro' }
  ]);

  const [apiKeys] = useState<ApiKeyItem[]>([]);

  // Workspace form state
  const [workspaceName, setWorkspaceName] = useState(currentWorkspace.name);
  const [workspaceSlug, setWorkspaceSlug] = useState(currentWorkspace.slug);
  const [newKeyLabel] = useState('');

  // Password update form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User Profile form state
  const [profileName, setProfileName] = useState(user?.name || '');

  // Notifications toggles
  const [channels, setChannels] = useState({
    emailRules: true,
    slackWebhook: false,
    pagerduty: false,
    webhookPayloads: false
  });

  const handleUpdateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentWorkspace((prev) => ({
      ...prev,
      name: workspaceName,
      slug: workspaceSlug
    }));
    // API Call: PATCH /api/workspaces/:id
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) return;
    setUser((prev) => (prev ? { ...prev, name: profileName.trim() } : null));
    // API Call: PATCH /api/user/profile
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) return;
    if (newPassword.length < 8) return;
    if (newPassword !== confirmPassword) return;

    // API Call: POST /api/user/password
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 lg:p-6 font-sans select-none">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
          Workspace Settings
        </h2>
        <p className="text-xs text-slate-400 mt-0.5 font-mono">
          Modify core registry configs, credential tokens, escalation channels, and zone controls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Panel 0: Account Profile & Password Management */}
        {isProfileLoading ? (
          <SettingsProfileSkeleton />
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" /> Account Identity & Security
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Owner Clearance
              </span>
            </div>

            {/* Profile Summary Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <InitialsAvatar name={user?.name || profileName} size="xl" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-100">{user?.name || profileName}</h4>
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono font-semibold uppercase tracking-wider">
                      Initials DP Profile
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{user?.email || ''}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="px-3 py-1.8 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none font-sans w-full sm:w-48"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-3 py-1.8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0"
                >
                  Update Name
                </button>
              </form>
            </div>

            {/* Password Form */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
                <Key className="w-4 h-4 text-indigo-400" /> Update Account Password
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        className="w-full pl-3 pr-9 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none font-mono"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                        title={showCurrentPassword ? 'Hide password' : 'Show password'}
                      >
                        {showCurrentPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        className="w-full pl-3 pr-9 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none font-mono"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                        title={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        className="w-full pl-3 pr-9 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none font-mono"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                        title={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                  <div className={`flex items-center gap-1.5 ${newPassword.length >= 8 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                    <Check className="w-3 h-3" /> Minimum 8 characters
                  </div>
                  <div className={`flex items-center gap-1.5 ${newPassword && newPassword === confirmPassword ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                    <Check className="w-3 h-3" /> Passwords match
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-tight transition-all cursor-pointer shadow-md shadow-indigo-600/10"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Panel 1: General Workspace Credentials form */}
        {isWorkspaceLoading ? (
          <SettingsPanelSkeleton fieldCount={2} />
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" /> General Configuration
            </h3>

            <form onSubmit={handleUpdateWorkspace} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
                  Workspace Official Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
                  Workspace URL Handle Slug
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none font-mono"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-tight transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Registry</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Panel 2: API Keys Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-400" /> API Authentication Tokens
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-indigo-400" /> Disabled in v1 • Coming Soon
            </span>
          </div>

          <div className="space-y-4 opacity-50 pointer-events-none select-none">
            <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-3xl">
              Integrate Peeng telemetry into your CI/CD pipelines, Ansible setups, or Terraform providers using automated API tokens. Ingestion token management is restricted in v1 preview mode.
            </p>

            <div className="flex gap-2.5 max-w-md">
              <input
                type="text"
                disabled
                className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 cursor-not-allowed"
                placeholder="e.g. Jenkins Staging Runner Ingest"
                value={newKeyLabel}
                readOnly
              />
              <button
                type="button"
                disabled
                className="flex items-center gap-1 px-3.5 py-1.8 rounded-lg bg-slate-800 text-slate-500 font-semibold text-xs cursor-not-allowed shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create Key</span>
              </button>
            </div>

            <div className="border border-slate-800 bg-slate-950/60 rounded-xl divide-y divide-slate-800 overflow-hidden">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-3.5 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-300 text-xs">{key.name}</div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                      <span className="text-indigo-400/70 font-semibold">{key.key}</span>
                      <span>•</span>
                      <span>Provisioned {key.created}</span>
                    </div>
                  </div>

                  <button
                    disabled
                    type="button"
                    className="p-1 px-2 text-xs font-mono uppercase font-semibold text-slate-600 rounded cursor-not-allowed"
                  >
                    Revoke key
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 3: Escalation channels */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <BellRing className="w-4 h-4 text-indigo-400" /> Webhook & Escalation Channels
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono font-medium flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-emerald-400" /> Email Supported • Others Next Rollout
            </span>
          </div>

          <div className="p-3.5 bg-indigo-950/40 border border-indigo-800/40 rounded-xl flex items-start gap-3">
            <Radio className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="font-semibold text-indigo-200 font-sans flex items-center gap-2">
                <span>Active Notification Channel: Email Only</span>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Incident alerts and downtime warnings are delivered to <span className="text-indigo-300 font-semibold">{user?.email || ''}</span>. Additional channel integrations (Slack, PagerDuty, Webhooks, SMS) will be enabled in our next planned rollout.
              </p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-300">
            {/* Email Channel */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950 border border-emerald-800/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100 text-xs font-sans">Corporate Email Transmitters</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[9px] font-mono uppercase tracking-wider font-bold">
                      Active
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block font-mono">
                    Delivers outage, latency, and recovery alerts to {user?.email || ''}
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={channels.emailRules}
                onChange={() => setChannels((c) => ({ ...c, emailRules: !c.emailRules }))}
                className="w-4 h-4 accent-indigo-500 rounded bg-slate-950 cursor-pointer"
              />
            </div>

            {/* Slack Webhook */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 transition-all cursor-pointer group/item">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 group-hover/item:text-slate-200 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300 group-hover/item:text-slate-100 text-xs font-sans">
                      Slack Telemetry Webhooks
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-mono uppercase tracking-wider font-semibold">
                      Next Rollout
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block font-mono">
                    Instant JSON payload notifications targeting #ops-alerts channel
                  </span>
                </div>
              </div>
              <button type="button" className="text-xs text-indigo-400 font-mono hover:underline uppercase tracking-wider cursor-pointer">
                Details
              </button>
            </div>

            {/* PagerDuty */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 transition-all cursor-pointer group/item">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 group-hover/item:text-slate-200 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300 group-hover/item:text-slate-100 text-xs font-sans">
                      PagerDuty On-call Rotation
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[9px] font-mono uppercase tracking-wider font-semibold">
                      Next Rollout
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block font-mono">
                    Urgent phone call sirens and automated engineer escalation pages
                  </span>
                </div>
              </div>
              <button type="button" className="text-xs text-indigo-400 font-mono hover:underline uppercase tracking-wider cursor-pointer">
                Details
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-indigo-400" />
              <span>Send Test Notification</span>
            </button>
          </div>
        </div>

        {/* Panel 3.5: Workspace Memberships */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-400" /> Workspace Memberships & Controls
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono font-medium">
              {workspaces.length} Active {workspaces.length === 1 ? 'Workspace' : 'Workspaces'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-200">Current Workspace: {currentWorkspace.name}</h4>
              <p className="text-xs text-slate-400 font-mono">
                Slug: <span className="text-indigo-300">{currentWorkspace.slug}</span> • Plan:{' '}
                <span className="uppercase text-white font-semibold">{currentWorkspace.plan}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/no-workspace')}
                className="px-3 py-1.8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0"
              >
                + Create Workspace
              </button>
              <button
                type="button"
                onClick={() => {
                  setWorkspaces([]);
                  navigate('/no-workspace');
                }}
                className="px-3 py-1.8 rounded-lg bg-amber-950/50 border border-amber-800/60 hover:bg-amber-900/40 text-amber-300 font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0"
              >
                Leave All Workspaces
              </button>
            </div>
          </div>
        </div>

        {/* Panel 4: Danger Zone */}
        <div className="border border-slate-800 rounded-xl p-5 md:p-6 bg-slate-900/60 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-500" /> Dangerous Area Functions
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-slate-500" /> Disabled in v1
            </span>
          </div>

          <div className="space-y-3 opacity-50 pointer-events-none select-none">
            <p className="text-xs text-slate-400 font-mono max-w-2xl leading-relaxed">
              Workspace sweep and deletion operations are restricted in this preview build to prevent accidental data loss across shared monitoring nodes.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                disabled
                type="button"
                className="px-3.5 py-1.8 rounded-lg border border-slate-800 bg-slate-950 text-slate-500 text-xs font-mono uppercase tracking-wider font-bold cursor-not-allowed"
              >
                Flush checked telemetry archives
              </button>
              <button
                disabled
                type="button"
                className="px-3.5 py-1.8 rounded-lg bg-slate-800 text-slate-500 text-xs font-mono uppercase tracking-wider font-bold cursor-not-allowed"
              >
                Destroy Workspace Instance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SettingsPages };