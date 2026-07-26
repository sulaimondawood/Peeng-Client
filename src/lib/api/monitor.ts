
import { api } from "./config";
import { CreateMonitorRequest, IncidentResponse, MonitorCheck, MonitorStats, ResponseTimePoint, UptimeBlock } from "@/src/types/monitor";
import { MonitorResponse } from "@/src/types/dashboard";
import { ApiResponse } from "@/src/types/api-response";

export interface GetMonitorsParams {
    pageNo?: number;
    pageSize?: number;
    status?: string;
    keyword?: string;
}

export const monitorApi = {
    toggleState: async (monitorId: string) => {
        const { data } = await api.post<ApiResponse<null>>(
            `/monitors/${monitorId}/toggle`
        );
        return data;
    },

    createMonitor: async (payload: CreateMonitorRequest): Promise<void> => {
        await api.post<ApiResponse<null>>("/monitors", payload);
    },

    getMonitors: async (params?: GetMonitorsParams) => {
        const { data } = await api.get<ApiResponse<MonitorResponse[]>>("/monitors", {
            params,
        });
        return {
            items: data.data,
            meta: data.meta,
        };
    },

    getMonitorDetails: async (monitorId: string): Promise<MonitorResponse> => {
        const { data } = await api.get<ApiResponse<MonitorResponse>>(`/monitors/${monitorId}`);
        return data.data;
    },

    getMonitorStatistics: async (monitorId: string): Promise<MonitorStats> => {
        const { data } = await api.get<ApiResponse<MonitorStats>>(`/monitors/${monitorId}/statistics`);
        return data.data;
    },

    getMonitorResponseTimes: async (
        monitorId: string,
        range: string = "24h"
    ): Promise<ResponseTimePoint[]> => {
        const { data } = await api.get<ApiResponse<ResponseTimePoint[]>>(
            `/monitors/${monitorId}/response-times`,
            { params: { range } }
        );
        return data.data;
    },

    getMonitorUptimeBlocks: async (
        monitorId: string,
        range: string = "24h"
    ): Promise<UptimeBlock[]> => {
        const { data } = await api.get<ApiResponse<UptimeBlock[]>>(
            `/monitors/${monitorId}/uptime-block`,
            { params: { range } }
        );
        return data.data;
    },

    getMonitorChecks: async (monitorId: string, page: number = 0, size: number = 25) => {
        const { data } = await api.get<ApiResponse<MonitorCheck[]>>(
            `/monitors/${monitorId}/checks`,
            { params: { page, size } }
        );
        return {
            checks: data.data,
            meta: data.meta,
        };
    },

    getMonitorRecentIncidents: async (monitorId: string): Promise<IncidentResponse[]> => {
        const { data } = await api.get<ApiResponse<IncidentResponse[]>>(
            `/monitors/${monitorId}/recent-incidents`
        );
        return data.data;
    },



    deleteMonitor: async (monitorId: string): Promise<void> => {
        await api.delete<ApiResponse<null>>(`/monitors/${monitorId}`);
    },
};