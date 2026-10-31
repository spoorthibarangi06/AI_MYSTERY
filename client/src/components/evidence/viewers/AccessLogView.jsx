import React from 'react';
import { KeyRound, CheckCircle2, XCircle, ShieldCheck, MapPin } from 'lucide-react';

export const AccessLogView = ({ evidence }) => {
  const content = evidence.content || {};
  const facility = content.facility || 'Facility Security Zone';
  const terminalId = content.terminalId || 'Reader Bank #01';
  const logs = Array.isArray(content.logs) ? content.logs : [];
  const notes = content.notes || evidence.description;

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold">
                  BIOMETRIC & RFID ACCESS CONTROL
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase font-bold">
                  DOOR CONTROLLER LOG
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                KEYCARD & BIO-AUTHENTICATION MANIFEST
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{terminalId}</p>
            <p className="text-[#D6A85F] truncate max-w-[200px]">{facility}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>SOURCE: {evidence.source || 'Physical Security Server'}</span>
          <span className="text-[#D6A85F]">AUDIT TRAIL LOG</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-4">
        {notes && (
          <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed border-l-4 border-l-purple-400">
            <span className="font-mono text-[10px] uppercase text-purple-400 font-bold block mb-1">
              Access Pattern Analysis:
            </span>
            {notes}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-[#293444] bg-[#0E141C]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-[#18212D] text-[#9CA3AF] border-b border-[#293444] text-[10px] uppercase">
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Badge ID</th>
                <th className="py-3 px-3">Cardholder Name</th>
                <th className="py-3 px-3">Access Zone / Portal</th>
                <th className="py-3 px-3 text-center">Authorization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293444]/60 text-gray-200">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 italic">
                    No electronic access attempts logged during this period.
                  </td>
                </tr>
              ) : (
                logs.map((log, idx) => {
                  const isGranted = log.status?.toUpperCase() === 'GRANTED';

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#18212D]/60 transition-colors ${
                        !isGranted ? 'bg-[#EF4444]/10' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-white font-semibold">{log.time}</td>
                      <td className="py-3 px-3 text-[#D6A85F]">{log.badgeId}</td>
                      <td className="py-3 px-3 font-medium text-white">{log.userName}</td>
                      <td className="py-3 px-3 text-[#9CA3AF]">{log.door}</td>
                      <td className="py-3 px-3 text-center">
                        {isGranted ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#34D399] border border-emerald-500/40 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>GRANTED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 text-[10px] font-bold">
                            <XCircle className="w-3 h-3" />
                            <span>DENIED</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-2.5 bg-[#0B0F14] border-t border-[#293444] flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span>SECURITY ENCRYPTION: SHA-256 CONTROLLER CHECKSUM OK</span>
        <span>EVIDENCE FILE #{evidence.evidenceId}</span>
      </div>
    </div>
  );
};
