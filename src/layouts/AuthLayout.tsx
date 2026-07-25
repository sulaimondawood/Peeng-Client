import { Outlet } from "react-router-dom";
import MarketingHeader from "../shared/MarketingHeader";


export function AuthLayout() {
    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
            <MarketingHeader />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}