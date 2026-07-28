import StatusPagesFeature from "@/src/pages/status/StatusPagesFeature";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout";
import { MarketingLayout } from "../../layouts/MarketingLayout";
import { ProtectedRoutesLayout } from "../../layouts/ProtectedRoutesLayout";
import EmailVerification from "../../pages/auth/EmailVerification";
import ForgotPasswordPage from "../../pages/auth/ForgotPasswordPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import IncidentDetails from "../../pages/dashboard/incident/IncidentDetails";
import IncidentPage from "../../pages/dashboard/incident/IncidentPage";
import InviteAcceptPage from "../../pages/dashboard/invite/InviteAcceptPage";
import CreateMonitor from "../../pages/dashboard/monitor/CreateMonitor";
import MonitorDetails from "../../pages/dashboard/monitor/MonitorDetails";
import MonitorList from "../../pages/dashboard/monitor/MonitorList";
import SettingsPages from "../../pages/dashboard/settings/SettingsPages";
import TeamDashboardPage from "../../pages/dashboard/team/TeamDashboardPage";
import NoWorkspacePage from "../../pages/dashboard/workspace/NoWorkspacePage";
import FeaturesPage from "../../pages/public/FeaturesPage";
import LandingPage from "../../pages/public/LandingPage";
import { PATHS } from "./paths";
import ResetPasswordPage from "@/src/pages/auth/ResetPasswordPage";



export function AppRoutes() {
    return (
        <Routes>
            {/* Public / Marketing */}
            <Route element={<MarketingLayout />}>
                <Route index element={<LandingPage />} />
                <Route path={PATHS.PUBLIC.FEATURES} element={<FeaturesPage />} />
            </Route>

            {/* Auth */}
            <Route path="/auth/" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot" element={<ForgotPasswordPage />} />
                <Route path="reset" element={<ResetPasswordPage />} />
                <Route path="verify" element={<EmailVerification />} />
            </Route>

            {/* Standalone Workspace / Onboarding */}
            <Route path={PATHS.ONBOARDING.INVITE_ACCEPT} element={<InviteAcceptPage />} />
            <Route path={PATHS.ONBOARDING.NO_WORKSPACE} element={<NoWorkspacePage />} />

            {/* Protected Dashboard */}
            <Route path="/dashboard/" element={<ProtectedRoutesLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="monitors" element={<MonitorList />} />
                <Route path="monitors/create" element={<CreateMonitor />} />
                <Route path="monitors/:monitorId" element={<MonitorDetails />} />
                <Route path="incidents" element={<IncidentPage />} />
                <Route path="incidents/:incidentId" element={<IncidentDetails />} />
                <Route path="settings" element={<SettingsPages />} />
                <Route path="members" element={<TeamDashboardPage />} />
                <Route path="team" element={<TeamDashboardPage />} />
                <Route path="status-pages" element={<StatusPagesFeature />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to={PATHS.PUBLIC.HOME} replace />} />
        </Routes>
    );
}