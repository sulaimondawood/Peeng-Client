import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useForgotPassword } from "./hooks/use-auth";

export function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    forgotPassword.mutate(
      { email: email.trim().toLowerCase() },
      {
        onSuccess: () => setSubmitted(true),
      }
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-white font-display">
          Reset your password
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-xl sm:px-10 space-y-6">
          {submitted ? (
            <div className="space-y-4 text-center">
              <div className="rounded-lg bg-emerald-950/50 border border-emerald-900 p-3 text-xs text-emerald-300">
                If an account exists for{" "}
                <span className="font-mono text-emerald-200">{email}</span>, a
                reset link has been sent. Check your inbox.
              </div>
              <Link
                to="/auth/login"
                className="inline-flex text-xs text-indigo-400 font-semibold hover:text-indigo-300"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {forgotPassword.isError && (
                <p className="text-xs text-rose-400 text-center">
                  {(forgotPassword.error as any)?.response?.data?.message ||
                    "Something went wrong. Please try again."}
                </p>
              )}

              <button
                type="submit"
                disabled={forgotPassword.isPending}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50 mt-4 shadow-sm"
              >
                {forgotPassword.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="border-t border-slate-800 pt-4 text-center">
                <Link
                  to="/auth/login"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Remember your password?{" "}
                  <span className="text-indigo-400 font-semibold">Sign in</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;