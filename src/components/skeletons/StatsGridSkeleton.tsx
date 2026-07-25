
interface StatsGridSkeletonProps {
    count?: number;
    columnsClass?: string;
}

export function StatsGridSkeleton({
    count = 4,
    columnsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
}: StatsGridSkeletonProps) {
    return (
        <div className={`grid ${columnsClass} gap-4 animate-pulse`}>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-col justify-between h-24"
                >
                    <div className="h-3 w-24 bg-slate-800 rounded" />
                    <div className="h-7 w-20 bg-slate-800 rounded mt-2" />
                </div>
            ))}
        </div>
    );
}