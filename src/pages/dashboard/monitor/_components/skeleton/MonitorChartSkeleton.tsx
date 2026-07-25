
export function MonitorChartSkeleton() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                    <div className="h-4 w-52 bg-slate-800 rounded" />
                    <div className="h-3 w-40 bg-slate-800/60 rounded" />
                </div>
                <div className="h-5 w-36 bg-slate-800 rounded" />
            </div>

            {/* Chart Plot Area */}
            <div className="h-64 sm:h-72 w-full bg-slate-950/60 border border-slate-800/80 rounded-lg" />

            {/* Matrix Bar Skeleton */}
            <div className="border-t border-slate-800 pt-5 space-y-2">
                <div className="flex justify-between">
                    <div className="h-3 w-36 bg-slate-800 rounded" />
                    <div className="h-3 w-20 bg-slate-800 rounded" />
                </div>
                <div className="h-6 w-full bg-slate-800/60 rounded-sm" />
            </div>
        </div>
    );
}