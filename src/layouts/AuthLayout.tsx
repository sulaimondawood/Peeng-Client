import { Navigate, Outlet, useLocation } from "react-router-dom";
import MarketingHeader from "../shared/MarketingHeader";
import { useAuth } from "../context/AuthContext";
import { PATHS } from "../utils/routes/paths";


export function AuthLayout() {
    const location = useLocation();
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return null;
    }

    if (user || isAuthenticated) {
        const origin = PATHS.DASHBOARD.ROOT;
        return <Navigate to={origin} replace />;
    }

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
            <MarketingHeader />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}