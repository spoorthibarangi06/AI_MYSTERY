import React, { useState } from 'react';
import { Camera, ZoomIn, ZoomOut, MapPin, Calendar, Tag, ShieldCheck } from 'lucide-react';

export const PhotoEvidenceView = ({ evidence }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const content = evidence.content || {};
  const details = content.details || evidence.description;
  const imageUrl = evidence.assetUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800';

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-[#D94B4B]/10 border border-[#D94B4B]/30 flex items-center justify-center text-[#D94B4B] shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-[#D94B4B] uppercase font-bold">
                  FORENSIC IMAGING & CRIME SCENE PHOTOGRAPHY
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase font-bold">
                  COLOR EXTRACTION
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                {evidence.title}
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{evidence.evidenceId}</p>
            <p className="text-[#D6A85F]">{evidence.timestamp || 'Recorded at Scene'}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>LOCATION: {evidence.discoveryLocation || 'Incident Scene'}</span>
          <span className="text-[#D6A85F]">PHOTOGRAPHIC EVIDENCE SPECIMEN</span>
        </div>
      </div>

      {/* Photo Frame */}
      <div className="relative bg-black border-b border-[#293444] overflow-hidden group">
        <div
          className={`cursor-pointer transition-transform duration-300 flex items-center justify-center ${
            isZoomed ? 'scale-150 py-12' : 'h-72 sm:h-96'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={imageUrl}
            alt={evidence.title}
            className="w-full h-full object-cover contrast-110 group-hover:contrast-125 transition-all"
          />
        </div>

        {/* Yellow Evidence Tent Tag */}
        <div className="absolute top-4 left-4 bg-[#FACC15] text-[#0B0F14] font-black font-mono text-xs px-2.5 py-1 rounded shadow-lg border border-black/40 flex items-center space-x-1.5 pointer-events-none">
          <Tag className="w-3.5 h-3.5" />
          <span>EVIDENCE #{evidence.evidenceId?.slice(-3) || '01'}</span>
        </div>

        {/* Zoom Toggle Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 p-2 rounded-xl bg-[#0B0F14]/80 backdrop-blur-md text-white border border-[#293444] hover:border-white transition-colors flex items-center space-x-1.5 text-xs font-mono"
        >
          {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          <span>{isZoomed ? 'Reset View' : 'Inspect Zoom'}</span>
        </button>
      </div>

      {/* Observations */}
      <div className="p-6 sm:p-8 space-y-4">
        <div>
          <h4 className="font-mono uppercase text-[#D6A85F] text-[11px] font-bold mb-2">
            Forensic Photographer & Ballistics Observations
          </h4>
          <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed whitespace-pre-line">
            {details}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-2.5 bg-[#0B0F14] border-t border-[#293444] flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span>EXIF METADATA: VERIFIED ORIGINAL DIGITAL NEGATIVE</span>
        <span>EVIDENCE FILE #{evidence.evidenceId}</span>
      </div>
    </div>
  );
};
