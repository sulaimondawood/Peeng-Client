import { AlertOctagon, MailCheck, UserCheck, Users } from 'lucide-react';

import { InviteOperatorForm } from './components/InviteOperatorForm';
import { OperatorRosterTable } from './components/OperatorRosterTable';
import {
  OperatorRosterTableSkeleton,
  TeamDashboardSkeleton,
  TeamHeaderSkeleton,
  TeamStatsSkeleton,
} from './components/skeletons/TeamSkeletons';
import {
  useModifyMemberRole,
  useRemoveMember,
  useResendInvite,
  useSendInvite,
  useTeamMembers,
  useTeamOverview,
} from './hooks/use-team';
import { RoleType } from '@/src/types/auth';
import { useState } from 'react';
import { MembershipDTO } from '@/src/types/team';
import { ConfirmationModal } from '../components/ConfirmationModal';

export default function TeamDashboardPage() {
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<MembershipDTO | null>(null);

  const { data: members = [], isLoading: isMembersLoading } = useTeamMembers();
  const { data: overview, isLoading: isOverviewLoading } = useTeamOverview();

  const inviteMutation = useSendInvite();
  const resendMutation = useResendInvite();
  const modifyRoleMutation = useModifyMemberRole();
  const removeMutation = useRemoveMember();

  const handleInvite = (email: string, role: RoleType) => {
    inviteMutation.mutate({ email, role });
  };

  const handleRoleChange = (membershipId: string, role: RoleType) => {
    modifyRoleMutation.mutate({ membershipId, payload: { role } });
  };

  const handleResendInvite = (membershipId: string) => {
    setResendingId(membershipId);
    resendMutation.mutate(membershipId, {
      onSettled: () => setResendingId(null),
    });
  };


  const handleRemoveClick = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;
    setMemberToRemove(member);
  };

  const handleConfirmRemove = () => {
    if (!memberToRemove) return;
    setRemovingId(memberToRemove.id);
    removeMutation.mutate(memberToRemove.id, {
      onSettled: () => {
        setRemovingId(null);
        setMemberToRemove(null);
      },
    });
  };

  const isPendingInvite = memberToRemove?.status === 'INVITED';


  if (isMembersLoading && isOverviewLoading) {
    return <TeamDashboardSkeleton />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none text-zinc-100">
      {/* Page Header */}
      {isOverviewLoading && !overview ? (
        <TeamHeaderSkeleton />
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h1 className="text-xl font-bold tracking-tight text-white">Team Management</h1>
            </div>
            <p className="text-xs text-zinc-400 max-w-xl">
              Invite team members, assign workspace roles, and manage access permissions.
            </p>
          </div>
        </div>
      )}

      {isOverviewLoading && !overview ? (
        <TeamStatsSkeleton />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold font-mono truncate">
                Total Members
              </span>
              <span className="text-lg font-extrabold text-white block font-mono">
                {overview?.operators ?? members.length}
              </span>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-950/40 border border-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold font-mono truncate">
                Active Members
              </span>
              <span className="text-lg font-extrabold text-emerald-400 block font-mono">
                {overview?.activeOperators ?? 0}
              </span>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-950/30 border border-amber-900/30 rounded-lg flex items-center justify-center text-amber-400">
              <MailCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold font-mono truncate">
                Pending Invites
              </span>
              <span className="text-lg font-extrabold text-amber-400 block font-mono">
                {overview?.pendingOperators ?? 0}
              </span>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-red-950/30 border border-red-900/30 rounded-lg flex items-center justify-center text-red-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold font-mono truncate">
                Suspended
              </span>
              <span className="text-lg font-extrabold text-red-400 block font-mono">
                {overview?.suspendedOperators ?? 0}
              </span>
            </div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          {isMembersLoading ? (
            <OperatorRosterTableSkeleton count={5} />
          ) : (
            <OperatorRosterTable
              members={members}
              onRoleChange={handleRoleChange}
              onRemove={handleRemoveClick}
              onResendInvite={handleResendInvite}
              resendingId={resendingId}
              removingId={removingId}
              isResending={resendMutation.isPending}
              isRemoving={removeMutation.isPending}
            />
          )}
        </div>

        <div className="space-y-4">
          <InviteOperatorForm
            onInvite={handleInvite}
            isSubmitting={inviteMutation.isPending}
          />

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              Security Policy
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Invitation links are cryptographically signed and expire after 48 hours to maintain strict workspace access security.
            </p>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={!!memberToRemove}
        onClose={() => setMemberToRemove(null)}
        onConfirm={handleConfirmRemove}
        title={
          isPendingInvite
            ? `Revoke Invitation for ${memberToRemove?.email}`
            : `Remove ${memberToRemove?.name || memberToRemove?.email}`
        }
        description={
          isPendingInvite
            ? `Are you sure you want to revoke the pending invite for ${memberToRemove?.email}? They will no longer be able to use the invitation link.`
            : `Are you sure you want to remove ${memberToRemove?.name || memberToRemove?.email} from this workspace? They will immediately lose access to all monitors, telemetry data, and settings.`
        }
        confirmText={isPendingInvite ? 'Revoke Invite' : 'Remove Member'}
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

export { TeamDashboardPage };