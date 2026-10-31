import React from 'react';
import { Eye, ShieldAlert, Clock, User } from 'lucide-react';

export const SuspectCard = ({ suspect, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(suspect)}
      className="bg-[#121923] border border-[#293444] hover:border-[#D6A85F] rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.01] group flex flex-col justify-between"
    >
      <div>
        {/* Profile Image with noir styling */}
        <div className="relative h-48 w-full bg-[#18212D] overflow-hidden">
          <img
            src={suspect.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
            alt={suspect.name}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121923] via-transparent to-transparent"></div>
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0B0F14]/80 backdrop-blur-sm border border-[#293444] text-[10px] font-mono text-[#D6A85F]">
            REF: {suspect.suspectId?.toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#D6A85F] transition-colors">
              {suspect.name}
            </h3>
            <span className="text-xs text-[#9CA3AF] font-mono">{suspect.age} YRS</span>
          </div>
          <p className="text-xs text-[#D94B4B] font-mono uppercase tracking-wide mt-0.5">
            {suspect.occupation}
          </p>

          <p className="text-xs text-[#9CA3AF] mt-3 line-clamp-2 leading-relaxed">
            {suspect.background}
          </p>

          <div className="mt-4 pt-3 border-t border-[#293444] space-y-2 text-xs">
            <div className="flex items-start space-x-2">
              <Clock className="w-3.5 h-3.5 text-[#D6A85F] shrink-0 mt-0.5" />
              <p className="text-gray-300 line-clamp-1">
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase">Alibi: </span>
                {suspect.alibi}
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[#D94B4B] shrink-0 mt-0.5" />
              <p className="text-gray-300 line-clamp-1">
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase">Motive: </span>
                {suspect.motive}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button className="w-full py-2 rounded-xl bg-[#18212D] group-hover:bg-[#D6A85F] group-hover:text-[#0B0F14] text-xs font-semibold text-white transition-colors flex items-center justify-center space-x-1.5">
          <Eye className="w-3.5 h-3.5" />
          <span>Examine Suspect Dossier</span>
        </button>
      </div>
    </div>
  );
};
