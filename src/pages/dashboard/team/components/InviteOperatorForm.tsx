import React, { useState } from 'react';
import { Mail, Shield, UserPlus, AlertCircle, HelpCircle } from 'lucide-react';
import { Role } from '../../../types';

interface InviteOperatorFormProps {
  id?: string;
  onInvite: (email: string, role: Role) => void;
  isSubmitting?: boolean;
}

export function InviteOperatorForm({ 
  id = 'invite-operator-form',
  onInvite, 
  isSubmitting = false 
}: InviteOperatorFormProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('member');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address format.');
      return;
    }

    onInvite(trimmedEmail, role);
    setEmail('');
    setRole('member');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5.5 shadow-xl space-y-4" id={id}>
      <div className="space-y-1">
        <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
          Invite Team Member
        </h3>
        <p className="text-[10px] text-slate-400">
          Send an email invitation to add a team member to this workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-950/40 border border-rose-900 p-2.5 rounded-lg text-rose-300 text-xs flex items-start gap-1.5 leading-relaxed">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Email Address</span>
            <Mail className="w-3.5 h-3.5 text-slate-500" />
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-100 outline-hidden font-mono focus:ring-1 focus:ring-indigo-500 transition-all"
            placeholder="colleague@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            id={`${id}-email-input`}
          />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Role</span>
            <Shield className="w-3.5 h-3.5 text-slate-500" />
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-200 outline-hidden cursor-pointer focus:ring-1 focus:ring-indigo-500 transition-all"
            disabled={isSubmitting}
            id={`${id}-role-select`}
          >
            <option value="admin">Administrator (Full Access)</option>
            <option value="member">Member (Standard Access)</option>
            <option value="viewer">Viewer (Read-Only)</option>
          </select>
          
          {/* Helper Descriptions */}
          <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 flex gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {role === 'admin' && 'Can edit monitors, manage settings, invite members, and configure workspace settings.'}
              {role === 'member' && 'Can manage monitors, acknowledge incidents, and edit status pages.'}
              {role === 'viewer' && 'Read-only access to monitors, status pages, and incident logs.'}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
          id={`${id}-submit-btn`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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
