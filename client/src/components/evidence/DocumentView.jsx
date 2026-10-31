import React from 'react';
import { FileText, UserCheck, MapPin, Calendar, Fingerprint } from 'lucide-react';

export const DocumentView = ({ evidence }) => {
  const isStatement = evidence.type === 'witness_statement';
  const content = evidence.content || {};

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[#293444] pb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#18212D] text-[#D6A85F] border border-[#293444]">
            {evidence.type?.replace('_', ' ').toUpperCase()}
          </span>
          <h3 className="text-xl font-heading font-bold text-white mt-2">{evidence.title}</h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#18212D] border border-[#293444] flex items-center justify-center text-[#D94B4B]">
          {isStatement ? <UserCheck className="w-5 h-5" /> : <Fingerprint className="w-5 h-5" />}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#9CA3AF]">
        <div className="flex items-center space-x-1.5 bg-[#18212D] p-2.5 rounded-lg border border-[#293444]">
          <MapPin className="w-3.5 h-3.5 text-[#D94B4B]" />
          <span className="truncate">{evidence.discoveryLocation || 'Scene'}</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#18212D] p-2.5 rounded-lg border border-[#293444]">
          <Calendar className="w-3.5 h-3.5 text-[#D6A85F]" />
          <span className="truncate">{evidence.timestamp || 'Recorded'}</span>
        </div>
      </div>

      {/* Main Content */}
      {isStatement ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>WITNESS: {content.witnessName || 'Official Deponent'}</span>
            <span>INTERVIEW TIME: {content.interviewTime || evidence.timestamp}</span>
          </div>
          <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-gray-200 leading-relaxed italic border-l-4 border-l-[#D6A85F]">
            "{content.statement || evidence.description}"
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {evidence.assetUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[#293444]">
              <img
                src={evidence.assetUrl}
                alt={evidence.title}
                className="w-full h-full object-cover contrast-110"
              />
            </div>
          )}
          <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
            <p className="font-mono text-[#D6A85F] text-[10px] uppercase mb-1">Forensic Analysis</p>
            {content.details || evidence.description}
          </div>
        </div>
      )}
    </div>
  );
};
