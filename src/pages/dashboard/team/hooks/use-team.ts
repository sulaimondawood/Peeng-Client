import { teamApi } from "@/src/lib/api/team";
import { useAppState } from "@/src/context/StateContext";
import { CompleteInviteRegistrationDTO, MemberInviteDTO, MemberRoleDTO } from "@/src/types/team";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team", "members"],
    queryFn: teamApi.getAllMembers,
  });
}

export function useTeamOverview() {
  return useQuery({
    queryKey: ["team", "overview"],
    queryFn: teamApi.getTeamOverview,
  });
}

export function useInvitePreview(token: string) {
  return useQuery({
    queryKey: ["team", "invite-preview", token],
    queryFn: () => teamApi.previewInvite(token),
    enabled: Boolean(token && token.trim().length > 0),
    retry: false,
  });
}

export function useSendInvite() {
  const queryClient = useQueryClient();
  const { addToast } = useAppState();

  return useMutation({
    mutationFn: (payload: MemberInviteDTO) => teamApi.sendInvite(payload),
    onSuccess: () => {
      addToast("Invitation sent successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: (error: AxiosError<any>) => {
      addToast(
        error.response?.data?.message || "Failed to send invitation",
        "error"
      );
    },
  });
}

export function useResendInvite() {
  const { addToast } = useAppState();

  return useMutation({
    mutationFn: (membershipId: string) => teamApi.resendInvite(membershipId),
    onSuccess: () => {
      addToast("Invitation resent successfully", "success");
    },
    onError: (error: AxiosError<any>) => {
      addToast(
        error.response?.data?.message || "Failed to resend invitation",
        "error"
      );
    },
  });
}

export function useModifyMemberRole() {
  const queryClient = useQueryClient();
  const { addToast } = useAppState();

  return useMutation({
    mutationFn: ({ membershipId, payload }: { membershipId: string; payload: MemberRoleDTO }) =>
      teamApi.modifyMemberRole(membershipId, payload),
    onSuccess: () => {
      addToast("Member role updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["team", "members"] });
    },
    onError: (error: AxiosError<any>) => {
      addToast(
        error.response?.data?.message || "Failed to update member role",
        "error"
      );
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();
  const { addToast } = useAppState();

  return useMutation({
    mutationFn: (membershipId: string) => teamApi.removeMember(membershipId),
    onSuccess: () => {
      addToast("Member removed from workspace", "success");
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
    onError: (error: AxiosError<any>) => {
      addToast(
        error.response?.data?.message || "Failed to remove member",
        "error"
      );
    },
  });
}

export function useAcceptInvite() {
  const { addToast } = useAppState();

  return useMutation({
    mutationFn: (payload: CompleteInviteRegistrationDTO) => teamApi.acceptInvite(payload),
    onSuccess: () => {
      addToast("Invitation accepted successfully. Welcome aboard!", "success");
    },
    onError: (error: AxiosError<any>) => {
      addToast(
        error.response?.data?.message || "Failed to accept invitation",
        "error"
      );
    },
  });
}