
export function IncidentSidebarSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Live Probe Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="h-4 w-32 bg-slate-800 rounded" />
                <div className="h-32 bg-slate-950 border border-slate-800 rounded-xl" />
                <div className="h-9 bg-slate-950 border border-slate-800 rounded-xl" />
            </div>

            {/* Operator Console */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="h-4 w-36 bg-slate-800 rounded" />
                <div className="h-8 bg-slate-950 border border-slate-800 rounded-lg" />
            </div>

            {/* Escalation Integrations */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="h-4 w-40 bg-slate-800 rounded" />
                <div className="h-16 bg-slate-950 border border-slate-800 rounded-lg" />
            </div>
        </div>
    );
}