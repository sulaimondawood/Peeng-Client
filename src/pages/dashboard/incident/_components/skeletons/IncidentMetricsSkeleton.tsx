import React from 'react';

export function IncidentMetricsSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2 pl-2 border-slate-800 first:border-none md:border-l">
                    <div className="h-2.5 w-24 bg-slate-800 rounded" />
                    <div className="h-5 w-32 bg-slate-800 rounded" />
                    <div className="h-2 w-20 bg-slate-800/60 rounded" />
                </div>
            ))}
        </div>
    );
}