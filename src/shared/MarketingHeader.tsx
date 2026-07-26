import { Github } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from '../utils/routes/paths';

export function MarketingHeader() {
  const { user, isAuthenticated } = useAuth()

  const location = useLocation();
  const navigate = useNavigate();

  const handleLaunchConsole = () => {
    if (user && isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate(PATHS.AUTH.LOGIN);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">


          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <span className="font-bold tracking-tight text-white text-base font-mono">PEENG</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/features"
                className={`text-xs font-medium transition-colors ${location.pathname === '/features'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                Features
              </Link>
              <Link
                to="https://github.com/sulaimondawood/Peeng"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Documentation
              </Link>
              <Link
                to="https://github.com/sulaimondawood/Peeng"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </Link>
            </nav>
          </div>


          <div className="flex items-center gap-3">
            <button
              onClick={handleLaunchConsole}
              className="px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Launch Console
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default MarketingHeader;
