import React from 'react';
import { PenTool, MapPin, Search, FileText } from 'lucide-react';

export const HandwrittenNoteView = ({ evidence }) => {
  const content = evidence.content || {};
  const discoveryPlace = content.discoveryPlace || evidence.discoveryLocation || 'Incident Scene';
  const handwritingAnalysis = content.handwritingAnalysis || 'Hastily penned cursive writing.';
  const transcription = content.transcription || content.details || evidence.description;
  const paperType = content.paperType || 'Paper Scrap';

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                  PHYSICAL EVIDENCE RECOVERY UNIT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase font-bold">
                  HANDWRITING EXAMINATION
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                RECOVERED HANDWRITTEN ARTIFACT
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{evidence.evidenceId}</p>
            <p className="text-[#D6A85F]">{evidence.timestamp || 'Recovered Post-Incident'}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>MEDIUM: {paperType}</span>
          <span className="text-[#D6A85F]">FORENSIC DOCUMENT RECORD</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Physical Paper Note Presentation Box */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-[#FFFBEB] text-[#1E293B] shadow-inner border border-amber-300 font-serif text-base leading-relaxed select-text">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-amber-800/60 uppercase border border-amber-800/30 px-2 py-0.5 rounded bg-amber-100/50">
            ARTIFACT SPECIMEN
          </div>
          <p className="italic whitespace-pre-line text-lg font-normal tracking-wide text-amber-950">
            "{transcription}"
          </p>
        </div>

        {/* Discovery & Handwriting Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl space-y-1.5 text-xs">
            <span className="font-mono text-[10px] uppercase text-[#D6A85F] flex items-center space-x-1.5 font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#D94B4B]" />
              <span>Location of Recovery</span>
            </span>
            <p className="text-gray-300 leading-relaxed">{discoveryPlace}</p>
          </div>

          <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl space-y-1.5 text-xs">
            <span className="font-mono text-[10px] uppercase text-blue-400 flex items-center space-x-1.5 font-bold">
              <Search className="w-3.5 h-3.5" />
              <span>Forensic Handwriting Analysis</span>
            </span>
            <p className="text-gray-300 leading-relaxed">{handwritingAnalysis}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-2.5 bg-[#0B0F14] border-t border-[#293444] flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span>CHAIN OF CUSTODY: LOCKED IN EVIDENCE REPOSITORY</span>
        <span>EVIDENCE FILE #{evidence.evidenceId}</span>
      </div>
    </div>
  );
};
