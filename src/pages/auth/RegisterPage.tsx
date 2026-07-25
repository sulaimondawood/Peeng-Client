import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { useRegister } from './hooks/use-auth';

export function RegisterPage() {
  const { addToast } = useAppState();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const { mutate: register, isPending: isLoading } = useRegister()

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !workspaceName) {
      addToast("All fields are required.");
      return;
    }

    register({
      name,
      email,
      password,
      workspaceName,
    });

  };



  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-white font-display">
          Create an account
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Get started with workspace monitoring and status pages
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-xl sm:px-10 space-y-6">

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-sans"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Workspace Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2 text-slate-200 bg-slate-950 border border-slate-800 rounded-lg text-xs placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 transition-all font-mono"
                  placeholder="Workspace"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50 mt-4 shadow-sm"
            >
              {isLoading ? 'Creating Account...' : 'Continue to Verification'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="border-t border-slate-800 pt-4 text-center">
              <p className="text-xs text-slate-400">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-indigo-400 font-semibold hover:text-indigo-300">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
