import { useState, useMemo } from 'react';

export type Role = 'owner' | 'admin' | 'member' | 'viewer';
export type MemberStatus = 'active' | 'invited' | 'disabled';

export interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  avatar?: string;
}

export function useTeamManagement(members: Member[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter and search operators locally in memory
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, searchQuery, roleFilter, statusFilter]);

  // Handle invitation dispatcher
  const handleInviteOperator = async (email: string, role: Role): Promise<boolean> => {
    setIsProcessing(true);
    try {
      // API Call: POST /api/members/invite
      return true;
    } catch (err) {
      console.error('Failed to invite member:', err);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle role modification
  const handleRoleChange = async (id: string, role: Role): Promise<boolean> => {
    setIsProcessing(true);
    try {
      // API Call: PATCH /api/members/:id/role
      return true;
    } catch (err) {
      console.error('Failed to change member role:', err);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle invite resend
  const handleResendInvite = async (id: string): Promise<boolean> => {
    setIsProcessing(true);
    try {
      // API Call: POST /api/members/:id/resend-invite
      return true;
    } catch (err) {
      console.error('Failed to resend invite:', err);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle deletion / revocation
  const handleRemoveMember = async (id: string): Promise<boolean> => {
    setIsProcessing(true);
    try {
      // API Call: DELETE /api/members/:id
      return true;
    } catch (err) {
      console.error('Failed to remove member:', err);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    members,
    filteredMembers,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    isProcessing,
    handleInviteOperator,
    handleRoleChange,
    handleResendInvite,
    handleRemoveMember
  };
}