import React from 'react';
import { MapPin, Calendar, AlertOctagon, FileText, Target, ShieldCheck } from 'lucide-react';

export const CaseOverview = ({ mystery, onSwitchTab }) => {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner */}
      <div className="bg-[#121923] border border-[#293444] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#D94B4B]/15 text-[#D94B4B] border border-[#D94B4B]/30 font-semibold">
            {mystery.category}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#D6A85F]/15 text-[#D6A85F] border border-[#D6A85F]/30">
            DIFFICULTY: {mystery.difficulty?.toUpperCase()}
          </span>
          <span className="text-xs font-mono text-[#9CA3AF]">
            CASE REF: #{mystery._id?.slice(-8).toUpperCase()}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
          {mystery.title || 'Untitled Case File'}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#293444] text-xs">
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-[#D94B4B] shrink-0 mt-0.5" />
            <div>
              <p className="font-mono uppercase text-[#9CA3AF]">Incident Location</p>
              <p className="font-medium text-white mt-0.5">{mystery.location || 'Crime Scene Perimeter'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Calendar className="w-4 h-4 text-[#D6A85F] shrink-0 mt-0.5" />
            <div>
              <p className="font-mono uppercase text-[#9CA3AF]">Incident Timestamp</p>
              <p className="font-medium text-white mt-0.5">{mystery.incidentDate || 'Night of the Incident'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Description */}
      <div className="bg-[#121923] border border-[#293444] rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-heading font-semibold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#D6A85F]" />
            <span>Incident Briefing & Crime Scene Summary</span>
          </h2>
          <div className="mt-3 text-sm text-[#F3F4F6] leading-relaxed space-y-3 font-normal whitespace-pre-line bg-[#18212D] p-5 rounded-xl border border-[#293444]">
            {mystery.story || mystery.originalPrompt}
          </div>
        </div>

        <div>
          <h2 className="text-base font-heading font-semibold text-white flex items-center space-x-2">
            <Target className="w-4 h-4 text-[#D94B4B]" />
            <span>Investigative Objectives</span>
          </h2>
          <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#9CA3AF]">
            <li className="flex items-start space-x-2 p-3 rounded-lg bg-[#18212D] border border-[#293444]">
              <span className="text-[#D94B4B] font-bold">1.</span>
              <span>Inspect suspect profiles and isolate who had opportunity and inconsistent alibis.</span>
            </li>
            <li className="flex items-start space-x-2 p-3 rounded-lg bg-[#18212D] border border-[#293444]">
              <span className="text-[#D6A85F] font-bold">2.</span>
              <span>Correlate WhatsApp chats with surveillance camera timestamps to spot falsehoods.</span>
            </li>
            <li className="flex items-start space-x-2 p-3 rounded-lg bg-[#18212D] border border-[#293444]">
              <span className="text-[#34D399] font-bold">3.</span>
              <span>Analyze physical clues, audit documents, and witness depositions for hidden motives.</span>
            </li>
            <li className="flex items-start space-x-2 p-3 rounded-lg bg-[#18212D] border border-[#293444]">
              <span className="text-blue-400 font-bold">4.</span>
              <span>Submit your definitive indictment before closing the file.</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 flex flex-wrap gap-3">
          <button
            onClick={() => onSwitchTab('suspects')}
            className="px-4 py-2 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white text-xs font-semibold transition-colors"
          >
            Examine Suspects
          </button>
          <button
            onClick={() => onSwitchTab('evidence')}
            className="px-4 py-2 rounded-xl bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] text-white text-xs font-medium transition-colors"
          >
            Review Evidence Files
          </button>
          <button
            onClick={() => onSwitchTab('timeline')}
            className="px-4 py-2 rounded-xl bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] text-white text-xs font-medium transition-colors"
          >
            Inspect Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
