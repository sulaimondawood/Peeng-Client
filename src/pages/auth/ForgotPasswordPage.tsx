import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { Mail, ArrowRight } from 'lucide-react';

export function ForgotPasswordPage() {
  const { addToast } = useAppState();
  const navigate = useNavigate();

  const [email, setEmail] = useState('sulaimond70@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      addToast('Password reset link sent to ' + email, 'success');
      navigate('/auth/reset', { state: { email } });
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-white font-display">
          Reset your password
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Enter your email address and we'll send you a link to reset your password
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50 mt-4 shadow-sm"
            >
              {isLoading ? 'Sending reset link...' : 'Send reset link'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="border-t border-slate-800 pt-4 text-center">
              <Link to="/auth/login" className="text-xs text-slate-400 hover:text-white transition-colors">
                Remember your password? <span className="text-indigo-400 font-semibold">Sign in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgotPasswordPage;
