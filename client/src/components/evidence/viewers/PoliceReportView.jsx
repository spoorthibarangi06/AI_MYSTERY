import React from 'react';
import { Shield, FileText, AlertCircle, CheckCircle2, MapPin, Calendar, UserCheck } from 'lucide-react';

export const PoliceReportView = ({ evidence }) => {
  const content = evidence.content || {};
  const caseNumber = content.caseNumber || evidence.metadata?.caseNumber || 'PD-2026-CASE';
  const officer = content.reportingOfficer || content.investigator || 'Lead Investigating Detective';
  const summary = content.incidentSummary || evidence.description;
  const observations = Array.isArray(content.primaryObservations) ? content.primaryObservations : [];
  const conclusions = content.officerConclusions || content.conclusions || '';
  const status = content.status || 'OFFICIAL POLICE DOSSIER';

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Header Banner */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-[#0B0F14] border border-[#D94B4B]/40 flex items-center justify-center text-[#D94B4B] shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-[#D94B4B] uppercase font-bold">
                  METROPOLITAN POLICE DEPARTMENT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D94B4B]/15 text-[#D94B4B] border border-[#D94B4B]/30 uppercase font-bold">
                  {status}
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                CRIMINAL INVESTIGATION REPORT
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{caseNumber}</p>
            <p className="text-[#D6A85F]">{evidence.timestamp || 'Night of Incident'}</p>
          </div>
        </div>

        {/* Fictional Disclaimer Watermark Pill */}
        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>SOURCE: {evidence.source || 'Metropolitan Forensic Bureau'}</span>
          <span className="text-[#D6A85F]">FICTIONAL DETECTIVE CASE RECORD</span>
        </div>
      </div>

      {/* Report Form Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Officer & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl flex items-center space-x-2.5">
            <UserCheck className="w-4 h-4 text-[#D6A85F] shrink-0" />
            <div>
              <span className="text-[#9CA3AF] text-[9px] uppercase block">Investigating Officer</span>
              <span className="text-white font-semibold">{officer}</span>
            </div>
          </div>

          <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl flex items-center space-x-2.5">
            <MapPin className="w-4 h-4 text-[#D94B4B] shrink-0" />
            <div>
              <span className="text-[#9CA3AF] text-[9px] uppercase block">Location of Incident</span>
              <span className="text-white font-semibold truncate block max-w-[200px]">
                {evidence.discoveryLocation || 'Incident Scene'}
              </span>
            </div>
          </div>
        </div>

        {/* Incident Summary */}
        <div>
          <h4 className="font-mono uppercase text-[#D6A85F] text-[11px] tracking-wider mb-2 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Incident Briefing & Intake Narrative</span>
          </h4>
          <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed whitespace-pre-line border-l-4 border-l-[#D94B4B]">
            {summary}
          </div>
        </div>

        {/* Primary Observations */}
        {observations.length > 0 && (
          <div>
            <h4 className="font-mono uppercase text-[#9CA3AF] text-[11px] tracking-wider mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Forensic & Scene Observations</span>
            </h4>
            <div className="space-y-2">
              {observations.map((obs, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#18212D] border border-[#293444] rounded-xl flex items-start space-x-3 text-gray-300"
                >
                  <span className="text-[#D6A85F] font-mono font-bold shrink-0">#{idx + 1}</span>
                  <span className="leading-relaxed">{obs}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conclusions & Sign-off */}
        {conclusions && (
          <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl space-y-3">
            <h4 className="font-mono uppercase text-blue-400 text-[11px] tracking-wider">
              Investigator Preliminary Assessment
            </h4>
            <p className="text-gray-300 leading-relaxed italic">"{conclusions}"</p>
            <div className="pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>OFFICIAL SIGN-OFF: VERIFIED</span>
              <span className="font-serif italic text-gray-400">{officer}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
