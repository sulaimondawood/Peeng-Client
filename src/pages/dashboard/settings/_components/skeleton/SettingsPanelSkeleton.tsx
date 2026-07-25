
interface SettingsPanelSkeletonProps {
    fieldCount?: number;
}

export function SettingsPanelSkeleton({ fieldCount = 2 }: SettingsPanelSkeletonProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 animate-pulse">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="h-4 w-40 bg-slate-800 rounded" />
                <div className="h-5 w-24 bg-slate-800/80 rounded" />
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(fieldCount, 3)} gap-4 items-end`}>
                {Array.from({ length: fieldCount }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-3 w-28 bg-slate-800 rounded" />
                        <div className="h-9 w-full bg-slate-950 border border-slate-800 rounded-lg" />
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-2">
                <div className="h-8 w-28 bg-slate-800 rounded-lg" />
            </div>
        </div>
    );
}