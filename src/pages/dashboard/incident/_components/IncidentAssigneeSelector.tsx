
import { MembershipResponse } from "@/src/types/incident";
import { Users } from "lucide-react";


interface IncidentAssigneeSelectorProps {
    currentAssignedTo: string | null;
    members: MembershipResponse[];
    onAssign: (memberId: string) => void;
    isAssigning: boolean;
}

export function IncidentAssigneeSelector({
    currentAssignedTo,
    members,
    onAssign,
    isAssigning,
}: IncidentAssigneeSelectorProps) {
    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" /> Incident Assignment
            </span>

            <div className="space-y-3">
                <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1 font-mono">
                        Assigned Team Member
                    </label>
                    <select
                        disabled={isAssigning}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 text-xs font-mono focus:outline-none cursor-pointer disabled:opacity-50"
                        value={""}
                        onChange={(e) => onAssign(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Member...
                        </option>
                        {members.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}