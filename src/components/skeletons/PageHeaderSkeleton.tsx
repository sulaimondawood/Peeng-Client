
export function PageHeaderSkeleton() {
    return (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pulse">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-40 bg-slate-800 rounded" />
                    <div className="h-5 w-28 bg-slate-800/80 rounded" />
                </div>
                <div className="h-3.5 w-64 bg-slate-800/50 rounded" />
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <div className="h-7 w-20 bg-slate-800 rounded" />
                <div className="h-7 w-28 bg-slate-800 rounded" />
            </div>
        </div>
    );
}