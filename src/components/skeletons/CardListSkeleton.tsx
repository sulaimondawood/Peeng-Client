import React from 'react';

interface CardListSkeletonProps {
    count?: number;
    showHeader?: boolean;
}

export function CardListSkeleton({
    count = 3,
    showHeader = true
}: CardListSkeletonProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3 animate-pulse">
            {showHeader && (
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="h-4 w-28 bg-slate-800 rounded" />
                    <div className="h-3 w-16 bg-slate-800 rounded" />
                </div>
            )}

            <div className="space-y-2">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="p-3 rounded border border-slate-800 bg-slate-950/40 space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <div className="h-3 bg-slate-800 rounded w-20" />
                            <div className="h-3 bg-slate-800 rounded w-12" />
                        </div>
                        <div className="h-3.5 bg-slate-800 rounded w-3/4" />
                        <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                        <div className="flex justify-between items-center pt-1">
                            <div className="h-2.5 bg-slate-800/50 rounded w-16" />
                            <div className="h-2.5 bg-slate-800/50 rounded w-12" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}