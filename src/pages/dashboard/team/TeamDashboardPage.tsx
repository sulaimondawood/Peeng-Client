import React, { useState } from 'react';
import { Users, MailCheck, AlertOctagon, UserCheck } from 'lucide-react';
import { useTeamManagement } from './hooks/useTeamManagement';
import { OperatorRosterTable } from './components/OperatorRosterTable';
import { InviteOperatorForm } from './components/InviteOperatorForm';
import { ConfirmationModal } from '@/src/pages/dashboard/components/ConfirmationModal';
import { Role } from '@/src/types';


export default function TeamDashboardPage() {
  const {
    members,
    isProcessing,
    handleInviteOperator,
    handleRoleChange,
    handleResendInvite,
    handleRemoveMember
  } = useTeamManagement();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    onConfirm: () => void;
    variant: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: '',
    onConfirm: () => { },
    variant: 'danger',
  });

  const activeCount = members.filter(m => m.status === 'active').length;
  const invitedCount = members.filter(m => m.status === 'invited').length;
  const expiredCount = members.filter(m => m.status === 'expired').length;

  const handleInvite = async (email: string, role: Role) => {
    await handleInviteOperator(email, role);
  };

  const handleRemove = (id: string) => {
    const member = members.find(m => m.id === id);
    if (!member) return;

    const isPending = member.status === 'invited' || member.status === 'expired';

    setConfirmModal({
      isOpen: true,
      title: isPending ? 'Revoke Invite' : 'Remove Team Member',
      description: isPending
        ? `Are you sure you want to revoke the pending invite for ${member.email}?`
        : `Are you sure you want to remove ${member.name} (${member.email}) from this workspace?`,
      confirmText: isPending ? 'Revoke Invite' : 'Remove Member',
      variant: 'danger',
      onConfirm: () => {
        handleRemoveMember(id);
      }
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none" id="team-control-panel-root">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold font-sans tracking-tight text-slate-100">
              Team Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Invite team members, assign workspace roles, and manage access permissions.
          </p>
        </div>
      </div>

      {/* Status Dashboard Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Seats */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono truncate">
              Total Members
            </span>
            <span className="text-lg font-extrabold text-slate-200 block font-mono">
              {members.length}
            </span>
          </div>
        </div>

        {/* Active Seats */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-950/40 border border-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono truncate">
              Active Members
            </span>
            <span className="text-lg font-extrabold text-emerald-400 block font-mono">
              {activeCount}
            </span>
          </div>
        </div>

        {/* Pending Seats */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-950/20 border border-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-400">
            <MailCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono truncate">
              Pending Invites
            </span>
            <span className="text-lg font-extrabold text-indigo-400 block font-mono">
              {invitedCount}
            </span>
          </div>
        </div>

        {/* Expired Seats */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-rose-950/20 border border-rose-900/30 rounded-lg flex items-center justify-center text-rose-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono truncate">
              Expired Invites
            </span>
            <span className="text-lg font-extrabold text-rose-400 block font-mono">
              {expiredCount}
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Orchestrated Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Roster list takes 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-4">
          <OperatorRosterTable
            members={members}
            onRoleChange={handleRoleChange}
            onRemove={handleRemove}
            onResendInvite={handleResendInvite}
          />
        </div>

        {/* Invite Form takes 1 column */}
        <div className="space-y-4">
          <InviteOperatorForm
            onInvite={handleInvite}
            isSubmitting={isProcessing}
          />

          {/* Security Policy Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Security & Audit Policy
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Every invitation is generated with a secure token. Invite links expire after 48 hours to safeguard workspace access.
            </p>
          </div>
        </div>
      </div>

      {/* Reusable Interactive Confirmation HUD */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        description={confirmModal.description}
        confirmText={confirmModal.confirmText}
        variant={confirmModal.variant}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
export { TeamDashboardPage };
