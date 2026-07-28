import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useResetPassword } from "./hooks/use-auth";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const resetPassword = useResetPassword();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!token) {
      setFormError("Reset token is missing. Open the link from your email.");
      return;
    }
    if (newPassword.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("New password and confirm password do not match.");
      return;
    }

    resetPassword.mutate({
      token,
      newPassword,
      confirmPassword,
    });
  };

  if (!token) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-xl sm:px-10 space-y-4 text-center">
            <div className="rounded-lg bg-rose-950/50 border border-rose-900 p-3 text-xs text-rose-300 flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                This reset link is invalid or incomplete. Request a new one from
                the forgot password page.
              </p>
            </div>
            <Link
              to="/auth/forgot"
              className="inline-flex text-xs text-indigo-400 font-semibold hover:text-indigo-300"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-white font-display">
          Choose a new password
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Enter and confirm your new password below
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-xl sm:px-10 space-y-6">
          {(formError || resetPassword.isError) && (
            <div className="rounded-lg bg-rose-950/50 border border-rose-900 p-3 text-xs text-rose-300 flex items-start gap-2">
              <p className="flex-1">
                {formError ||
                  (resetPassword.error as any)?.response?.data?.message ||
                  "Unable to reset password."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  className="block w-full pl-10 pr-10 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                  placeholder="••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={8}
                  className="block w-full pl-10 pr-10 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={resetPassword.isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50 mt-4 shadow-sm"
            >
              {resetPassword.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating password...
                </>
              ) : (
                <>
                  Reset password
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="border-t border-slate-800 pt-4 text-center">
              <Link
                to="/auth/login"
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Back to{" "}
                <span className="text-indigo-400 font-semibold">Sign in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;