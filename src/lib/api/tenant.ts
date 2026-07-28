import { ApiResponse } from "@/src/types/api-response";
import { CreateTenantRequest, TenantSessionDTO } from "@/src/types/tenant";
import { api } from "./config";
import { MembershipSession } from "@/src/types/auth";


export const tenantApi = {
    createWorkspace: async (payload: CreateTenantRequest): Promise<TenantSessionDTO> => {
        const { data } = await api.post<ApiResponse<TenantSessionDTO>>("/workspaces", payload);
        return data.data;
    },

    getMyWorkspaces: async (): Promise<MembershipSession[]> => {
        const { data } = await api.get<ApiResponse<MembershipSession[]>>("/workspaces");
        return data.data
    },


    switchWorkspace: async (tenantId: string): Promise<MembershipSession> => {
        const { data } = await api.post<ApiResponse<MembershipSession>>(
            `/workspaces/switch/${tenantId}`
        );
        return data?.data
    },
};