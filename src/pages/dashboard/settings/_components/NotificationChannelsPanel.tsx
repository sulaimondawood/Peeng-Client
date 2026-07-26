import { useState } from 'react';
import { BellRing, Mail, MessageSquare, PhoneCall, Radio, Send } from 'lucide-react';

interface NotificationChannelsPanelProps {
    userEmail?: string;
}

export function NotificationChannelsPanel({ userEmail = '' }: NotificationChannelsPanelProps) {
    const [emailEnabled, setEmailEnabled] = useState(true);

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 text-zinc-100">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-indigo-400" /> Webhook & Escalation Channels
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono font-medium flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-emerald-400" /> Email Active
                </span>
            </div>

            <div className="p-3.5 bg-indigo-950/30 border border-indigo-900/40 rounded-xl flex items-start gap-3">
                <Radio className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                    <div className="font-semibold text-indigo-200 font-sans">
                        Active Channel: Corporate Email Dispatch
                    </div>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                        Incident alerts and downtime warnings are currently sent to{' '}
                        <span className="text-indigo-300 font-semibold">{userEmail || 'registered user email'}</span>.
                    </p>
                </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-zinc-300">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
                            <Mail className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-xs font-sans">Corporate Email Transmitters</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[9px] font-mono uppercase tracking-wider font-bold">
                                    Active
                                </span>
                            </div>
                            <span className="text-xs text-zinc-400 block font-mono">
                                Delivers outage, latency, and recovery alerts to {userEmail}
                            </span>
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        checked={emailEnabled}
                        disabled
                        onChange={(e) => setEmailEnabled(e.target.checked)}
                        className="w-4 h-4 accent-indigo-500 rounded bg-zinc-950 cursor-pointer"
                    />
                </div>

                {/* Slack (Preview) */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/50 border border-zinc-800 opacity-60">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                            <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-zinc-300 text-xs font-sans">
                                    Slack Telemetry Webhooks
                                </span>
                                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-[9px] font-mono uppercase tracking-wider font-semibold">
                                    Next Rollout
                                </span>
                            </div>
                            <span className="text-xs text-zinc-500 block font-mono">
                                Instant JSON payload notifications targeting #ops-alerts channel
                            </span>
                        </div>
                    </div>
                </div>

                {/* PagerDuty (Preview) */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/50 border border-zinc-800 opacity-60">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                            <PhoneCall className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-zinc-300 text-xs font-sans">
                                    PagerDuty On-call Rotation
                                </span>
                                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-[9px] font-mono uppercase tracking-wider font-semibold">
                                    Next Rollout
                                </span>
                            </div>
                            <span className="text-xs text-zinc-500 block font-mono">
                                Urgent sirens and automated engineer escalation pages
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-end">
                <button
                    disabled
                    type="button"
                    className="disabled:cursor-not-allowed disabled:opacity-60 flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs uppercase tracking-wider font-semibold transition-all"
                >
                    <Send className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Send Test Notification</span>
                </button>
            </div>
        </div>
    );
}