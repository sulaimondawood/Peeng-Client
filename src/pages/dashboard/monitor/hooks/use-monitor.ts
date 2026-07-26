import { useAppState } from "@/src/context/StateContext";
import { monitorApi } from "@/src/lib/api/monitor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";


export function useToggleMonitor() {
    const queryClient = useQueryClient();
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: (monitorId: string) => monitorApi.toggleState(monitorId),

        onSuccess: (data) => {
            addToast(data.message || "Monitor updated", "success");
            queryClient.invalidateQueries({ queryKey: ["dashboard", "monitors", "recent"] });
        },

        onError: (error: AxiosError<any>) => {
            const message =
                error.response?.data?.message || "Failed to toggle monitor";
            addToast(message, "error");
        },
    });
}