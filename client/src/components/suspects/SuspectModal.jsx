import React from 'react';
import { X, Clock, ShieldAlert, FileText, User, AlertCircle } from 'lucide-react';

export const SuspectModal = ({ suspect, onClose, onAccuse }) => {
  if (!suspect) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121923] border border-[#293444] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="relative h-48 bg-[#18212D]">
          <img
            src={suspect.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
            alt={suspect.name}
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121923] via-[#121923]/60 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0B0F14]/70 hover:bg-[#0B0F14] text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[#0B0F14]/80 text-[#D6A85F] border border-[#293444]">
                REF: {suspect.suspectId?.toUpperCase()}
              </span>
              <h2 className="text-2xl font-heading font-bold text-white mt-1">{suspect.name}</h2>
              <p className="text-xs text-[#D94B4B] font-mono uppercase tracking-wider">
                {suspect.occupation} • {suspect.age} YEARS OLD
              </p>
            </div>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-[#F3F4F6]">
          {/* Background */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#9CA3AF] mb-1.5 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>Background & Case Connection</span>
            </h4>
            <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl text-gray-300 leading-relaxed whitespace-pre-line">
              {suspect.background}
            </div>
          </div>

          {/* Stated Alibi */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#9CA3AF] mb-1.5 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>Stated Alibi (Night of Incident)</span>
            </h4>
            <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed border-l-2 border-l-[#D6A85F]">
              "{suspect.alibi}"
            </div>
          </div>

          {/* Apparent Motive */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#9CA3AF] mb-1.5 flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#D94B4B]" />
              <span>Identified Motive & Suspicious Conflicts</span>
            </h4>
            <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed border-l-2 border-l-[#D94B4B]">
              {suspect.motive}
            </div>
          </div>

          {/* Interrogation Notes */}
          {suspect.publicDetails && (
            <div>
              <h4 className="text-xs font-mono uppercase text-[#9CA3AF] mb-1.5 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Interrogation Behavioral Observations</span>
              </h4>
              <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl text-gray-300 leading-relaxed">
                {suspect.publicDetails}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-[#293444] flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] text-gray-300 hover:text-white transition-colors"
            >
              Close Dossier
            </button>
            {onAccuse && (
              <button
                onClick={() => {
                  onClose();
                  onAccuse(suspect);
                }}
                className="px-5 py-2 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white font-semibold shadow-md shadow-[#D94B4B]/20 transition-all"
              >
                Accuse This Suspect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
