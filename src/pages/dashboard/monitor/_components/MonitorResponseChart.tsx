import { UptimeBlock } from '@/src/types/monitor';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export interface ChartPoint {
    time: string;
    latency: number;
    status: string;
    code: number;
}

export type TimeRange = '1h' | '24h' | '7d' | '30d';

interface MonitorResponseChartProps {
    data: ChartPoint[];
    uptimeBlocks: UptimeBlock[];
    isUptimeBlocksLoading: boolean;
    range: TimeRange;
    onRangeChange: (range: TimeRange) => void;
    maxBlocks?: number;
}

export function MonitorResponseChart({
    data,
    uptimeBlocks,
    isUptimeBlocksLoading,
    range,
    onRangeChange,
    maxBlocks = 45,
}: MonitorResponseChartProps) {


    const normalizedBlocks = useMemo(() => {
        const rawBlocks = uptimeBlocks.length > 0
            ? uptimeBlocks.map((b) => ({
                timestamp: b.timestamp,
                uptimePercentage: b.uptimePercentage,
                latency: b.responseTimeMs ? Math.round(b.responseTimeMs) : null,
                isEmpty: false,
            }))
            : data.map((d) => ({
                timestamp: d.time,
                uptimePercentage: d.status === 'UP' ? 100 : 0,
                latency: d.latency,
                isEmpty: false,
            }));

        if (rawBlocks.length === 0) {
            return Array.from({ length: maxBlocks }, () => ({
                timestamp: null,
                uptimePercentage: 0,
                latency: null,
                isEmpty: true,
            }));
        }


        const recent = rawBlocks.slice(-maxBlocks);


        if (recent.length < maxBlocks) {
            const paddingCount = maxBlocks - recent.length;
            const padding = Array.from({ length: paddingCount }, () => ({
                timestamp: null,
                uptimePercentage: 0,
                latency: null,
                isEmpty: true,
            }));
            return [...padding, ...recent];
        }

        return recent;
    }, [uptimeBlocks, data, maxBlocks]);

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 font-sans">
            {/* Header Controls */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                        Response Time History
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        Average latency aggregation window ({range})
                    </p>
                </div>

                <div className="flex items-center gap-1 bg-zinc-900 p-1 border border-zinc-800 rounded-lg">
                    {(['1h', '24h', '7d', '30d'] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => onRangeChange(r)}
                            className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded transition-colors cursor-pointer ${range === r ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Latency Area Chart */}
            {data.length > 0 ? (
                <div className="h-64 sm:h-72 w-full font-mono text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="time" stroke="#71717a" style={{ fontSize: '10px' }} />
                            <YAxis stroke="#71717a" style={{ fontSize: '10px' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#09090b',
                                    borderColor: '#27272a',
                                    borderRadius: '8px',
                                    fontSize: '11px',
                                }}
                                labelStyle={{ color: '#a1a1aa' }}
                                itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="latency"
                                name="Avg Latency (ms)"
                                stroke="#818cf8"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorLatency)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-48 flex items-center justify-center border border-dashed border-zinc-800 rounded-lg text-xs text-zinc-500 font-mono">
                    No response metrics recorded in this window.
                </div>
            )}

            {/* Fixed Uptime Blocks Strip */}
            <div className="border-t border-zinc-800 pt-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Uptime History Blocks ({maxBlocks} slots)</span>
                    <span>{range} window</span>
                </div>

                {isUptimeBlocksLoading ? (
                    <div className="h-6 bg-zinc-900 animate-pulse rounded" />
                ) : (
                    <div className="flex gap-1 items-center w-full py-1 overflow-x-auto">
                        {normalizedBlocks.map((block, idx) => {
                            if (block.isEmpty) {
                                return (
                                    <div
                                        key={idx}
                                        title="No data for interval"
                                        className="h-6 flex-1 rounded-xs bg-zinc-900 border border-zinc-800/50"
                                    />
                                );
                            }

                            const isHealthy = block.uptimePercentage >= 99;
                            const isDegraded = block.uptimePercentage > 0 && block.uptimePercentage < 99;

                            const bgClass = isHealthy
                                ? 'bg-emerald-500'
                                : isDegraded
                                    ? 'bg-amber-500'
                                    : 'bg-red-500';

                            const tooltipText = block.timestamp
                                ? `${new Date(block.timestamp).toLocaleString()} — ${block.uptimePercentage}% Uptime ${block.latency !== null ? `(${block.latency}ms)` : ''
                                }`
                                : `${block.uptimePercentage}% Uptime`;

                            return (
                                <div
                                    key={idx}
                                    title={tooltipText}
                                    className={`h-6 flex-1 rounded-xs transition-opacity hover:opacity-80 cursor-pointer ${bgClass}`}
                                />
                            );
                        })}
                    </div>
                )}

                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    <span>Oldest</span>
                    <span>Latest Check</span>
                </div>
            </div>
        </div>
    );
}