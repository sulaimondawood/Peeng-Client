import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useVerifyEmail, useResendVerification } from "./hooks/use-auth";

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { isLoading, isError, data, isSuccess, error } = useVerifyEmail(token || "");

  const [redirectCount, setRedirectCount] = useState(3);

  useEffect(() => {
    if (!isSuccess || !data?.success) return;

    const timer = setInterval(() => {
      setRedirectCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/auth/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSuccess, data, navigate]);

  const message = !token
    ? "Verification token is missing. Check your email link or request a new one."
    : data?.message ||
    (error as any)?.response?.data?.message ||
    "Verification failed. Please try again.";

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Email Verification
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Confirming your account details with Peeng
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-xl sm:px-10 space-y-6">
          {isLoading && (
            <div className="text-center py-6 space-y-4">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Verifying Token...
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Authenticating your request
                </p>
              </div>
            </div>
          )}


          {isSuccess && (
            <div className="space-y-6 text-center">
              <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-start gap-2.5 text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-0.5">
                  <p className="font-semibold text-emerald-200">Email Verified</p>
                  <p className="text-emerald-300 text-xs">{message}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400">
                Redirecting to login in{" "}
                <span className="text-white font-mono font-bold">
                  {redirectCount}s
                </span>
              </div>

              <button
                onClick={() => navigate("/auth/login")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                <span>Continue to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {isError && !isLoading && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-300 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-0.5">
                  <p className="font-semibold text-rose-200">
                    Verification Failed
                  </p>
                  <p className="text-rose-300 text-xs">{message}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-center">
                {isSuccess && (
                  <p className="text-xs text-emerald-400">
                    This verification link has expired. A new link has been sent to your email.
                  </p>
                )}

              </div>
            </div>
          )}

          <div className="border-t border-slate-800 pt-4 text-center">
            <Link
              to="/auth/login"
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}