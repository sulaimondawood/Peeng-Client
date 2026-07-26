import React, { useState } from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import { useUpdateName } from '../hooks/use-profile';


interface UpdateNameFormProps {
    initialName?: string;
}

export function UpdateNameForm({ initialName = '' }: UpdateNameFormProps) {
    const [name, setName] = useState(initialName);
    const updateNameMutation = useUpdateName();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        updateNameMutation.mutate({ name: name.trim() });
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 text-zinc-100">
            <div className="border-b border-zinc-800 pb-3 space-y-1">
                <h2 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-400" /> Display Name
                </h2>
                <p className="text-[11px] text-zinc-400">
                    Update your public profile name visible across workspace audits.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                        Full Name
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors font-medium"
                        placeholder="e.g. Dauda Sulaimon"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={updateNameMutation.isPending}
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={updateNameMutation.isPending || !name.trim()}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {updateNameMutation.isPending ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <Save className="w-3.5 h-3.5" />
                        )}
                        <span>Save Name</span>
                    </button>
                </div>
            </form>
        </div>
    );
}