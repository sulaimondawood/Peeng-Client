import { Navigate, Outlet } from "react-router-dom";
import CommandPalette from "../components/CommandPalette";

import { useAuth } from "../context/AuthContext";
import WorkspaceSidebar from "../shared/WorkspaceSidebar";
import Topbar from "../shared/Topbar";

export function ProtectedRoutesLayout() {


    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user && !user.emailVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    return (
        <div className="flex w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
            <WorkspaceSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto bg-slate-950 p-2 md:p-4">
                    <Outlet />
                </main>
            </div>
            <CommandPalette />
        </div>
    );
}
