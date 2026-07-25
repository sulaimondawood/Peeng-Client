import { useAppState } from '@/src/context/StateContext';
import { useState, useEffect } from 'react';

export interface InvitationState {
  isValid: boolean | null;
  loading: boolean;
  error: string | null;
  workspaceName: string | null;
  inviteeEmail: string | null;
}

export function useInvitation(token: string | null) {
  const { addToast } = useAppState();
  const [state, setState] = useState<InvitationState>({
    isValid: null,
    loading: true,
    error: null,
    workspaceName: null,
    inviteeEmail: null,
  });

  useEffect(() => {
    if (!token) {
      setState({
        isValid: false,
        loading: false,
        error: 'Secured authentication link is missing or structural token parameter was not provided.',
        workspaceName: null,
        inviteeEmail: null,
      });
      return;
    }

    // Simulate verification API lookup (GET /api/v1/public/invitations/verify?token=...)
    setState(prev => ({ ...prev, loading: true, error: null }));
    const timer = setTimeout(() => {
      if (token.toLowerCase() === 'invalid' || token.toLowerCase() === 'expired') {
        setState({
          isValid: false,
          loading: false,
          error: 'This invitation token has expired or has already been consumed. Please contact your workspace administrator to issue a new invite.',
          workspaceName: null,
          inviteeEmail: null,
        });
        addToast('Invitation validation failed: Token expired/invalid.', 'error');
      } else {
        // Successful mock token verification and payload retrieval
        // Let's decode or derive some mock data based on token if needed
        let email = 'oncall-operator@acme.com';
        let workspace = 'Acme Corp';

        if (token.includes('_')) {
          const parts = token.split('_');
          if (parts[0]) email = parts[0] + '@acme.com';
          if (parts[1]) workspace = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
        }

        setState({
          isValid: true,
          loading: false,
          error: null,
          workspaceName: workspace,
          inviteeEmail: email,
        });
        addToast(`Successfully validated link for workspace '${workspace}'.`, 'success');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [token]);

  const acceptInvitation = async (password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true }));

    // Simulate POST /api/v1/public/invitations/accept
    return new Promise((resolve) => {
      setTimeout(() => {
        setState(prev => ({ ...prev, loading: false }));
        addToast('Operator credentials established. Workspace enrollment complete.', 'success');
        resolve(true);
      }, 1500);
    });
  };

  // const resendInvitation = (id: string) => {
  //   resendInvite(id);
  // };

  // const deleteInvitation = (id: string) => {
  //   removeMember(id);
  // };

  return {
    ...state,
    acceptInvitation,
    // resendInvitation,
    // deleteInvitation,
  };
}
