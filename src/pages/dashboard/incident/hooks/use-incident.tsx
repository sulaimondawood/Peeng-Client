
import { useAppState } from "@/src/context/StateContext";
import { incidentApi } from "@/src/lib/api/incident";
import { IncidentFilterRequest } from "@/src/types/incident";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";


export function useOpenedIncidents() {
    return useQuery({
        queryKey: ["incidents", "opened"],
        queryFn: incidentApi.getOpened,
    });
}

export function useIncidents(filters: IncidentFilterRequest = {}) {
    return useQuery({
        queryKey: ["incidents", "list", filters],
        queryFn: () => incidentApi.getAll(filters),
    });
}

export function useIncidentOverview(incidentId: string) {
    return useQuery({
        queryKey: ["incidents", incidentId, "overview"],
        queryFn: () => incidentApi.getOverview(incidentId),
        enabled: !!incidentId,
    });
}

export function useIncidentActivity(incidentId: string) {
    return useQuery({
        queryKey: ["incidents", incidentId, "activity"],
        queryFn: () => incidentApi.getActivityTimeline(incidentId),
        enabled: !!incidentId,
    });
}

export function useTeamMembers() {
    return useQuery({
        queryKey: ["incidents", "workspace", "members"],
        queryFn: incidentApi.getTeamMembers,
    });
}

export function useRunDiagnostic() {
    const queryClient = useQueryClient();
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: (incidentId: string) => incidentApi.runDiagnostic(incidentId),
        onSuccess: (data, incidentId) => {
            addToast(
                data.successful
                    ? "Diagnostic completed successfully"
                    : "Diagnostic completed with errors",
                data.successful ? "success" : "error"
            );
            queryClient.invalidateQueries({
                queryKey: ["incidents", incidentId],
            });
        },
        onError: (error: AxiosError<any>) => {
            addToast(
                error.response?.data?.message || "Failed to run diagnostic",
                "error"
            );
        },
    });
}

export function useAssignIncident() {
    const queryClient = useQueryClient();
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: ({
            incidentId,
            memberId,
        }: {
            incidentId: string;
            memberId: string;
        }) => incidentApi.assignMember(incidentId, memberId),
        onSuccess: (_, { incidentId }) => {
            addToast("Member assigned successfully", "success");
            queryClient.invalidateQueries({
                queryKey: ["incidents", incidentId],
            });
            queryClient.invalidateQueries({ queryKey: ["incidents", "list"] });
            queryClient.invalidateQueries({ queryKey: ["incidents", "opened"] });
        },
        onError: (error: AxiosError<any>) => {
            addToast(
                error.response?.data?.message || "Failed to assign member",
                "error"
            );
        },
    });
}