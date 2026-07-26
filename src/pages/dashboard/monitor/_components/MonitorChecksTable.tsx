import { Meta } from '@/src/types/meta';
import { MonitorCheck } from '@/src/types/monitor';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface MonitorChecksTableProps {
    checks: MonitorCheck[];
    meta?: Meta;
    page: number;
    onPageChange: (newPage: number) => void;
}

export function MonitorChecksTable({
    checks,
    meta,
    page,
    onPageChange,
}: MonitorChecksTableProps) {
    return (
        <div className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900 font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                            <th className="py-2.5 px-4">Status</th>
                            <th className="py-2.5 px-4">Latency</th>
                            <th className="py-2.5 px-4">Checked At</th>
                            <th className="py-2.5 px-4">Message</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 font-mono text-xs">
                        {checks.map((check, idx) => (
                            <tr key={idx} className="hover:bg-zinc-900/50 transition-colors">
                                <td className="py-2.5 px-4">
                                    <span
                                        className={`font-bold ${check.successful ? 'text-emerald-400' : 'text-red-400'
                                            }`}
                                    >
                                        {check.statusCode ?? 'ERR'}
                                    </span>
                                </td>
                                <td className="py-2.5 px-4 text-zinc-300">{check.responseTimeMs}ms</td>
                                <td className="py-2.5 px-4 text-zinc-500">
                                    {new Date(check.checkedAt).toLocaleTimeString()} —{' '}
                                    {new Date(check.checkedAt).toLocaleDateString()}
                                </td>
                                <td className="py-2.5 px-4 text-zinc-400 truncate max-w-[200px]">
                                    {check.errorMessage || 'OK'}
                                </td>
                            </tr>
                        ))}
                        {checks.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-zinc-500 font-mono text-xs">
                                    No check execution logs available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono px-1">
                    <span>
                        Page {meta.pageNumber + 1} of {meta.totalPages} ({meta.totalElements} checks)
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 0}
                            onClick={() => onPageChange(page - 1)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" /> Prev
                        </button>
                        <button
                            disabled={meta.last}
                            onClick={() => onPageChange(page + 1)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                            Next <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}