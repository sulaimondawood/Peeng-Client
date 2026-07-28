import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { useAppState } from "../context/StateContext";
import { CreateTenantRequest } from "../types/tenant";
import { tenantApi } from "../lib/api/tenant";

export function useCreateWorkspace() {
    const queryClient = useQueryClient();
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: (payload: CreateTenantRequest) => tenantApi.createWorkspace(payload),
        onSuccess: (data) => {
            addToast(`Workspace "${data.workspaceName}" created successfully!`, "success");
            queryClient.invalidateQueries({ queryKey: ["auth", "memberships"] });
        },
        onError: (error: AxiosError<any>) => {
            addToast(
                error.response?.data?.message || "Failed to create workspace",
                "error"
            );
        },
    });
}