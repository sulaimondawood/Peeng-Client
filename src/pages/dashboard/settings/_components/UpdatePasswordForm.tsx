import React, { useState } from 'react';
import { KeyRound, Lock, Loader2, Eye, EyeOff, Check } from 'lucide-react';
import { useUpdatePassword } from '../hooks/use-profile';


export function UpdatePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    const updatePasswordMutation = useUpdatePassword();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (newPassword !== confirmNewPassword) {
            setLocalError('New passwords do not match.');
            return;
        }

        if (newPassword.length < 8) {
            setLocalError('New password must be at least 8 characters long.');
            return;
        }

        updatePasswordMutation.mutate(
            { currentPassword, newPassword, confirmNewPassword },
            {
                onSuccess: () => {
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                },
            }
        );
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 text-zinc-100">
            <div className="border-b border-zinc-800 pb-3 space-y-1">
                <h2 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-zinc-400" /> Account Password
                </h2>
                <p className="text-[11px] text-zinc-400">
                    Ensure your password uses strong criteria to protect operator privileges.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {localError && (
                    <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-lg text-red-300 text-xs font-mono">
                        {localError}
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            required
                            className="w-full pl-3 pr-9 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors font-mono"
                            placeholder="••••••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            disabled={updatePasswordMutation.isPending}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                        >
                            {showCurrentPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                required
                                className="w-full pl-3 pr-9 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors font-mono"
                                placeholder="••••••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={updatePasswordMutation.isPending}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                            >
                                {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                className="w-full pl-3 pr-9 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-700 transition-colors font-mono"
                                placeholder="••••••••••••"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                disabled={updatePasswordMutation.isPending}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                    <div className={`flex items-center gap-1.5 ${newPassword.length >= 8 ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
                        <Check className="w-3 h-3" /> Minimum 8 characters
                    </div>
                    <div className={`flex items-center gap-1.5 ${newPassword && newPassword === confirmNewPassword ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}`}>
                        <Check className="w-3 h-3" /> Passwords match
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={
                            updatePasswordMutation.isPending ||
                            !currentPassword ||
                            !newPassword ||
                            !confirmNewPassword
                        }
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {updatePasswordMutation.isPending ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <Lock className="w-3.5 h-3.5" />
                        )}
                        <span>Update Password</span>
                    </button>
                </div>
            </form>
        </div>
    );
}