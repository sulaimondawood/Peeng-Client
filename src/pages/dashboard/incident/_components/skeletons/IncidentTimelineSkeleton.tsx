
interface IncidentTimelineSkeletonProps {
    count?: number;
}

export function IncidentTimelineSkeleton({ count = 3 }: IncidentTimelineSkeletonProps) {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Forensics Trace Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between border-b border-slate-800 pb-3">
                    <div className="h-4 w-48 bg-slate-800 rounded" />
                    <div className="h-3 w-24 bg-slate-800 rounded" />
                </div>
                <div className="space-y-4 pl-4">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl space-y-2">
                            <div className="flex justify-between">
                                <div className="h-3.5 w-40 bg-slate-800 rounded" />
                                <div className="h-3 w-24 bg-slate-800 rounded" />
                            </div>
                            <div className="h-3 w-3/4 bg-slate-800/60 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Post-Mortem RCA Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between border-b border-slate-800 pb-3">
                    <div className="h-4 w-56 bg-slate-800 rounded" />
                    <div className="h-5 w-24 bg-slate-800 rounded" />
                </div>
                <div className="h-24 bg-slate-950 border border-slate-800 rounded-xl" />
            </div>
        </div>
    );
}