export function IncidentHeaderSkeleton() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800" />
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-24 h-4 bg-zinc-900 rounded" />
                        <div className="w-16 h-4 bg-zinc-900 rounded" />
                    </div>
                    <div className="w-64 h-6 bg-zinc-900 rounded" />
                </div>
            </div>
            <div className="w-28 h-8 bg-zinc-900 rounded-lg" />
        </div>
    );
}

export function IncidentMetricsHudSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-zinc-950 border border-zinc-800 rounded-xl animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="w-20 h-3 bg-zinc-900 rounded" />
                    <div className="w-28 h-6 bg-zinc-900 rounded" />
                    <div className="w-16 h-3 bg-zinc-900 rounded" />
                </div>
            ))}
        </div>
    );
}

export function IncidentTimelineSkeleton() {
    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 space-y-6 animate-pulse">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="w-36 h-4 bg-zinc-900 rounded" />
                <div className="w-16 h-3 bg-zinc-900 rounded" />
            </div>
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg space-y-2">
                        <div className="flex justify-between">
                            <div className="w-32 h-4 bg-zinc-900 rounded" />
                            <div className="w-20 h-3 bg-zinc-900 rounded" />
                        </div>
                        <div className="w-full h-3 bg-zinc-900 rounded" />
                        <div className="w-2/3 h-3 bg-zinc-900 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function IncidentSidebarSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="w-32 h-4 bg-zinc-900 rounded" />
                <div className="w-full h-16 bg-zinc-900 rounded-lg" />
                <div className="w-full h-9 bg-zinc-900 rounded-lg" />
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="w-28 h-4 bg-zinc-900 rounded" />
                <div className="w-full h-9 bg-zinc-900 rounded-lg" />
            </div>
        </div>
    );
}