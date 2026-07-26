import { Activity, Bug, Github, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 select-none font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Clean 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">

          {/* Column 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-bold tracking-tight text-white font-mono text-base">PEENG</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Open-source uptime monitoring and real-time endpoint status checking for developer infrastructure.
            </p>

          </div>

          {/* Column 2: Platform Features */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase text-slate-200 font-semibold tracking-wider">Features</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  HTTP Health Checks
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Failure Thresholds
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Isolated Workspaces
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Public Status Pages
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Documentation & Resources */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase text-slate-200 font-semibold tracking-wider">Documentation</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="/features" className="hover:text-white transition-colors">
                  Quickstart Guide
                </a>
              </li>
              <li>
                <a href="/features" className="hover:text-white transition-colors">
                  REST API Endpoints
                </a>
              </li>
              <li>
                <a href="/features" className="hover:text-white transition-colors">
                  Self-Hosting Guide
                </a>
              </li>
              <li>
                <a href="/features" className="hover:text-white transition-colors">
                  Docker Deployment
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & GitHub */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase text-slate-200 font-semibold tracking-wider">Open Source</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://github.com/sulaimondawood/Peeng"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              {/* <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Bug className="w-3.5 h-3.5 text-amber-400" />
                  <span>Issue Tracker</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Release Notes v1.2</span>
                </a>
              </li> */}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {currentYear} Peeng Monitoring System.
          </div>
          {/* <div className="flex items-center gap-4 text-xs">
            <Link to="/features" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/features" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div> */}
        </div>

      </div>
    </footer>
  );
}

export default MarketingFooter;
