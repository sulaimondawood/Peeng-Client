import React from 'react';

export function SettingsProfileSkeleton() {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-6 animate-pulse">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="h-4 w-48 bg-slate-800 rounded" />
                <div className="h-6 w-28 bg-slate-800 rounded-full" />
            </div>

            {/* Avatar & Profile summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-slate-800 shrink-0" />
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-slate-800 rounded" />
                        <div className="h-3 w-40 bg-slate-800/60 rounded" />
                    </div>
                </div>
                <div className="h-8 w-48 bg-slate-800 rounded-lg" />
            </div>

            {/* Password form skeleton */}
            <div className="space-y-4 pt-1">
                <div className="h-4 w-40 bg-slate-800 rounded" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="h-9 bg-slate-950 border border-slate-800 rounded-lg" />
                    <div className="h-9 bg-slate-950 border border-slate-800 rounded-lg" />
                    <div className="h-9 bg-slate-950 border border-slate-800 rounded-lg" />
                </div>
            </div>
        </div>
    );
}