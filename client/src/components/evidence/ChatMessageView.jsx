import React from 'react';
import { MessageSquare, Phone, MoreVertical, CheckCheck, Lock } from 'lucide-react';

export const ChatMessageView = ({ content }) => {
  const senderName = content?.sender || 'Unknown Sender';
  const receiverName = content?.receiver || 'Contact';
  const messages = Array.isArray(content?.messages) ? content.messages : [];

  return (
    <div className="bg-[#0B0F14] border border-[#293444] rounded-2xl overflow-hidden max-w-xl mx-auto flex flex-col h-[460px] shadow-2xl relative font-sans text-xs">
      {/* WhatsApp Header */}
      <div className="bg-[#121923] border-b border-[#293444] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#18212D] border border-[#293444] flex items-center justify-center text-[#25D366] font-bold">
            {receiverName.charAt(0)}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">{receiverName}</h4>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Online • Encrypted Subpoena</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-gray-400">
          <Phone className="w-4 h-4 opacity-40 cursor-not-allowed" />
          <MoreVertical className="w-4 h-4 opacity-40" />
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B0F14]/95 text-xs">
        {/* Date / Security Notice Pill */}
        <div className="flex justify-center my-2">
          <span className="px-3 py-1 rounded-full bg-[#18212D] border border-[#293444] text-[10px] font-mono text-[#D6A85F] flex items-center space-x-1 shadow-sm">
            <Lock className="w-2.5 h-2.5" />
            <span>EXTRACTED CHAT HISTORY • END-TO-END ENCRYPTED</span>
          </span>
        </div>

        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-16 italic">
            No active message logs found in device cache.
          </p>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender === senderName;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 shadow-md ${
                    isMe
                      ? 'bg-[#1e2a3a] text-white border border-[#293444] rounded-br-sm'
                      : 'bg-[#18212D] text-gray-200 border border-[#293444] rounded-bl-sm'
                  }`}
                >
                  <p className="text-[10px] font-mono text-[#D6A85F] mb-1 font-semibold">
                    {msg.sender}
                  </p>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div className="flex items-center justify-end space-x-1 text-[9px] font-mono text-gray-400 mt-1">
                    <span>{msg.time || '10:00 PM'}</span>
                    <CheckCheck className="w-3 h-3 text-[#38bdf8]" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer / Input Simulation */}
      <div className="bg-[#121923] border-t border-[#293444] px-4 py-2.5 text-[10px] font-mono text-gray-500 flex items-center justify-between">
        <span>DEVICE EXTRACTION: CELLEBRITE FORENSICS v10.4</span>
        <span className="text-gray-400">READ-ONLY EVIDENCE RECORD</span>
      </div>
    </div>
  );
};
