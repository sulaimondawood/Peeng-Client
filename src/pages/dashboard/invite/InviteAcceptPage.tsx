import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInvitation } from './hooks/useInvitation';
import { InvitationContextCard } from './_components/InvitationContextCard';
import { Terminal, ShieldAlert, KeyRound, ServerCrash } from 'lucide-react';

export default function InviteAcceptPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    isValid,
    loading,
    error,
    workspaceName,
    inviteeEmail,
    acceptInvitation,
  } = useInvitation(token);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Cyber ambient grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950 to-slate-950 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0"></div>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Simple Brand Emblem */}
        <div className="mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white font-mono shadow-md border border-indigo-500/30 text-sm">
            P
          </div>
          <span className="text-sm font-bold tracking-widest text-slate-200 font-mono uppercase">
            Peeng Core
          </span>
        </div>

        {/* Loading Decryption Loop */}
        {loading && (
          <div className="bg-slate-900 border border-slate-850 rounded-xl p-6.5 w-full space-y-4 shadow-2xl relative overflow-hidden font-mono text-[11px] text-indigo-400">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
            <div className="flex items-center gap-2 border-b border-slate-850 pb-3 text-slate-400">
              <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="font-semibold uppercase tracking-wider text-[9px]">Handshake Verification Protocol</span>
            </div>

            <div className="space-y-1.5 leading-relaxed text-slate-405">
              <p className="flex items-center gap-2">
                <span className="text-slate-600">❯</span> Initializing secured socket...
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-600">❯</span> Processing invite token signature check...
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-600">❯</span> Validating SHA-256 endpoint credentials...
              </p>
              <div className="flex items-center gap-1.5 pt-2 text-indigo-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Resolving remote registrar...</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-indigo-500 h-full w-2/3 animate-progress rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Invalid / Expired link error screen */}
        {!loading && (error || !isValid) && (
          <div className="bg-slate-900 border border-rose-900/40 rounded-xl p-6.5 w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-rose-950/20 border border-rose-900/30 rounded-full flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-200 font-sans tracking-tight">
                  Handshake Validation Refused
                </h3>
                <p className="text-xs text-slate-405 leading-relaxed">
                  {error || 'This invitation signature is invalid, corrupted, or has expired.'}
                </p>
              </div>

              {/* Troubleshooting details */}
              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-lg space-y-2 font-mono text-[10px] text-slate-400">
                <p className="text-rose-400 font-bold flex items-center gap-1">
                  <ServerCrash className="w-3.5 h-3.5" />
                  [Error Code: SIG_EXPIRED]
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Inbound token verification mismatch</li>
                  <li>Link surpassed 48h active lease limits</li>
                  <li>Authorization key invalidated manually</li>
                </ul>
              </div>

              <div className="border-t border-slate-850 pt-4 flex flex-col gap-2">
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full py-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Return to login
                </button>
                <p className="text-center text-[9px] text-slate-505">
                  Contact your workspace administrator to dispatch a new registration key.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Valid invitation workflow context card */}
        {!loading && isValid && workspaceName && inviteeEmail && (
          <InvitationContextCard
            workspaceName={workspaceName}
            inviteeEmail={inviteeEmail}
            onAccept={acceptInvitation}
          />
        )}
      </div>
    </div>
  );
}
export { InviteAcceptPage };
