
interface MonitorLogsSkeletonProps {
    count?: number;
}

export function MonitorLogsSkeleton({ count = 5 }: MonitorLogsSkeletonProps) {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="flex items-center justify-between px-1">
                <div className="h-4 w-44 bg-slate-800 rounded" />
                <div className="h-6 w-24 bg-slate-800 rounded-lg" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex justify-between">
                    <div className="h-3 w-28 bg-slate-800 rounded" />
                    <div className="h-3 w-24 bg-slate-800 rounded" />
                    <div className="h-3 w-16 bg-slate-800 rounded" />
                    <div className="h-3 w-20 bg-slate-800 rounded" />
                </div>

                <div className="divide-y divide-slate-800/50">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="p-3.5 flex items-center justify-between">
                            <div className="h-3 w-36 bg-slate-800/70 rounded" />
                            <div className="h-3.5 w-24 bg-slate-800 rounded" />
                            <div className="h-3 w-12 bg-slate-800/70 rounded" />
                            <div className="h-4 w-16 bg-slate-800 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}