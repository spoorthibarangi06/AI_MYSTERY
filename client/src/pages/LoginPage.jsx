import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#121923] border border-[#293444] rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#18212D] border border-[#D94B4B]/40 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#D94B4B]">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Detective Access Portal</h2>
          <p className="text-xs text-[#9CA3AF] mt-1 font-mono">ENTER YOUR INVESTIGATOR CREDENTIALS</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center space-x-2 text-xs text-[#EF4444]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">Investigator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="detective@precinct.org"
                className="w-full pl-9 pr-4 py-2.5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D94B4B] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">Security Passcode</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D94B4B] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] disabled:opacity-50 text-white font-medium text-sm transition-all shadow-md shadow-[#D94B4B]/20 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Enter Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#293444] text-center text-xs text-[#9CA3AF]">
          <span>New investigator without clearance? </span>
          <Link to="/register" className="text-[#D6A85F] hover:underline font-medium">
            Register your credentials
          </Link>
        </div>
      </div>
    </div>
  );
};
