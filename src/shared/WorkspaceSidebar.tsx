
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useAppState } from "../context/StateContext";
import { getLastTenantId } from "../lib/api/auth-storage";
import { useLogout } from "../pages/auth/hooks/use-auth";
import { MembershipSession } from "../types/auth";
import { PATHS } from "../utils/routes/paths";
import { SidebarNav } from "./dashboard/SidebarNav";
import { UserProfileFooter } from "./dashboard/UserProfileFooter";
import { WorkspaceSwitcher } from "./dashboard/WorkspaceSwitcher";

export default function WorkspaceSidebar() {
  const [isSwitching, setIsSwitching] = useState(false);

  const navigate = useNavigate();
  const { addToast, sidebarCollapsed, setSidebarCollapsed, sidebarMobileOpen, setSidebarMobileOpen } = useAppState();

  const { user, memberships, activeTenantId, switchWorkspace } = useAuth();
  const logout = useLogout();


  const currentMembership = useMemo(() => {
    if (!memberships || memberships.length === 0) return null;


    if (activeTenantId) {
      const found = memberships.find((m) => m.tenantId === activeTenantId);
      if (found) return found;
    }

    //Fallback to storage key before state hydration completes
    const storedTenantId = getLastTenantId();
    if (storedTenantId) {
      const foundStored = memberships.find((m) => m.tenantId === storedTenantId);
      if (foundStored) return foundStored;
    }

    return memberships[0];
  }, [memberships, activeTenantId]);


  const handleSelectWorkspace = async (membership: MembershipSession) => {
    setIsSwitching(true);

    try {
      await switchWorkspace(membership.tenantId);
      navigate(PATHS.DASHBOARD.ROOT);
      addToast(`Switched to workspace: ${membership.workspaceName}`, "success");
    } catch (err: any) {
      addToast(err?.response?.data?.message || "Failed to switch workspace", "error");
    } finally {
      setIsSwitching(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-30 md:hidden transition-opacity"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      <div className="hidden md:block relative">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-5 top-5 size-8 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-transform hover:scale-110 z-50 cursor-pointer"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      <aside
        className={`border-r bg-zinc-950 border-zinc-900 text-zinc-300 flex flex-col h-screen shrink-0 font-sans select-none transition-all duration-200 z-40
        ${sidebarCollapsed ? "w-[68px]" : "w-64"}
        fixed md:relative inset-y-0 left-0 transform md:translate-x-0
        ${sidebarMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <WorkspaceSwitcher
          collapsed={sidebarCollapsed}
          currentMembership={currentMembership}
          memberships={memberships}
          onSelectWorkspace={handleSelectWorkspace}
          onLogout={handleLogout}
        />

        <SidebarNav collapsed={sidebarCollapsed} onNavigateMobile={() => setSidebarMobileOpen(false)} />

        <UserProfileFooter collapsed={sidebarCollapsed} user={user} onLogout={handleLogout} />
      </aside>

      {isSwitching && (
        <div className="fixed inset-0 bg-slate-950/90 z-[90] flex flex-col items-center justify-center font-sans">
          <div className="flex flex-col items-center gap-4 text-center">
            <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
            <div className="space-y-1">
              <h3 className="font-semibold text-xs text-slate-100 tracking-tight font-display">Syncing Cluster Records</h3>
              <p className="text-xxxxs text-slate-500 font-mono uppercase tracking-wider">Establishing tunnel to regional endpoints...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}