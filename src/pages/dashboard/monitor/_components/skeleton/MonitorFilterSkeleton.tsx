
export function MonitorFilterSkeleton() {
    return (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between animate-pulse">
            <div className="h-9 flex-1 bg-slate-950 border border-slate-800 rounded-lg" />
            <div className="flex flex-wrap items-center gap-2">
                <div className="h-9 w-52 bg-slate-950 border border-slate-800 rounded-lg" />
                <div className="h-9 w-28 bg-slate-950 border border-slate-800 rounded-lg" />
            </div>
        </div>
    );
}