import { ApiResponse } from "@/src/types/auth";
import { api } from "./config";

export const monitorApi = {
    toggleState: async (monitorId: string) => {
        const { data } = await api.post<ApiResponse<null>>(
            `/monitors/${monitorId}/toggle`
        );
        return data;
    },
};