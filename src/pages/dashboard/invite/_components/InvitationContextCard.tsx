import React, { useState } from 'react';
import { Building, Lock, User, ArrowRight, Loader2, Mail } from 'lucide-react';

interface InvitationContextCardProps {
  workspaceName: string;
  inviteeEmail: string;
  isAlreadyRegistered?: boolean;
  isSubmitting?: boolean;
  onAccept: (formData: { name?: string; password?: string }) => Promise<void> | void;
}

export function InvitationContextCard({
  workspaceName,
  inviteeEmail,
  isAlreadyRegistered = false,
  isSubmitting = false,
  onAccept,
}: InvitationContextCardProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAccept({
      name: name.trim() || undefined,
      password: isAlreadyRegistered ? undefined : password,
    });
  };


  const isSubmitDisabled =
    isSubmitting || (!isAlreadyRegistered && (!name.trim() || !password));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6.5 w-full shadow-2xl relative overflow-hidden space-y-6 text-zinc-100 font-sans">
      <div className="space-y-2 border-b border-zinc-800 pb-4">
        <p>Workspace Invitation</p>

        <h2 className="text-lg font-bold tracking-tight text-white">
          Join <span className="text-indigo-400">{workspaceName}</span>
        </h2>
        <p className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
          <Mail className="w-3.5 h-3.5 text-zinc-500" />
          <span>{inviteeEmail}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Input (Optional for existing users, required for new) */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono uppercase text-zinc-400 font-semibold">
            {isAlreadyRegistered ? 'Full Name (Optional Update)' : 'Full Name'}
          </label>
          <div className="relative">
            <input
              type="text"
              required={!isAlreadyRegistered}
              disabled={isSubmitting}
              className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors"
              placeholder={isAlreadyRegistered ? 'Keep existing name or update' : 'e.g. Dauda Sulaimon'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Password Input (Only shown for unregistered users) */}
        {!isAlreadyRegistered && (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-semibold">
              Create Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                disabled={isSubmitting}
                className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors font-mono"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>
                {isAlreadyRegistered ? 'Accepting Invite...' : 'Completing Account Setup...'}
              </span>
            </>
          ) : (
            <>
              <span>
                {isAlreadyRegistered ? 'Accept Invite & Join' : 'Complete Setup & Join'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}