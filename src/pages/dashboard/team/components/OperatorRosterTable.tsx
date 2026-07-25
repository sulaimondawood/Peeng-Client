import InitialsAvatar from '@/src/shared/InitialsAvatar';
import { Member, Role } from '@/src/types';
import { RefreshCw, Shield, Trash2 } from 'lucide-react';

interface OperatorRosterTableProps {
  id?: string;
  members: Member[];
  onRoleChange: (id: string, role: Role) => void;
  onRemove: (id: string) => void;
  onResendInvite: (id: string) => void;
}

export function OperatorRosterTable({
  id = 'operator-roster',
  members,
  onRoleChange,
  onRemove,
  onResendInvite
}: OperatorRosterTableProps) {

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 text-[10px] font-mono font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Active
          </span>
        );
      case 'invited':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 text-[10px] font-mono font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            Invited
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/40 border border-rose-900/30 text-rose-400 text-[10px] font-mono font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case 'owner':
        return 'Workspace Owner';
      case 'admin':
        return 'Administrator';
      case 'member':
        return 'Member';
      case 'viewer':
        return 'Viewer';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-xl overflow-hidden shadow-xl" id={id}>
      {/* Table Header Section */}
      <div className="p-4 bg-slate-950/30 border-b border-slate-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="space-y-0.5">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
            Team Members
          </h4>
          <p className="text-xs text-slate-400">
            Manage team members and assigned access permissions.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-2.5 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[9px] rounded-sm">
            MEMBERS: {members.length}
          </span>
        </div>
      </div>

      {/* MOBILE MOBILE STACKED VIEW (Displays cleanly on smartphone viewports) */}
      <div className="block md:hidden divide-y divide-slate-850/50">
        {members.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs">
            No matched operators discovered.
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="p-4.5 space-y-4 hover:bg-slate-950/10 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <InitialsAvatar name={member.name} size="md" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-100">{member.name}</h5>
                    <p className="text-[10px] text-slate-500 font-mono leading-tight">{member.email}</p>
                  </div>
                </div>
                <div>
                  {getStatusBadge(member.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* Role selection dropdown */}
                <div>
                  <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Clearance Level
                  </span>
                  {member.role === 'owner' ? (
                    <div className="flex items-center gap-1 text-amber-400 font-medium text-[10px] font-mono py-1">
                      <Shield className="w-3 h-3" />
                      <span>{getRoleLabel(member.role)}</span>
                    </div>
                  ) : (
                    <select
                      value={member.role}
                      onChange={(e) => onRoleChange(member.id, e.target.value as Role)}
                      className="w-full bg-slate-950 border border-slate-850 text-[10px] text-slate-300 py-1 px-2 rounded-md font-sans focus:outline-hidden"
                    >
                      <option value="admin">Administrator</option>
                      <option value="member">On-Call Operator</option>
                      <option value="viewer">Read-Only Viewer</option>
                    </select>
                  )}
                </div>

                {/* Mobile action panel */}
                <div className="flex flex-col justify-end items-end">
                  <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1 self-end">
                    Access Action
                  </span>
                  <div className="flex items-center gap-2">
                    {member.status === 'expired' && (
                      <button
                        onClick={() => onResendInvite(member.id)}
                        className="px-2 py-1 bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-900/30 text-indigo-400 hover:text-indigo-300 rounded text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Resend</span>
                      </button>
                    )}
                    {member.status === 'invited' && (
                      <button
                        onClick={() => onResendInvite(member.id)}
                        className="p-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors cursor-pointer"
                        title="Resend invitation email"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    )}
                    {member.role !== 'owner' && (
                      <button
                        onClick={() => onRemove(member.id)}
                        className="p-1.5 bg-slate-950 hover:bg-rose-955/20 border border-slate-850 hover:border-rose-900/40 text-slate-400 hover:text-rose-400 rounded transition-colors cursor-pointer"
                        title="Revoke clearance keys"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABULAR GRID VIEW (Displays beautifully on tablets and monitors) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-850/60 bg-slate-950/20 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
              <th className="p-4 font-semibold">User Identity</th>
              <th className="p-4 font-semibold">Role Authority</th>
              <th className="p-4 font-semibold">Status Code</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/40">
            {members.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 font-mono">
                  No matched operators discovered.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-950/20 transition-colors group"
                >
                  {/* User Identity cell */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <InitialsAvatar name={member.name} size="sm" />
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-slate-200 block">
                          {member.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role Authority cell */}
                  <td className="p-4">
                    {member.role === 'owner' ? (
                      <div className="flex items-center gap-1.5 text-amber-400 font-medium text-[11px] font-mono">
                        <Shield className="w-3.5 h-3.5" />
                        <span>{getRoleLabel(member.role)}</span>
                      </div>
                    ) : (
                      <div className="relative max-w-[160px]">
                        <select
                          value={member.role}
                          onChange={(e) => onRoleChange(member.id, e.target.value as Role)}
                          className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 text-[11px] text-slate-200 py-1 px-2.5 rounded-lg font-sans outline-hidden cursor-pointer focus:border-indigo-500 transition-colors"
                        >
                          <option value="admin">Administrator</option>
                          <option value="member">On-Call Operator</option>
                          <option value="viewer">Read-Only Viewer</option>
                        </select>
                      </div>
                    )}
                  </td>

                  {/* Status Code cell */}
                  <td className="p-4">
                    {getStatusBadge(member.status)}
                  </td>

                  {/* Actions cell */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {member.status === 'expired' ? (
                        <button
                          onClick={() => onResendInvite(member.id)}
                          className="px-2.5 py-1 bg-indigo-955/40 hover:bg-indigo-900/40 border border-indigo-900/30 text-indigo-400 hover:text-indigo-300 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                          title="Resend invitation token instantly"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend Invite</span>
                        </button>
                      ) : (
                        member.status === 'invited' && (
                          <button
                            onClick={() => onResendInvite(member.id)}
                            className="p-1.5 hover:bg-slate-850 text-slate-500 hover:text-slate-300 border border-transparent hover:border-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Resend Invitation Email"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )
                      )}

                      {member.role !== 'owner' && (
                        <button
                          onClick={() => onRemove(member.id)}
                          className="p-1.5 hover:bg-rose-955/15 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-950/30 rounded-lg transition-colors cursor-pointer"
                          title="Revoke operator authority and keys"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
