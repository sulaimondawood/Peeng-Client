
export function MonitorDetailsHeaderSkeleton() {
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-900 pb-5 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0" />
                <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                        <div className="h-6 w-48 bg-slate-800 rounded" />
                        <div className="h-5 w-16 bg-slate-800/80 rounded" />
                    </div>
                    <div className="h-3 w-64 bg-slate-800/60 rounded" />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-24 bg-slate-800 rounded-lg" />
                <div className="h-8 w-32 bg-slate-800 rounded-lg" />
                <div className="h-8 w-28 bg-slate-800 rounded-lg" />
                <div className="h-8 w-28 bg-slate-800 rounded-lg" />
            </div>
        </div>
    );
}