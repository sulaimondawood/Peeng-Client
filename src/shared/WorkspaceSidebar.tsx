import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppState } from "../context/StateContext";
import { getLastTenantId, setLastTenantId } from "../lib/api/auth-storage";
import { useLogout } from "../pages/auth/hooks/use-auth";
import { MembershipSession } from "../types/auth";
import { SidebarNav } from "./dashboard/SidebarNav";
import { UserProfileFooter } from "./dashboard/UserProfileFooter";
import { WorkspaceSwitcher } from "./dashboard/WorkspaceSwitcher";

export default function WorkspaceSidebar() {
  const navigate = useNavigate();
  const {
    addToast,
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarMobileOpen,
    setSidebarMobileOpen,
  } = useAppState();

  const { user, memberships } = useAuth();
  const logout = useLogout();

  const currentMembership = useMemo(() => {
    if (memberships.length === 0) return null;

    const lastTenantId = getLastTenantId();
    if (lastTenantId) {
      const found = memberships.find((m) => m.tenantId === lastTenantId);
      if (found) return found;
    }

    return memberships[0];
  }, [memberships]);

  const handleSelectWorkspace = (membership: MembershipSession) => {
    setLastTenantId(membership.tenantId);
    addToast(`Switched to workspace: ${membership.workspaceName}`, "success");
    window.location.reload();
  };

  const handleCreateWorkspace = (name: string) => {
    // TODO: call your real create workspace mutation
    addToast(`Creating workspace '${name}'...`, "info");
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
          className="absolute -right-3 top-5 w-6 h-6 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-transform hover:scale-110 z-50 cursor-pointer"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
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
          onCreateWorkspace={handleCreateWorkspace}
          onLogout={handleLogout}
        />

        <SidebarNav
          collapsed={sidebarCollapsed}
          onNavigateMobile={() => setSidebarMobileOpen(false)}
        />

        <UserProfileFooter
          collapsed={sidebarCollapsed}
          user={user}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}