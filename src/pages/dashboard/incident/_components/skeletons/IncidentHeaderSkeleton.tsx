import React from 'react';

export function IncidentHeaderSkeleton() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0" />
                <div className="space-y-2">
                    <div className="h-3 w-48 bg-slate-800 rounded" />
                    <div className="h-6 w-80 bg-slate-800 rounded" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-8 w-28 bg-slate-800 rounded-lg" />
                <div className="h-8 w-32 bg-slate-800 rounded-lg" />
            </div>
        </div>
    );
}