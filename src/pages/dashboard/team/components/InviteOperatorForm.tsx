import React, { useState } from 'react';
import { Mail, Shield, UserPlus, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';
import { RoleType } from '@/src/types/auth';
import { useAppState } from '@/src/context/StateContext';
import { error } from 'console';


interface InviteOperatorFormProps {
  id?: string;
  onInvite: (email: string, role: RoleType) => void;
  isSubmitting?: boolean;
}

export function InviteOperatorForm({
  id = 'invite-operator-form',
  onInvite,
  isSubmitting = false,
}: InviteOperatorFormProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RoleType>('MEMBER');

  const { addToast } = useAppState()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      addToast('Please enter a valid email address.', "error");
      return;
    }

    onInvite(trimmedEmail, role);
    setEmail('');
    setRole('MEMBER');
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4 text-zinc-100" id={id}>
      <div className="space-y-1">
        <h2 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <UserPlus className="w-3.5 h-3.5 text-zinc-400" />
          Invite Team Member
        </h2>
        <p className="text-[11px] text-zinc-400">
          Send an email invitation to add a team member to this workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Email Address</span>
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 focus:border-zinc-700 rounded-lg text-white font-mono focus:outline-none transition-colors"
            placeholder="colleague@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            id={`${id}-email-input`}
          />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Role</span>
            <Shield className="w-3.5 h-3.5 text-zinc-500" />
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as RoleType)}
            className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 focus:border-zinc-700 rounded-lg text-white cursor-pointer font-mono focus:outline-none transition-colors"
            disabled={isSubmitting}
            id={`${id}-role-select`}
          >
            <option value="ADMIN">ADMIN (Full Access)</option>
            <option value="MEMBER">MEMBER (Standard Access)</option>
            <option value="VIEWER">VIEWER (Read-Only)</option>
          </select>


          <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80 flex gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {role === 'ADMIN' && 'Can edit monitors, manage settings, invite members, and configure workspace rules.'}
              {role === 'MEMBER' && 'Can manage monitors, acknowledge incidents, and update telemetry settings.'}
              {role === 'VIEWER' && 'Read-only access to monitors, status metrics, and incident logs.'}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
          id={`${id}-submit-btn`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Sending Invite...
            </span>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5" />
              Send Invitation
            </>
          )}
        </button>
      </form>
    </div>
  );
}