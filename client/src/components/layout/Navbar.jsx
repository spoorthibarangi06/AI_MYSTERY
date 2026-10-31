import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, PlusCircle, LayoutDashboard, LogOut, KeyRound } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F14]/90 backdrop-blur-md border-b border-[#293444]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#18212D] border border-[#293444] group-hover:border-[#D94B4B] flex items-center justify-center transition-colors">
            <Shield className="w-5 h-5 text-[#D94B4B]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-lg tracking-wide text-white group-hover:text-[#D94B4B] transition-colors">
                AI MYSTERY ROOM
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#18212D] text-[#D6A85F] border border-[#293444]">
                SSOT v1.0
              </span>
            </div>
            <p className="text-[11px] text-[#9CA3AF] tracking-tight">AI-Powered Detective Investigation Engine</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex items-center space-x-3 sm:space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#9CA3AF] hover:text-white hover:bg-[#18212D] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-[#D6A85F]" />
                <span className="hidden sm:inline">Case Files</span>
              </Link>

              <Link
                to="/create-mystery"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#D94B4B] hover:bg-[#b83b3b] text-white transition-all shadow-sm shadow-[#D94B4B]/30 hover:scale-[1.02]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Case</span>
              </Link>

              <div className="h-5 w-px bg-[#293444]"></div>

              <div className="flex items-center space-x-3 pl-1">
                <span className="text-xs font-mono text-[#D6A85F] hidden md:inline">
                  DET. {user?.name?.toUpperCase()}
                </span>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#18212D] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#9CA3AF] hover:text-white hover:bg-[#18212D] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#18212D] border border-[#293444] hover:border-[#D94B4B] text-white transition-colors"
              >
                <KeyRound className="w-4 h-4 text-[#D94B4B]" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
