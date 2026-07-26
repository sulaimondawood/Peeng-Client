import { useAppState } from "@/src/context/StateContext";
import { GetMonitorsParams, monitorApi } from "@/src/lib/api/monitor";
import { CreateMonitorRequest } from "@/src/types/monitor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMonitors(params?: GetMonitorsParams) {
    return useQuery({
        queryKey: ["monitors", params],
        queryFn: () => monitorApi.getMonitors(params),
        placeholderData: (previousData) => previousData
    });
}

export function useMonitorDetails(monitorId: string) {
    return useQuery({
        queryKey: ["monitors", monitorId, "details"],
        queryFn: () => monitorApi.getMonitorDetails(monitorId),
        enabled: Boolean(monitorId),
    });
}

export function useMonitorStatistics(monitorId: string) {
    return useQuery({
        queryKey: ["monitors", monitorId, "statistics"],
        queryFn: () => monitorApi.getMonitorStatistics(monitorId),
        enabled: Boolean(monitorId),
    });
}

export function useMonitorResponseTimes(monitorId: string, range: string = "24h") {
    return useQuery({
        queryKey: ["monitors", monitorId, "response-times", range],
        queryFn: () => monitorApi.getMonitorResponseTimes(monitorId, range),
        enabled: Boolean(monitorId),
    });
}

export function useMonitorUptimeBlocks(monitorId: string, range: string = "24h") {
    return useQuery({
        queryKey: ["monitors", monitorId, "uptime-blocks", range],
        queryFn: () => monitorApi.getMonitorUptimeBlocks(monitorId, range),
        enabled: Boolean(monitorId),
    });
}

export function useMonitorChecks(monitorId: string, page: number = 0, size: number = 25) {
    return useQuery({
        queryKey: ["monitors", monitorId, "checks", page, size],
        queryFn: () => monitorApi.getMonitorChecks(monitorId, page, size),
        enabled: Boolean(monitorId),
    });
}

export function useMonitorRecentIncidents(monitorId: string) {
    return useQuery({
        queryKey: ["monitors", monitorId, "incidents"],
        queryFn: () => monitorApi.getMonitorRecentIncidents(monitorId),
        enabled: Boolean(monitorId),
    });
}

export function useToggleMonitor() {
    const queryClient = useQueryClient();
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: (monitorId: string) => monitorApi.toggleState(monitorId),

        onSuccess: (data) => {
            addToast(data.message || "Monitor updated", "success");
            queryClient.invalidateQueries({ queryKey: ["dashboard", "monitors", "recent"] });
            queryClient.invalidateQueries({ queryKey: ["monitors"] });
        },

        onError: (error: AxiosError<any>) => {
            const message =
                error.response?.data?.message || "Failed to toggle monitor";
            addToast(message, "error");
        },
    });
}

export function useDeleteMonitor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (monitorId: string) => monitorApi.deleteMonitor(monitorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["monitors"] });

        },
    });
}

export function useCreateMonitor() {
    const queryClient = useQueryClient();
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: (payload: CreateMonitorRequest) => monitorApi.createMonitor(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["monitors"] });
        },
        onError: (error: AxiosError<any>) => {
            const message =
                error.response?.data?.message || "Failed to toggle monitor";
            addToast(message, "error");
        },
    });
}