import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, User, AlertCircle, ArrowRight } from 'lucide-react';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Passcode must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Security passcodes do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#121923] border border-[#293444] rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#18212D] border border-[#D6A85F]/40 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#D6A85F]">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Investigator Registration</h2>
          <p className="text-xs text-[#9CA3AF] mt-1 font-mono">ENROLL IN THE DETECTIVE FORCE</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center space-x-2 text-xs text-[#EF4444]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">Investigator Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Detective Sarah Connor"
                className="w-full pl-9 pr-4 py-2.5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A85F] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">Official Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s.connor@precinct.org"
                className="w-full pl-9 pr-4 py-2.5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A85F] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
              Passcode (min 8 characters)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A85F] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">Confirm Passcode</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A85F] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-[#D6A85F] hover:bg-[#c2964e] disabled:opacity-50 text-[#0B0F14] font-semibold text-sm transition-all shadow-md shadow-[#D6A85F]/20 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#0B0F14] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Issue Detective Badge</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#293444] text-center text-xs text-[#9CA3AF]">
          <span>Already hold investigator clearance? </span>
          <Link to="/login" className="text-[#D94B4B] hover:underline font-medium">
            Sign In to Terminal
          </Link>
        </div>
      </div>
    </div>
  );
};
