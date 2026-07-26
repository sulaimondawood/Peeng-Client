
interface ListTableSkeletonProps {
    count?: number;
    showHeader?: boolean;
}

export function ListTableSkeleton({
    count = 4,
    showHeader = true
}: ListTableSkeletonProps) {
    return (
        <div className="space-y-3 animate-pulse">
            {showHeader && (
                <div className="flex items-center justify-between">
                    <div className="h-4 w-32 bg-slate-800 rounded" />
                    <div className="h-3.5 w-28 bg-slate-800 rounded" />
                </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-lg divide-y divide-slate-800">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 shrink-0" />
                            <div className="space-y-1.5 flex-1 max-w-sm">
                                <div className="h-3.5 bg-slate-800 rounded w-1/3" />
                                <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="h-4 w-12 bg-slate-800 rounded hidden sm:block" />
                            <div className="h-4 w-10 bg-slate-800 rounded hidden sm:block" />
                            <div className="h-7 w-16 bg-slate-800 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}