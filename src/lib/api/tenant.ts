import { ApiResponse } from "@/src/types/api-response";
import { CreateTenantRequest, TenantSessionDTO } from "@/src/types/tenant";
import { api } from "./config";


export const tenantApi = {
    createWorkspace: async (payload: CreateTenantRequest): Promise<TenantSessionDTO> => {
        const { data } = await api.post<ApiResponse<TenantSessionDTO>>("/workspaces", payload);
        return data.data;
    },
};