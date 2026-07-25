
interface MonitorDetailsStatsSkeletonProps {
    count?: number;
}

export function MonitorDetailsStatsSkeleton({ count = 4 }: MonitorDetailsStatsSkeletonProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <div className="h-2.5 w-32 bg-slate-800 rounded" />
                    <div className="h-7 w-20 bg-slate-800 rounded" />
                    <div className="h-2 w-28 bg-slate-800/60 rounded" />
                </div>
            ))}
        </div>
    );
}