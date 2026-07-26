export function TeamHeaderSkeleton() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5 animate-pulse">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-zinc-900 rounded" />
                    <div className="w-44 h-6 bg-zinc-900 rounded" />
                </div>
                <div className="w-72 sm:w-96 h-3 bg-zinc-900 rounded" />
            </div>
        </div>
    );
}

export function TeamStatsSkeleton() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-4"
                >
                    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800/80 rounded-lg shrink-0" />
                    <div className="space-y-2 min-w-0 flex-1">
                        <div className="w-20 h-3 bg-zinc-900 rounded" />
                        <div className="w-10 h-5 bg-zinc-900 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function OperatorRosterTableSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-xl animate-pulse">
            <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
                <div className="space-y-1.5">
                    <div className="w-28 h-4 bg-zinc-900 rounded" />
                    <div className="w-48 h-3 bg-zinc-900 rounded" />
                </div>
                <div className="w-20 h-5 bg-zinc-900 rounded" />
            </div>

            {/* Desktop Skeleton View */}
            <div className="hidden md:block">
                <div className="border-b border-zinc-800 bg-zinc-900/30 p-4 grid grid-cols-4 gap-4">
                    <div className="w-24 h-3 bg-zinc-900 rounded" />
                    <div className="w-16 h-3 bg-zinc-900 rounded" />
                    <div className="w-16 h-3 bg-zinc-900 rounded" />
                    <div className="w-16 h-3 bg-zinc-900 rounded justify-self-end" />
                </div>
                <div className="divide-y divide-zinc-900">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="p-4 grid grid-cols-4 gap-4 items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 shrink-0" />
                                <div className="space-y-1.5 min-w-0">
                                    <div className="w-28 h-3.5 bg-zinc-900 rounded" />
                                    <div className="w-36 h-3 bg-zinc-900 rounded" />
                                </div>
                            </div>
                            <div className="w-20 h-6 bg-zinc-900 rounded-lg" />
                            <div className="w-16 h-5 bg-zinc-900 rounded-full" />
                            <div className="w-8 h-8 bg-zinc-900 rounded justify-self-end" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Skeleton View */}
            <div className="block md:hidden divide-y divide-zinc-900 p-4 space-y-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="pt-3 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 shrink-0" />
                                <div className="space-y-1">
                                    <div className="w-24 h-3 bg-zinc-900 rounded" />
                                    <div className="w-32 h-2.5 bg-zinc-900 rounded" />
                                </div>
                            </div>
                            <div className="w-14 h-5 bg-zinc-900 rounded-full" />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <div className="w-24 h-6 bg-zinc-900 rounded" />
                            <div className="w-8 h-8 bg-zinc-900 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function InviteOperatorFormSkeleton() {
    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4 animate-pulse">
            <div className="space-y-1.5">
                <div className="w-32 h-4 bg-zinc-900 rounded" />
                <div className="w-full h-3 bg-zinc-900 rounded" />
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="w-20 h-3 bg-zinc-900 rounded" />
                    <div className="w-full h-9 bg-zinc-900 rounded-lg" />
                </div>

                <div className="space-y-2">
                    <div className="w-12 h-3 bg-zinc-900 rounded" />
                    <div className="w-full h-9 bg-zinc-900 rounded-lg" />
                    <div className="w-full h-12 bg-zinc-900/60 rounded-lg" />
                </div>

                <div className="w-full h-9 bg-zinc-900 rounded-lg pt-2" />
            </div>
        </div>
    );
}

export function TeamDashboardSkeleton() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none">
            <TeamHeaderSkeleton />
            <TeamStatsSkeleton />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <OperatorRosterTableSkeleton count={5} />
                </div>
                <div className="space-y-4">
                    <InviteOperatorFormSkeleton />
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2 h-24 animate-pulse" />
                </div>
            </div>
        </div>
    );
}