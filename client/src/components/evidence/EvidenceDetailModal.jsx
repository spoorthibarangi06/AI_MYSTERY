import React from 'react';
import { X, Bookmark, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { ChatMessageView } from './ChatMessageView';
import { CctvView } from './CctvView';
import { DocumentView } from './DocumentView';

export const EvidenceDetailModal = ({
  evidence,
  onClose,
  isReviewed,
  isBookmarked,
  onToggleReview,
  onToggleBookmark,
}) => {
  if (!evidence) return null;

  const renderContent = () => {
    switch (evidence.type) {
      case 'message':
        return <ChatMessageView content={evidence.content} />;
      case 'cctv':
        return <CctvView evidence={evidence} />;
      default:
        return <DocumentView evidence={evidence} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121923] border border-[#293444] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#293444] flex items-center justify-between sticky top-0 bg-[#121923]/95 backdrop-blur-md z-10">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18212D] text-[#D6A85F] border border-[#293444]">
              {evidence.evidenceId?.toUpperCase()}
            </span>
            <span className="text-xs font-heading font-semibold text-white truncate max-w-xs sm:max-w-md">
              {evidence.title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleBookmark(evidence.evidenceId)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-[#D6A85F]/20 text-[#D6A85F] border-[#D6A85F]'
                  : 'bg-[#18212D] text-gray-400 border-[#293444] hover:text-white'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Clue'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => onToggleReview(evidence.evidenceId)}
              className={`p-2 rounded-lg border transition-colors ${
                isReviewed
                  ? 'bg-[#34D399]/20 text-[#34D399] border-[#34D399]'
                  : 'bg-[#18212D] text-gray-400 border-[#293444] hover:text-white'
              }`}
              title={isReviewed ? 'Marked as Reviewed' : 'Mark as Reviewed'}
            >
              <CheckCircle className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#18212D] text-gray-400 hover:text-white border border-[#293444] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">{renderContent()}</div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#0B0F14] border-t border-[#293444] flex items-center justify-between text-xs text-[#9CA3AF]">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#D94B4B]" />
              <span>{evidence.discoveryLocation}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>{evidence.timestamp}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
