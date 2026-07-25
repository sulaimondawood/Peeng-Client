import React from 'react';

interface InitialsAvatarProps {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  colorScheme?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
}

export function getInitials(name?: string, fallback = 'SD'): string {
  if (!name || !name.trim()) return fallback;
  const cleanName = name.trim();
  const parts = cleanName.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColorFromName(name?: string) {
  if (!name) return 'bg-indigo-600 text-white border-indigo-500/40';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    'bg-indigo-600 text-white border-indigo-500/40',
    'bg-emerald-600 text-white border-emerald-500/40',
    'bg-slate-800 text-slate-100 border-slate-700',
    'bg-amber-600 text-white border-amber-500/40',
    'bg-violet-600 text-white border-violet-500/40',
    'bg-rose-600 text-white border-rose-500/40',
  ];
  return colors[Math.abs(hash) % colors.length];
}

export default function InitialsAvatar({
  name,
  size = 'md',
  className = '',
  colorScheme,
}: InitialsAvatarProps) {
  const initials = getInitials(name);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7.5 h-7.5 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-12 h-12 text-base',
  };

  const schemeClass = colorScheme
    ? {
        indigo: 'bg-indigo-600 text-white border-indigo-500/40',
        emerald: 'bg-emerald-600 text-white border-emerald-500/40',
        amber: 'bg-amber-600 text-white border-amber-500/40',
        rose: 'bg-rose-600 text-white border-rose-500/40',
        slate: 'bg-slate-800 text-slate-100 border-slate-700',
      }[colorScheme]
    : getColorFromName(name);

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold font-mono border shadow-xs shrink-0 select-none ${sizeClasses[size]} ${schemeClass} ${className}`}
      title={`Profile: ${name || 'Operator'}`}
    >
      {initials}
    </div>
  );
}
