import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';

export function ResetPasswordPage() {
  const { addToast } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  const passedEmail = (location.state as any)?.email || 'sulaimond70@gmail.com';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      addToast('Password successfully updated.', 'success');
      navigate('/auth/login');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-white font-display">
          Set new password
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Enter a new password for <span className="text-slate-200 font-semibold">{passedEmail}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-xl sm:px-10 space-y-6">
          {errorMessage && (
            <div className="rounded-lg bg-rose-950/50 border border-rose-900 p-3 text-xs text-rose-300 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <p className="flex-1">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs font-mono text-slate-400">
              <div className={`flex items-center gap-1.5 ${password.length >= 8 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                <Check className="w-3.5 h-3.5" /> Minimum 8 characters
              </div>
              <div className={`flex items-center gap-1.5 ${password && password === confirmPassword ? 'text-emerald-400 font-semibold' : 'text-slate-500'}`}>
                <Check className="w-3.5 h-3.5" /> Passwords match
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50 mt-4 shadow-sm"
            >
              {isLoading ? 'Updating password...' : 'Update Password'}
            </button>

            <div className="border-t border-slate-800 pt-4 text-center">
              <Link to="/auth/login" className="text-xs text-slate-400 hover:text-white transition-colors">
                Cancel and return to <span className="text-indigo-400 font-semibold">Sign In</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ResetPasswordPage;
