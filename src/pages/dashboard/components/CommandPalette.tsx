import React, { useState, useEffect } from 'react';
import { useAppState, AppRoute } from '../../../context/StateContext';
import { Search, Monitor as MonitorIcon, AlertTriangle, Users, CreditCard, Settings, FileText, BarChart3, Command, X } from 'lucide-react';

export default function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    monitors,
    setCurrentRoute,
    setSelectedMonitorId
  } = useAppState();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const filteredMonitors = query
    ? monitors.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.url.toLowerCase().includes(query.toLowerCase()))
    : monitors.slice(0, 4);

  const navigationItems = [
    { label: 'Go to Dashboard', route: 'dashboard' as AppRoute, icon: BarChart3 },
    { label: 'View All Monitors', route: 'monitors' as AppRoute, icon: MonitorIcon },
    { label: 'Incident Desk', route: 'incidents' as AppRoute, icon: AlertTriangle },
    { label: 'Team Members', route: 'members' as AppRoute, icon: Users },
    { label: 'Status Page Creator', route: 'status-pages' as AppRoute, icon: FileText },
    { label: 'Workspace Settings', route: 'settings' as AppRoute, icon: Settings },
  ].filter(item => !query || item.label.toLowerCase().includes(query.toLowerCase()));

  const handleNavigate = (route: AppRoute, monitorId: string | null = null) => {
    setCurrentRoute(route);
    if (monitorId) {
      setSelectedMonitorId(monitorId);
    } else {
      setSelectedMonitorId(null);
    }
    setQuery('');
    setCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 overflow-y-auto bg-black/70 font-sans">
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl bg-slate-900 border border-slate-800 shadow-2xl transition-all">
        {/* Search header container */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            className="w-full text-sm text-slate-200 placeholder-slate-500 bg-transparent border-0 outline-hidden focus:ring-0"
            placeholder="Search monitors, dashboards, or configurations (Press Esc to close)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Monitors category */}
          <div>
            <div className="px-3 py-1.5 text-xxs font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Monitors
            </div>
            {filteredMonitors.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-400 font-mono">No matching nodes found</div>
            ) : (
              <div className="mt-1 space-y-0.5">
                {filteredMonitors.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleNavigate('monitor-details', m.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-left rounded-lg hover:bg-slate-800/80 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2 max-w-[70%]">
                      <MonitorIcon className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-emerald-400 transition-colors" />
                      <span className="font-medium text-slate-200 class truncate">{m.name}</span>
                      <span className="text-xxs text-slate-500 font-mono truncate">{m.url}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'UP' ? 'bg-emerald-500' :
                        m.status === 'DOWN' ? 'bg-rose-500' :
                          m.status === 'PAUSED' ? 'bg-amber-500' : 'bg-slate-500'
                        }`} />
                      <span className="text-xxs font-mono text-slate-400 uppercase">{m.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation actions category */}
          <div>
            <div className="px-3 py-1.5 text-xxs font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Quick Actions / Navigation
            </div>
            <div className="mt-1 space-y-0.5">
              {navigationItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleNavigate(item.route)}
                    className="flex items-center justify-between w-full px-3 py-2 text-left rounded-lg hover:bg-slate-800/80 transition-all text-xs text-slate-300 hover:text-slate-150 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-xxs text-slate-500 font-mono flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Jump <Command className="w-3 h-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/60 bg-slate-950 text-xxs tracking-normal text-slate-500 font-mono">
          <span>Search using keywords or domains</span>
          <div className="flex items-center gap-1.5">
            <span>Use</span>
            <span className="px-1.5 py-0.5 rounded-sm bg-slate-800 text-slate-300">↑↓</span>
            <span>to navigate</span>
            <span className="ml-1.5 px-1.5 py-0.5 rounded-sm bg-slate-800 text-slate-300">Enter</span>
            <span>to select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
