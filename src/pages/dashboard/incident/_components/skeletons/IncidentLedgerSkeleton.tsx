
interface IncidentLedgerSkeletonProps {
    count?: number;
    viewMode?: 'table' | 'list';
    isExpanded?: boolean;
}

export function IncidentLedgerSkeleton({
    count = 5,
    viewMode = 'table',
    isExpanded = false
}: IncidentLedgerSkeletonProps) {
    return (
        <div className="space-y-4 animate-pulse">
            {/* Ledger Top Bar */}
            <div className="px-1 flex items-center justify-between border-b border-slate-900 pb-2">
                <div className="space-y-1">
                    <div className="h-3.5 w-36 bg-slate-800 rounded" />
                    <div className="h-2.5 w-28 bg-slate-800/60 rounded" />
                </div>
                <div className="flex gap-2">
                    <div className="h-7 w-16 bg-slate-800 rounded" />
                    <div className="h-7 w-16 bg-slate-800 rounded" />
                    <div className="h-7 w-8 bg-slate-800 rounded" />
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="space-y-3">
                    {Array.from({ length: count }).map((_, i) => (
                        <div
                            key={i}
                            className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-20 bg-slate-800 rounded-full" />
                                <div className="h-3 w-16 bg-slate-800/60 rounded" />
                            </div>
                            <div className="h-4 w-3/4 bg-slate-800 rounded" />
                            <div className="border-t border-slate-800 pt-2 flex justify-between">
                                <div className="h-3 w-28 bg-slate-800/60 rounded" />
                                <div className="h-3 w-12 bg-slate-800 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="p-3 border-b border-slate-800 bg-slate-950/40 flex justify-between">
                        <div className="h-3 w-24 bg-slate-800 rounded" />
                        <div className="h-3 w-20 bg-slate-800 rounded" />
                        <div className="h-3 w-16 bg-slate-800 rounded" />
                        <div className="h-3 w-12 bg-slate-800 rounded" />
                    </div>

                    <div className="divide-y divide-slate-800/50">
                        {Array.from({ length: count }).map((_, i) => (
                            <div key={i} className="p-3.5 flex items-center justify-between gap-4">
                                <div className="space-y-1 flex-1">
                                    <div className="h-3.5 w-40 bg-slate-800 rounded" />
                                    <div className="h-2.5 w-24 bg-slate-800/60 rounded" />
                                </div>
                                <div className="h-4 w-12 bg-slate-800 rounded-full" />
                                <div className="h-4 w-10 bg-slate-800 rounded" />
                                <div className="h-3 w-12 bg-slate-800 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}