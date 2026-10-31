import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, Radio, AlertCircle, ShieldAlert } from 'lucide-react';

export const CallLogView = ({ evidence }) => {
  const content = evidence.content || {};
  const subscriber = content.subscriber || 'Suspect of Interest';
  const phoneNumber = content.phoneNumber || '+1 (555) 019-XXXX';
  const carrier = content.carrier || 'Telecommunications Carrier Network';
  const records = Array.isArray(content.records) ? content.records : [];

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-[#D6A85F]/10 border border-[#D6A85F]/30 flex items-center justify-center text-[#D6A85F] shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-[#D6A85F] uppercase font-bold">
                  TELECOMMUNICATIONS SUBPOENA DIVISION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 uppercase font-bold">
                  CALL DETAIL RECORD (CDR)
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                CELLULAR CALL & TOWER MANIFEST
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{phoneNumber}</p>
            <p className="text-[#D6A85F]">{carrier}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>SUBSCRIBER: {subscriber}</span>
          <span className="text-[#D6A85F]">WARRANT COMPLIANCE LOG</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="p-6 sm:p-8 space-y-4">
        {evidence.description && (
          <p className="text-xs text-[#9CA3AF] bg-[#18212D] p-3 rounded-xl border border-[#293444]">
            {evidence.description}
          </p>
        )}

        <div className="overflow-x-auto rounded-xl border border-[#293444] bg-[#0E141C]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-[#18212D] text-[#9CA3AF] border-b border-[#293444] text-[10px] uppercase">
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Number / Alias</th>
                <th className="py-3 px-3">Duration</th>
                <th className="py-3 px-3">Cell Tower</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293444]/60 text-gray-200">
              {records.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500 italic">
                    No intercepted call logs recorded in this window.
                  </td>
                </tr>
              ) : (
                records.map((rec, idx) => {
                  const isIncoming = rec.type?.toLowerCase().includes('in');
                  const isFlagged = rec.flagged;

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#18212D]/60 transition-colors ${
                        isFlagged ? 'bg-[#D94B4B]/10' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-white font-semibold">{rec.time}</td>
                      <td className="py-3 px-3">
                        <span className="flex items-center space-x-1">
                          {isIncoming ? (
                            <PhoneIncoming className="w-3.5 h-3.5 text-blue-400" />
                          ) : (
                            <PhoneOutgoing className="w-3.5 h-3.5 text-[#34D399]" />
                          )}
                          <span>{rec.type}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-white font-medium block">{rec.number}</span>
                        {rec.contact && <span className="text-[10px] text-[#D6A85F]">{rec.contact}</span>}
                      </td>
                      <td className="py-3 px-3 text-[#9CA3AF]">{rec.duration}</td>
                      <td className="py-3 px-3 text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Radio className="w-3 h-3 text-[#D6A85F]" />
                          <span className="truncate max-w-[130px]">{rec.cellTower || 'Cell Tower 01'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {isFlagged ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#D94B4B]/20 text-[#D94B4B] border border-[#D94B4B]/40 text-[9px] font-bold">
                            <AlertCircle className="w-2.5 h-2.5" />
                            <span>SUSPICIOUS</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-500">ROUTINE</span>
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
        <span>JUDICIAL INTERCEPT REF: TEL-2026-SUBPOENA</span>
        <span>EVIDENCE FILE #{evidence.evidenceId}</span>
      </div>
    </div>
  );
};
