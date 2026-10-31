import React from 'react';
import { Activity, Clock, FileSpreadsheet, AlertTriangle, User, Award } from 'lucide-react';

export const MedicalReportView = ({ evidence }) => {
  const content = evidence.content || {};
  const examId = content.examId || evidence.metadata?.examId || 'ME-2026-FORENSIC';
  const examiner = content.examinerName || 'Chief Forensic Pathologist';
  const subject = content.subjectName || 'Victim / Subject of Inquiry';
  const traumaTime = content.estimatedTimeOfTrauma || evidence.timestamp;
  const cause = content.causeOfTraumaOrDeath || content.cause || 'Physical Trauma / Infiltration';
  const externalInjuries = content.externalInjuries || content.injuries || '';
  const toxicology = content.toxicology || '';
  const notes = content.notes || evidence.description;

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Clinical Header */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-bold">
                  OFFICE OF THE CHIEF MEDICAL EXAMINER
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 font-bold uppercase">
                  FORENSIC AUTOPSY / CLINICAL REPORT
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                POST-MORTEM & TOXICOLOGY FINDINGS
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{examId}</p>
            <p className="text-teal-400">{evidence.timestamp || 'Post-Incident'}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>PATHOLOGY UNIT REF: FORENSIC TOXICOLOGY & TRAUMA</span>
          <span className="text-[#D6A85F]">FICTIONAL MEDICAL DOSSIER</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Subject & Timing Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl flex items-center space-x-2.5">
            <User className="w-4 h-4 text-[#D6A85F] shrink-0" />
            <div>
              <span className="text-[#9CA3AF] text-[9px] uppercase block">Subject / Patient</span>
              <span className="text-white font-semibold truncate block max-w-[150px]">{subject}</span>
            </div>
          </div>

          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl flex items-center space-x-2.5">
            <Clock className="w-4 h-4 text-[#D94B4B] shrink-0" />
            <div>
              <span className="text-[#9CA3AF] text-[9px] uppercase block">Est. Time of Trauma</span>
              <span className="text-white font-semibold truncate block max-w-[150px]">{traumaTime}</span>
            </div>
          </div>

          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl flex items-center space-x-2.5">
            <Award className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <span className="text-[#9CA3AF] text-[9px] uppercase block">Lead Examiner</span>
              <span className="text-white font-semibold truncate block max-w-[150px]">{examiner}</span>
            </div>
          </div>
        </div>

        {/* Cause of Trauma / Injury */}
        <div className="p-5 bg-[#18212D] border border-teal-500/30 rounded-xl space-y-1.5 border-l-4 border-l-teal-400">
          <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold">
            PRIMARY PATHOLOGICAL FINDING / CAUSE OF TRAUMA
          </span>
          <p className="text-sm font-semibold text-white leading-relaxed">{cause}</p>
        </div>

        {/* Detailed Findings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* External Injuries */}
          {externalInjuries && (
            <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl space-y-2">
              <h4 className="font-mono uppercase text-[#D6A85F] text-[11px] font-bold">
                External Trauma Examination
              </h4>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{externalInjuries}</p>
            </div>
          )}

          {/* Toxicology */}
          {toxicology && (
            <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl space-y-2">
              <h4 className="font-mono uppercase text-[#D94B4B] text-[11px] font-bold">
                Toxicology & Chemical Assay
              </h4>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{toxicology}</p>
            </div>
          )}
        </div>

        {/* Examiner's Observations & Synthesis */}
        <div>
          <h4 className="font-mono uppercase text-[#9CA3AF] text-[11px] tracking-wider mb-2 flex items-center space-x-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
            <span>Pathology Synthesis & Chronological Correlation</span>
          </h4>
          <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed whitespace-pre-line">
            {notes}
          </div>
        </div>

        {/* Official Medical Examiner Seal */}
        <div className="pt-4 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>EXAMINATION STATUS: COMPLETE & DECLASSIFIED FOR CASE PROSECUTION</span>
          <span className="font-serif italic text-teal-300/80">Certified by {examiner}</span>
        </div>
      </div>
    </div>
  );
};
