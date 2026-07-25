
interface ActiveOutagesSkeletonProps {

    count?: number;
}

export function ActiveOutagesSkeleton({ count = 2 }: ActiveOutagesSkeletonProps) {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="px-1 flex items-center justify-between">
                <div className="h-3.5 w-36 bg-slate-800 rounded" />
                <div className="h-4 w-16 bg-slate-800 rounded-full" />
            </div>

            <div className="space-y-3">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-800 shrink-0" />
                                    <div className="h-3 w-32 bg-slate-800 rounded" />
                                </div>
                                <div className="h-4 w-3/4 bg-slate-800 rounded" />
                                <div className="h-3 w-40 bg-slate-800/60 rounded" />
                            </div>

                            <div className="h-6 w-20 bg-slate-800 rounded" />
                        </div>

                        <div className="border-t border-slate-800/80 pt-3.5 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="h-4 w-24 bg-slate-800 rounded" />
                                <div className="h-4 w-24 bg-slate-800 rounded" />
                            </div>
                            <div className="h-3 w-28 bg-slate-800 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}