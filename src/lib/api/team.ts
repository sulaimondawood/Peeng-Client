import { ApiResponse } from "@/src/types/api-response";
import { CompleteInviteRegistrationDTO, InvitePreviewResponseDTO, MemberInviteDTO, MemberRoleDTO, MembershipDTO, TeamOverview } from "@/src/types/team";
import { api } from "./config";



export const teamApi = {
    getAllMembers: async (): Promise<MembershipDTO[]> => {
        const { data } = await api.get<ApiResponse<MembershipDTO[]>>("/members");
        return data.data;
    },

    getTeamOverview: async (): Promise<TeamOverview> => {
        const { data } = await api.get<ApiResponse<TeamOverview>>("/members/overview");
        return data.data;
    },

    sendInvite: async (payload: MemberInviteDTO): Promise<void> => {
        await api.post<ApiResponse<null>>("/members/invitation", payload);
    },

    resendInvite: async (membershipId: string): Promise<void> => {
        await api.post<ApiResponse<null>>(`/members/invitation/${membershipId}/resend`);
    },

    modifyMemberRole: async (membershipId: string, payload: MemberRoleDTO): Promise<void> => {
        await api.patch<ApiResponse<null>>(`/members/${membershipId}/role`, payload);
    },

    removeMember: async (membershipId: string): Promise<void> => {
        await api.delete<ApiResponse<null>>(`/members/${membershipId}/remove`);
    },

    previewInvite: async (token: string): Promise<InvitePreviewResponseDTO> => {
        const encodedToken = encodeURIComponent(token.trim());
        const { data } = await api.get<ApiResponse<InvitePreviewResponseDTO>>(
            `/members/${encodedToken}/preview-invite`
        );
        return data.data;
    },
    acceptInvite: async (payload: CompleteInviteRegistrationDTO): Promise<void> => {
        await api.post<ApiResponse<null>>("/members/accept-invite", payload);
    },
};