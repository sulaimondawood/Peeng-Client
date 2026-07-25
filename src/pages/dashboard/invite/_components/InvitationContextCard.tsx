import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, KeyRound } from 'lucide-react';

interface InvitationContextCardProps {
  id?: string;
  workspaceName: string;
  inviteeEmail: string;
  onAccept: (password: string) => Promise<boolean>;
}

export function InvitationContextCard({ 
  id = 'invitation-card',
  workspaceName, 
  inviteeEmail, 
  onAccept 
}: InvitationContextCardProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password.length < 8) {
      setLocalError('Password must contain at least 8 characters for security compliance.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match. Please verify credentials matching.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await onAccept(password);
      if (res) {
        setSuccess(true);
      }
    } catch (err: any) {
      setLocalError(err?.message || 'Enrollment transaction aborted by SMTP routing check.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div 
        className="bg-slate-900 border border-emerald-900/40 rounded-xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden transition-all duration-300"
        id={`${id}-success`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
        <div className="text-center space-y-5">
          <div className="w-14 h-14 bg-emerald-950/40 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold font-sans text-slate-100 tracking-tight">Access Granted</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your operator credentials for <span className="text-indigo-400 font-semibold">{workspaceName}</span> are validated and synced.
            </p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-lg text-left space-y-2 font-mono text-[10px] text-slate-400">
            <p className="text-emerald-400 font-bold">[Status]: ACTIVE OPERATOR</p>
            <p>Identity: {inviteeEmail}</p>
            <p>Node Keys: Dispatched & Verified</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-550 border border-indigo-500/30 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            id={`${id}-success-btn`}
          >
            Enter Operator Console <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-xl p-6.5 max-w-md w-full shadow-2xl relative overflow-hidden" id={id}>
      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
      
      <div className="mb-6 space-y-2">
        <div className="inline-block px-2.5 py-0.5 bg-indigo-950/50 border border-indigo-900/40 text-indigo-400 text-[9px] font-mono font-bold rounded-full uppercase tracking-widest">
          Secured Invitation Verified
        </div>
        <h2 className="text-lg font-bold font-sans text-slate-100 leading-tight">
          Join <span className="text-indigo-400 font-extrabold">{workspaceName}</span>
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Configure secure operator credentials to activate access. Your role authority has been assigned by the workspace administrator.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {localError && (
          <div className="p-3 bg-rose-955/20 border border-rose-900/30 rounded-lg text-rose-400 text-[10px] font-mono leading-relaxed">
            <span className="font-bold">[Error]:</span> {localError}
          </div>
        )}

        {/* Email - locked strictly read-only */}
        <div>
          <label className="block text-xxxxs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1.5 flex items-center justify-between">
            <span>Operator Identity (Locked)</span>
            <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Secure Link
            </span>
          </label>
          <div className="relative">
            <input
              type="email"
              readOnly
              value={inviteeEmail}
              className="w-full pl-9.5 pr-3 py-2 text-xs bg-slate-950 border border-slate-850 rounded-lg text-slate-450 cursor-not-allowed font-mono outline-none"
              title="This address is locked to prevent identity hijacking."
              id={`${id}-email-readonly`}
            />
            <Mail className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-650" />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xxxxs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
            Configure Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9.5 pr-10 py-2 text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-100 outline-none font-mono"
              id={`${id}-password-input`}
            />
            <KeyRound className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-650" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400 focus:outline-none cursor-pointer"
              id={`${id}-toggle-visible-btn`}
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xxxxs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
            Re-enter Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-9.5 pr-10 py-2 text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-slate-100 outline-none font-mono"
              id={`${id}-confirm-password-input`}
            />
            <Lock className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-650" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-550 border border-indigo-500/20 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
          id={`${id}-submit-btn`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Encrypting Credentials...
            </span>
          ) : (
            <>
              Accept Invite & Create Account
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
