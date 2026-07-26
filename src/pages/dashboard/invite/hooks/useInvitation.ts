import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { PATHS } from '@/src/utils/routes/paths';
import { useAcceptInvite, useInvitePreview } from '../../team/hooks/use-team';

export function useInvitation(token: string) {
  const navigate = useNavigate();

  const {
    data: preview,
    isLoading: loading,
    isError,
    error: queryError,
  } = useInvitePreview(token);

  const acceptMutation = useAcceptInvite();


  const isMissingToken = !token || token.trim().length === 0;

  const errorMessage = isMissingToken
    ? 'No invitation token was provided in the link.'
    : queryError
      ? (queryError as AxiosError<{ message?: string }>).response?.data?.message ||
      'This invitation signature is invalid, corrupted, or has expired.'
      : null;

  const acceptInvitation = async (formData: { name: string; password?: string }) => {
    if (!token) return;

    acceptMutation.mutate(
      {
        token,
        name: formData.name,
        password: formData.password,
      },
      {
        onSuccess: () => {
          navigate(PATHS.AUTH.LOGIN, { replace: true });
        },
      }
    );
  };

  return {
    isValid: Boolean(preview && !isError && !isMissingToken),
    loading: isMissingToken ? false : loading,
    error: errorMessage,
    workspaceName: preview?.workspaceName || '',
    inviteeEmail: preview?.email || '',
    isAlreadyRegistered: preview?.isAlreadyRegistered || false,
    isSubmitting: acceptMutation.isPending,
    acceptInvitation,
  };
}