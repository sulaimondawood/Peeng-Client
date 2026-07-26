
import { ApiResponse } from "@/src/types/api-response";
import { api } from "./config";
import { DashboardOverview, IncidentResponse, MonitorResponse } from "@/src/types/dashboard";

export const dashboardApi = {
    getOverview: async () => {
        const { data } = await api.get<ApiResponse<DashboardOverview>>(
            "/dashboard/overview"
        );
        return data.data;
    },

    getRecentMonitors: async () => {
        const { data } = await api.get<ApiResponse<MonitorResponse[]>>(
            "/dashboard/monitors/recent"
        );
        return data.data;
    },

    getRecentIncidents: async () => {
        const { data } = await api.get<ApiResponse<IncidentResponse[]>>(
            "/dashboard/incidents/recent"
        );
        return data.data;
    },
};