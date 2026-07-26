

import {
    IncidentDTO,
    IncidentOverview,
    IncidentDiagnosticTraceDTO,
    IncidentActivityDTO,
    MembershipResponse,
    IncidentFilterRequest,

} from "@/src/types/incident";
import { api } from "./config";
import { ApiResponse } from "@/src/types/api-response";
import { Meta } from "@/src/types/meta";


export const incidentApi = {
    getOpened: async () => {
        const { data } = await api.get<ApiResponse<IncidentDTO[]>>(
            "/incidents/opened"
        );
        return data.data;
    },

    getAll: async (params: IncidentFilterRequest = {}) => {
        const { data } = await api.get<ApiResponse<IncidentDTO[]> & { meta: Meta }>(
            "/incidents",
            { params }
        );
        return {
            data: data.data,
            meta: data.meta,
        };
    },

    getOverview: async (incidentId: string) => {
        const { data } = await api.get<ApiResponse<IncidentOverview>>(
            `/incidents/${incidentId}`
        );
        return data.data;
    },

    runDiagnostic: async (incidentId: string) => {
        const { data } = await api.post<ApiResponse<IncidentDiagnosticTraceDTO>>(
            `/incidents/${incidentId}/trace`
        );
        return data.data;
    },

    assignMember: async (incidentId: string, memberId: string) => {
        const { data } = await api.post<ApiResponse<null>>(
            `/incidents/${incidentId}/assign`,
            { memberId }
        );
        return data;
    },

    getTeamMembers: async () => {
        const { data } = await api.get<ApiResponse<MembershipResponse[]>>(
            "/incidents/workspace/members"
        );
        return data.data;
    },

    getActivityTimeline: async (incidentId: string) => {
        const { data } = await api.get<ApiResponse<IncidentActivityDTO[]>>(
            `/incidents/${incidentId}/activity-timeline`
        );
        return data.data;
    },
};