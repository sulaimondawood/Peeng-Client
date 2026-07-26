import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppState } from "@/src/context/StateContext";

import { AxiosError } from "axios";
import { UpdateNameRequest, UpdatePasswordRequest } from "@/src/types/auth";
import { profileApi } from "@/src/lib/api/profile";

export function useUpdateName() {
    const queryClient = useQueryClient();
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: (payload: UpdateNameRequest) => profileApi.updateName(payload),
        onSuccess: () => {
            addToast("Name updated successfully", "success");
            queryClient.invalidateQueries({ queryKey: ["user", "me"] });
        },
        onError: (error: AxiosError<any>) => {
            addToast(
                error.response?.data?.message || "Failed to update name",
                "error"
            );
        },
    });
}

export function useUpdatePassword() {
    const { addToast } = useAppState();

    return useMutation({
        mutationFn: (payload: UpdatePasswordRequest) => profileApi.updatePassword(payload),
        onSuccess: () => {
            addToast("Password updated successfully", "success");
        },
        onError: (error: AxiosError<any>) => {
            addToast(
                error.response?.data?.message || "Failed to update password",
                "error"
            );
        },
    });
}