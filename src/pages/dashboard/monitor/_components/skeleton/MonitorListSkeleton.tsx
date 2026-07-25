
interface MonitorListSkeletonProps {
    count?: number;
}

export function MonitorListSkeleton({ count = 5 }: MonitorListSkeletonProps) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-2xl animate-pulse">
            <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex justify-between gap-4">
                <div className="h-3.5 w-28 bg-slate-800 rounded" />
                <div className="h-3.5 w-40 bg-slate-800 rounded" />
                <div className="h-3.5 w-16 bg-slate-800 rounded" />
                <div className="h-3.5 w-20 bg-slate-800 rounded" />
                <div className="h-3.5 w-20 bg-slate-800 rounded" />
                <div className="h-3.5 w-20 bg-slate-800 rounded" />
                <div className="h-3.5 w-24 bg-slate-800 rounded" />
            </div>

            <div className="divide-y divide-slate-800/60">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="p-4 flex items-center justify-between gap-4">
                        <div className="h-4 w-32 bg-slate-800 rounded" />
                        <div className="h-3 w-48 bg-slate-800/60 rounded" />
                        <div className="h-5 w-14 bg-slate-800 rounded-full" />
                        <div className="h-3 w-16 bg-slate-800 rounded" />
                        <div className="h-4 w-20 bg-slate-800/60 rounded" />
                        <div className="h-3 w-12 bg-slate-800 rounded" />
                        <div className="flex gap-2">
                            <div className="h-6 w-12 bg-slate-800 rounded" />
                            <div className="h-6 w-6 bg-slate-800 rounded" />
                            <div className="h-6 w-6 bg-slate-800 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}