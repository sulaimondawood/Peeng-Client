
import { dashboardApi } from "@/src/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useDashboardOverview() {
    return useQuery({
        queryKey: ["dashboard", "overview"],
        queryFn: dashboardApi.getOverview,
    });
}

export function useRecentMonitors() {
    return useQuery({
        queryKey: ["dashboard", "monitors", "recent"],
        queryFn: dashboardApi.getRecentMonitors,
    });
}

export function useRecentIncidents() {
    return useQuery({
        queryKey: ["dashboard", "incidents", "recent"],
        queryFn: dashboardApi.getRecentIncidents,
    });
}