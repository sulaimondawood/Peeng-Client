interface StatusBadgeProps {
    status: string;
    lifecycle: string;
}

export function StatusBadge({ status, lifecycle }: StatusBadgeProps) {
    if (lifecycle === 'PAUSED') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-amber-950/40 text-amber-400 border border-amber-900/50">
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                PAUSED
            </span>
        );
    }

    const isUp = status === 'UP';
    const isDown = status === 'DOWN';

    const colorStyle = isUp
        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
        : isDown
            ? 'bg-red-950/40 text-red-400 border-red-900/50'
            : 'bg-zinc-800 text-zinc-400 border-zinc-700/50';

    const dotStyle = isUp ? 'bg-emerald-400' : isDown ? 'bg-red-500' : 'bg-zinc-400';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border ${colorStyle}`}>
            <span className={`w-1 h-1 rounded-full ${dotStyle}`} />
            <span>{status}</span>
        </span>
    );
}