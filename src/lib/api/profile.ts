import { UpdateNameRequest, UpdatePasswordRequest } from "@/src/types/auth";
import { api } from "./config";
import { ApiResponse } from "@/src/types/api-response";



export const profileApi = {
    updateName: async (payload: UpdateNameRequest): Promise<void> => {
        await api.patch<ApiResponse<null>>("/auth/profile/name", payload);
    },

    updatePassword: async (payload: UpdatePasswordRequest): Promise<void> => {
        await api.put<ApiResponse<null>>("/auth/profile/password", payload);
    },
};