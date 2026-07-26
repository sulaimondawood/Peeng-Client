import { RoleType } from '@/src/types/auth';
import { MembershipDTO } from '@/src/types/team';
import { RefreshCw, Shield, Trash2, Mail, Loader2 } from 'lucide-react';

interface OperatorRosterTableProps {
  id?: string;
  members: MembershipDTO[];
  onRoleChange: (id: string, role: RoleType) => void;
  onRemove: (id: string) => void;
  onResendInvite: (id: string) => void;
  resendingId?: string | null;
  removingId?: string | null;
  isResending?: boolean;
  isRemoving?: boolean;
}

export function OperatorRosterTable({
  id = 'operator-roster',
  members,
  onRoleChange,
  onRemove,
  onResendInvite,
  resendingId = null,
  removingId = null,
  isResending = false,
  isRemoving = false,
}: OperatorRosterTableProps) {
  const getStatusBadge = (status: MembershipDTO['status'] | 'INVITED' | 'REMOVED' | 'PENDING') => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-[10px] font-mono font-medium uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active
          </span>
        );
      case 'INVITED':
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-900/50 text-amber-400 text-[10px] font-mono font-medium uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Invited
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 text-[10px] font-mono font-medium uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Suspended
          </span>
        );
      case 'REMOVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-mono font-medium uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            Removed
          </span>
        );
      default:
        return null;
    }
  };

  const getRoleLabel = (role: RoleType) => {
    switch (role) {
      case 'OWNER':
        return 'Workspace Owner';
      case 'ADMIN':
        return 'Administrator';
      case 'MEMBER':
        return 'Member';
      case 'VIEWER':
        return 'Viewer';
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-xl text-zinc-100" id={id}>
      {/* Table Header Section */}
      <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="space-y-0.5">
          <h2 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Team Members
          </h2>
          <p className="text-xs text-zinc-400">
            Manage team members and assigned access permissions.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded">
            MEMBERS: {members.length}
          </span>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden divide-y divide-zinc-900">
        {members.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 font-mono text-xs">
            No team members found.
          </div>
        ) : (
          members.map((member) => {
            const isRowResending = isResending && resendingId === member.id;
            const isRowRemoving = isRemoving && removingId === member.id;

            return (
              <div key={member.id} className="p-4 space-y-3 hover:bg-zinc-900/30 transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white uppercase text-xs">
                      {member.avatarUrl ? (
                        <img src={member.avatarUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        (member.name || member.email)[0]
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">{member.name || 'Pending User'}</h3>
                      <p className="text-[11px] text-zinc-500 font-mono leading-tight">{member.email}</p>
                    </div>
                  </div>
                  <div>{getStatusBadge(member.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 items-center">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500 font-semibold mb-1">
                      Role
                    </span>
                    {member.role === 'OWNER' || (member.status as string) === 'REMOVED' ? (
                      <div className="flex items-center gap-1 text-zinc-400 font-medium text-[11px] font-mono">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span>{getRoleLabel(member.role)}</span>
                      </div>
                    ) : (
                      <select
                        value={member.role}
                        onChange={(e) => onRoleChange(member.id, e.target.value as RoleType)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 py-1 px-2 rounded font-mono focus:outline-none"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="MEMBER">MEMBER</option>
                        <option value="VIEWER">VIEWER</option>
                      </select>
                    )}
                  </div>

                  <div className="flex justify-end gap-1 pt-4">
                    {member.status as string === 'INVITED' && (
                      <button
                        onClick={() => onResendInvite(member.id)}
                        disabled={isRowResending}
                        className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded transition-colors cursor-pointer disabled:opacity-50"
                        title="Resend Invitation Email"
                      >
                        {isRowResending ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                        ) : (
                          <Mail className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                    {member.role !== 'OWNER' && (member.status as string) !== 'REMOVED' && (
                      <button
                        onClick={() => onRemove(member.id)}
                        disabled={isRowRemoving}
                        className="p-1.5 bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-900/50 text-zinc-400 hover:text-red-400 rounded transition-colors cursor-pointer disabled:opacity-50"
                        title="Remove Member"
                      >
                        {isRowRemoving ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
              <th className="p-4">User Identity</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {members.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500 font-mono">
                  No workspace members found.
                </td>
              </tr>
            ) : (
              members.map((member) => {
                const isRowResending = isResending && resendingId === member.id;
                const isRowRemoving = isRemoving && removingId === member.id;

                return (
                  <tr key={member.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white uppercase text-xs">
                          {member.avatarUrl ? (
                            <img src={member.avatarUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            (member.name || member.email)[0]
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-white block">
                            {member.name || 'Pending User'}
                          </span>
                          <span className="text-[11px] text-zinc-500 font-mono block">
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      {member.role === 'OWNER' || (member.status as string) === 'REMOVED' ? (
                        <div className="flex items-center gap-1.5 text-zinc-400 font-medium text-xs font-mono">
                          <Shield className="w-3.5 h-3.5 text-amber-400" />
                          <span>{getRoleLabel(member.role)}</span>
                        </div>
                      ) : (
                        <select
                          value={member.role}
                          onChange={(e) => onRoleChange(member.id, e.target.value as RoleType)}
                          className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 py-1 px-2.5 rounded-lg font-mono outline-none cursor-pointer focus:border-zinc-700 transition-colors"
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="MEMBER">MEMBER</option>
                          <option value="VIEWER">VIEWER</option>
                        </select>
                      )}
                    </td>

                    <td className="p-4">{getStatusBadge(member.status)}</td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {member.status as string === 'INVITED' && (
                          <button
                            onClick={() => onResendInvite(member.id)}
                            disabled={isRowResending}
                            className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-50"
                            title="Resend Invite Email"
                          >
                            <RefreshCw className={`w-3 h-3 ${isRowResending ? 'animate-spin text-amber-400' : ''}`} />
                            <span>{isRowResending ? 'Sending...' : 'Resend'}</span>
                          </button>
                        )}

                        {member.role !== 'OWNER' && (member.status as string) !== 'REMOVED' && (
                          <button
                            onClick={() => onRemove(member.id)}
                            disabled={isRowRemoving}
                            className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 border border-transparent rounded transition-colors cursor-pointer disabled:opacity-50"
                            title="Remove Member"
                          >
                            {isRowRemoving ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}