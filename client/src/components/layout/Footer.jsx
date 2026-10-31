import React from 'react';
import { Shield, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F14] border-t border-[#293444] text-[#9CA3AF] text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#D94B4B]" />
          <span className="font-heading font-semibold text-white">AI MYSTERY ROOM</span>
          <span>© 2026. All scenarios and evidence are AI-generated fiction.</span>
        </div>

        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1 text-[#D6A85F]">
            <Lock className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL EVIDENCE ENCRYPTION</span>
          </span>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            Investigation Protocol
          </a>
          <span className="text-[#293444]">•</span>
          <span className="text-gray-500">Spec-Driven MERN Architecture</span>
        </div>
      </div>
    </footer>
  );
};
