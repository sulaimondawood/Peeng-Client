import { MonitorResponse } from "@/src/types/dashboard";
import { MonitorStats } from "@/src/types/monitor";


interface MonitorMetricCardsProps {
    stats: MonitorStats;
    monitor: MonitorResponse;
}

export function MonitorMetricCards({ stats, monitor }: MonitorMetricCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono font-bold block">
                    Overall Availability
                </span>
                <span className="text-2xl font-bold font-mono text-emerald-400 block">
                    {stats.uptimePercentage}%
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">
                    {stats.successfulChecks} / {stats.totalChecks} successful checks
                </span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono font-bold block">
                    Average Response Speed
                </span>
                <span className="text-2xl font-bold font-mono text-white block">
                    {stats.averageResponseTime ? `${Math.round(stats.averageResponseTime)}ms` : '—'}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">
                    Min {stats.minResponseTime ? Math.round(stats.minResponseTime) : 0}ms · Max{' '}
                    {stats.maxResponseTime ? Math.round(stats.maxResponseTime) : 0}ms
                </span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono font-bold block">
                    Configured Interval
                </span>
                <span className="text-2xl font-bold font-mono text-white block">
                    Every {monitor.intervalInSeconds}s
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">
                    {monitor.timeoutInSeconds}s timeout ceiling
                </span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono font-bold block">
                    Active Incidents
                </span>
                <span className="text-2xl font-bold font-mono text-amber-400 block">
                    {stats.incidentCount}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">
                    {stats.failedChecks} failed checks recorded
                </span>
            </div>
        </div>
    );
}