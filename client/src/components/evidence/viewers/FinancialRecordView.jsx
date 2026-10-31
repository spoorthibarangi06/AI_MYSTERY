import React from 'react';
import { Landmark, ArrowUpRight, ArrowDownLeft, AlertCircle, DollarSign } from 'lucide-react';

export const FinancialRecordView = ({ evidence }) => {
  const content = evidence.content || {};
  const institution = content.institution || 'Zurich Heritage Bank';
  const accountName = content.accountName || 'Private Account Holder';
  const accountNumber = content.accountNumber || 'CH93-****-****-4912';
  const transactions = Array.isArray(content.transactions) ? content.transactions : [];
  const forensicNotes = content.forensicNotes || evidence.description;

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#18212D] border-b border-[#293444] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                  {institution}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase font-bold">
                  OFFICIAL AUDIT LEDGER
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-white mt-0.5 tracking-tight">
                FORENSIC FINANCIAL STATEMENT
              </h3>
            </div>
          </div>

          <div className="sm:text-right font-mono text-[11px] text-[#9CA3AF]">
            <p className="text-white font-bold">{accountNumber}</p>
            <p className="text-[#D6A85F]">{accountName}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#293444]/60 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>SOURCE: {evidence.source || 'Financial Intelligence Subpoena'}</span>
          <span className="text-[#D6A85F]">ANTI-MONEY LAUNDERING AUDIT</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-4">
        {forensicNotes && (
          <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed border-l-4 border-l-emerald-400">
            <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold block mb-1">
              Forensic Accounting Findings:
            </span>
            {forensicNotes}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-[#293444] bg-[#0E141C]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-[#18212D] text-[#9CA3AF] border-b border-[#293444] text-[10px] uppercase">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Transaction Description</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-3 text-right">Balance</th>
                <th className="py-3 px-3 text-center">Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#293444]/60 text-gray-200">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500 italic">
                    No transactions recorded on this manifest.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => {
                  const isCredit = tx.type?.toLowerCase().includes('credit');
                  const isFlagged = tx.flagged;

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#18212D]/60 transition-colors ${
                        isFlagged ? 'bg-[#D94B4B]/10' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-white font-semibold">{tx.date}</td>
                      <td className="py-3 px-3 text-gray-200">{tx.description}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center space-x-1 text-[10px] font-bold ${
                            isCredit ? 'text-[#34D399]' : 'text-gray-400'
                          }`}
                        >
                          {isCredit ? (
                            <ArrowDownLeft className="w-3 h-3 text-[#34D399]" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3 text-gray-400" />
                          )}
                          <span>{tx.type}</span>
                        </span>
                      </td>
                      <td
                        className={`py-3 px-3 text-right font-bold ${
                          isCredit ? 'text-[#34D399]' : 'text-white'
                        }`}
                      >
                        {tx.amount}
                      </td>
                      <td className="py-3 px-3 text-right text-[#9CA3AF]">{tx.balance}</td>
                      <td className="py-3 px-3 text-center">
                        {isFlagged ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#D94B4B]/20 text-[#D94B4B] border border-[#D94B4B]/40 text-[9px] font-bold">
                            <AlertCircle className="w-2.5 h-2.5" />
                            <span>SUSPICIOUS</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-500">CLEARED</span>
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
        <span>BANK COMPLIANCE: SWISS BANKING SECRECY WAIVER APPLIED</span>
        <span>EVIDENCE FILE #{evidence.evidenceId}</span>
      </div>
    </div>
  );
};
