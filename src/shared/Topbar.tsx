import { Bell, ChevronRight, Menu } from "lucide-react";
import { useAppState } from "../context/StateContext";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";
import { getLastTenantId } from "../lib/api/auth-storage";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const {
    sidebarMobileOpen,
    setSidebarMobileOpen,
  } = useAppState();
  const location = useLocation();
  const { memberships } = useAuth();

  const currentMembership = useMemo(() => {
    if (memberships.length === 0) return null;

    const lastTenantId = getLastTenantId();
    if (lastTenantId) {
      const found = memberships.find((m) => m.tenantId === lastTenantId);
      if (found) return found;
    }

    return memberships[0];
  }, [memberships]);

  const getBreadcrumbTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/dashboard")) return "Workspace Overview";
    if (path.startsWith("/monitors/create")) return "New HTTP Monitor";
    if (path.startsWith("/monitors/")) return "Monitor Diagnostics";
    if (path.startsWith("/monitors")) return "Monitors";
    if (path.startsWith("/incidents/")) return "Incident Investigation Trace";
    if (path.startsWith("/incidents")) return "Incident Hub";
    if (path.startsWith("/members")) return "Team Members";
    if (path.startsWith("/status-pages")) return "Public Status Pages";
    if (path.startsWith("/settings")) return "Settings";

    return "Peeng Core";
  };

  // const criticalIssuesCount = monitors.filter((m) => m.status === "DOWN").length;

  return (
    <header className="h-14 border-b bg-slate-950 border-slate-900 flex items-center justify-between px-4 md:px-6 shrink-0 font-sans z-10">
      <div className="flex items-center gap-3 text-xs text-slate-400 min-w-0">
        <button
          onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
          className="md:hidden p-1.5 -ml-1 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer shrink-0"
          title="Toggle navigation desk"
        >
          <Menu className="w-4 h-4" />
        </button>

        <span className="font-medium text-slate-350 truncate hidden sm:inline">
          {currentMembership?.workspaceName ?? "Workspace"}
        </span>

        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden sm:inline" />

        <span className="font-semibold text-slate-100 tracking-tight truncate">
          {getBreadcrumbTitle()}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            // onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {/* {criticalIssuesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
            )} */}
          </button>

          {/* {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-30 p-1 divide-y divide-slate-800/60 overflow-hidden text-xs">
              <div className="px-3 py-2.5 flex items-center justify-between bg-slate-950">
                <div className="font-semibold text-slate-200">Alert Center</div>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 font-mono text-xxs">
                  {criticalIssuesCount} Nodes Down
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto py-1">
                {alerts.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 font-mono text-xxs">
                    No warnings or incidents open
                  </div>
                ) : (
                  alerts.map((al) => (
                    <div key={al.id} className="p-3 hover:bg-slate-850 transition-colors">
                      <div className="flex items-start gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${al.severity === "critical"
                            ? "bg-rose-500"
                            : al.severity === "warning"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                            }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xxs text-slate-200 font-normal leading-relaxed break-words">
                            {al.message}
                          </p>
                          <span className="text-xxxxs text-slate-500 font-mono block mt-1">
                            {al.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 text-center bg-slate-950">
                <button
                  onClick={() => {
                    setCurrentRoute("incidents");
                    setNotificationOpen(false);
                  }}
                  className="w-full text-center text-slate-400 hover:text-slate-100 transition-colors py-1 text-xxs font-mono uppercase"
                >
                  Inspect Incident Desk
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </header>
  );
}

export { Topbar };