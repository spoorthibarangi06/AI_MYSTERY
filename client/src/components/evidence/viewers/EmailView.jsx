import React from 'react';
import { Mail, Paperclip, Reply, Forward, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

export const EmailView = ({ evidence }) => {
  const content = evidence.content || {};
  const from = content.from || 'sender@enterprise.org';
  const to = content.to || 'recipient@enterprise.org';
  const cc = content.cc || '';
  const subject = content.subject || evidence.title;
  const date = content.date || evidence.timestamp;
  const body = content.body || evidence.description;
  const attachments = Array.isArray(content.attachments) ? content.attachments : [];

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-2xl relative font-sans text-xs text-[#F3F4F6]">
      {/* Mail Window Chrome Header */}
      <div className="bg-[#18212D] border-b border-[#293444] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-white text-sm truncate max-w-sm sm:max-w-md">
              {subject}
            </h4>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#9CA3AF]">
              <span>SUBPOENAED EMAIL EXTRACTION</span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-[#34D399]">
                <ShieldCheck className="w-3 h-3" />
                <span>DKIM VERIFIED</span>
              </span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-gray-400">
          <button className="p-1.5 rounded-lg bg-[#0B0F14] border border-[#293444] hover:text-white transition-colors" title="Reply">
            <Reply className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-lg bg-[#0B0F14] border border-[#293444] hover:text-white transition-colors" title="Forward">
            <Forward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Header Info Details */}
      <div className="px-6 py-4 bg-[#0E141C] border-b border-[#293444] space-y-1.5 font-mono text-[11px]">
        <div className="flex items-center space-x-2">
          <span className="text-[#9CA3AF] w-12 text-right">FROM:</span>
          <span className="text-white font-medium bg-[#18212D] px-2 py-0.5 rounded border border-[#293444]">
            {from}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[#9CA3AF] w-12 text-right">TO:</span>
          <span className="text-gray-300 bg-[#18212D] px-2 py-0.5 rounded border border-[#293444]">
            {to}
          </span>
        </div>

        {cc && (
          <div className="flex items-center space-x-2">
            <span className="text-[#9CA3AF] w-12 text-right">CC:</span>
            <span className="text-gray-400 bg-[#18212D] px-2 py-0.5 rounded border border-[#293444]">
              {cc}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-[#9CA3AF] w-12 text-right">DATE:</span>
          <span className="text-[#D6A85F]">{date}</span>
        </div>
      </div>

      {/* Email Body */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="p-6 bg-[#18212D] border border-[#293444] rounded-xl text-gray-200 leading-relaxed whitespace-pre-line text-sm font-sans">
          {body}
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="pt-2">
            <h5 className="font-mono uppercase text-[#9CA3AF] text-[10px] tracking-wider mb-2 flex items-center space-x-1.5">
              <Paperclip className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>Extracted Email Attachments ({attachments.length})</span>
            </h5>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-lg bg-[#18212D] border border-[#293444] flex items-center space-x-2 text-xs font-mono text-gray-300 hover:border-[#D6A85F] transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5 text-[#D6A85F]" />
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-2.5 bg-[#0B0F14] border-t border-[#293444] flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span>MAIL SERVER SOURCE: {evidence.source || 'Exchange Forensics Server'}</span>
        <span>EVIDENCE FILE #{evidence.evidenceId}</span>
      </div>
    </div>
  );
};
