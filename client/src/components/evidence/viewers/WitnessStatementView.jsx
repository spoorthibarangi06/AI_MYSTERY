import React from 'react';
import { UserCheck, Clock, MapPin, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const WitnessStatementView = ({ evidence }) => {
  const content = evidence.content || {};
  const witnessName = content.witnessName || 'Witness of Record';
  const witnessRole = content.witnessRole || 'Eyewitness / Key Personnel';
  const interviewTime = content.interviewTime || evidence.timestamp;
  const investigator = content.investigator || 'Detective in Charge';
  const statement = content.statement || evidence.description;
  const discrepancies = content.discrepancies || '';

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-[#D6A85F]/10 border border-[#D6A85F]/30 flex items-center justify-center text-[#D6A85F] shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-[#D6A85F] uppercase font-bold">
                  DETECTIVE INTERROGATION & DEPOSITION DIVISION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D6A85F]/15 text-[#D6A85F] border border-[#D6A85F]/30 uppercase font-bold">
                  RECORDED TESTIMONY
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                FORMAL WITNESS DEPOSITION
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{evidence.evidenceId}</p>
            <p className="text-[#D6A85F]">{interviewTime}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>SOURCE: {evidence.source || 'Formal Interrogation Division'}</span>
          <span className="text-[#D6A85F]">SWORN DEPOSITION ARCHIVE</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Deponent Metadata Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl">
            <span className="text-[#9CA3AF] text-[9px] uppercase block">Deponent / Witness</span>
            <span className="text-white font-semibold truncate block mt-0.5">{witnessName}</span>
          </div>

          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl">
            <span className="text-[#9CA3AF] text-[9px] uppercase block">Role / Capacity</span>
            <span className="text-[#D6A85F] font-semibold truncate block mt-0.5">{witnessRole}</span>
          </div>

          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl">
            <span className="text-[#9CA3AF] text-[9px] uppercase block">Interrogator</span>
            <span className="text-white font-semibold truncate block mt-0.5">{investigator}</span>
          </div>
        </div>

        {/* Deposition Text */}
        <div>
          <h4 className="font-mono uppercase text-[#D6A85F] text-[11px] tracking-wider mb-2 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Sworn Statement Transcript</span>
          </h4>
          <div className="p-6 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed italic border-l-4 border-l-[#D6A85F] text-sm whitespace-pre-line">
            "{statement}"
          </div>
        </div>

        {/* Noted Discrepancies */}
        {discrepancies && (
          <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl space-y-1.5">
            <h5 className="font-mono uppercase text-[#D94B4B] text-[10px] tracking-wider font-bold flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Interrogator Behavioral & Statement Anomaly Notes:</span>
            </h5>
            <p className="text-gray-300 leading-relaxed text-xs">{discrepancies}</p>
          </div>
        )}

        {/* Signature Verification */}
        <div className="p-4 bg-[#18212D]/60 border border-[#293444] rounded-xl flex items-center justify-between text-[11px] font-mono text-gray-400">
          <div>
            <p className="text-gray-300 font-semibold">WITNESS VERIFICATION ACKNOWLEDGMENT</p>
            <p className="text-[10px] text-gray-500">I certify under penalty of perjury that this deposition is true and factual.</p>
          </div>
          <div className="text-right">
            <span className="font-serif italic text-base text-[#D6A85F] border-b border-gray-600 pb-1 px-4 block">
              {witnessName}
            </span>
            <span className="text-[9px] text-gray-500 uppercase">Electronic Signature Stamp</span>
          </div>
        </div>
      </div>
    </div>
  );
};
