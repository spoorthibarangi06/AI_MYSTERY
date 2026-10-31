import React from 'react';
import { MessageSquare, Phone, MoreVertical } from 'lucide-react';

export const ChatMessageView = ({ content }) => {
  const senderName = content?.sender || 'Unknown Sender';
  const receiverName = content?.receiver || 'Contact';
  const messages = Array.isArray(content?.messages) ? content.messages : [];

  return (
    <div className="bg-[#0B0F14] border border-[#293444] rounded-2xl overflow-hidden max-w-xl mx-auto flex flex-col h-[420px] shadow-xl">
      {/* WhatsApp-style Header */}
      <div className="bg-[#121923] border-b border-[#293444] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#18212D] border border-[#293444] flex items-center justify-center text-[#25D366]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">{receiverName}</h4>
            <p className="text-[10px] text-emerald-400 font-mono">Encrypted Chat Extraction</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Phone className="w-4 h-4 opacity-40 cursor-not-allowed" />
          <MoreVertical className="w-4 h-4 opacity-40" />
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B0F14] text-xs">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-12 italic">No message logs recovered from device memory.</p>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender === senderName;
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 shadow-md ${
                    isMe
                      ? 'bg-[#18212D] text-white border border-[#293444]'
                      : 'bg-[#293444]/60 text-gray-200 border border-transparent'
                  }`}
                >
                  <p className="text-[10px] font-mono text-[#D6A85F] mb-1 font-semibold">
                    {msg.sender}
                  </p>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-[9px] font-mono text-gray-500 text-right mt-1">
                    {msg.time || '10:00 PM'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer / Input Simulation */}
      <div className="bg-[#121923] border-t border-[#293444] px-4 py-2.5 text-[11px] font-mono text-gray-500 text-center">
        CONFIDENTIAL FORENSIC RECONSTRUCTION • READ ONLY
      </div>
    </div>
  );
};
