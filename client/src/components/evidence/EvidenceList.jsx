import React, { useState } from 'react';
import {
  MessageSquare,
  Video,
  UserCheck,
  FileText,
  Bookmark,
  CheckCircle,
  Eye,
  Filter,
} from 'lucide-react';

export const EvidenceList = ({
  evidenceList = [],
  reviewedIds = [],
  bookmarkedIds = [],
  onInspect,
  onToggleReview,
  onToggleBookmark,
}) => {
  const [filterType, setFilterType] = useState('all');

  const getEvidenceIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-4 h-4 text-[#25D366]" />;
      case 'cctv':
        return <Video className="w-4 h-4 text-[#D94B4B]" />;
      case 'witness_statement':
        return <UserCheck className="w-4 h-4 text-[#D6A85F]" />;
      default:
        return <FileText className="w-4 h-4 text-blue-400" />;
    }
  };

  const filtered = evidenceList.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'bookmarked') return bookmarkedIds.includes(item.evidenceId);
    if (filterType === 'reviewed') return reviewedIds.includes(item.evidenceId);
    return item.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#293444] pb-4">
        {[
          { key: 'all', label: `All Clues (${evidenceList.length})` },
          { key: 'message', label: 'Messages' },
          { key: 'cctv', label: 'Surveillance / CCTV' },
          { key: 'witness_statement', label: 'Witness Statements' },
          { key: 'document', label: 'Documents / Items' },
          { key: 'bookmarked', label: `Bookmarked (${bookmarkedIds.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filterType === tab.key
                ? 'bg-[#D94B4B] text-white font-semibold'
                : 'bg-[#121923] text-[#9CA3AF] hover:text-white border border-[#293444]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-gray-500 bg-[#121923] border border-[#293444] rounded-2xl">
          No evidence records found under this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isRev = reviewedIds.includes(item.evidenceId);
            const isBm = bookmarkedIds.includes(item.evidenceId);

            return (
              <div
                key={item.evidenceId}
                className={`bg-[#121923] border rounded-2xl p-5 flex flex-col justify-between transition-all hover:scale-[1.01] group ${
                  isRev ? 'border-[#293444] opacity-90' : 'border-[#293444] hover:border-[#D94B4B]'
                }`}
              >
                <div>
                  {/* Top line with type & actions */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="p-1.5 rounded-lg bg-[#18212D] border border-[#293444]">
                        {getEvidenceIcon(item.type)}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-[#9CA3AF]">
                        {item.type?.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(item.evidenceId);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBm ? 'text-[#D6A85F]' : 'text-gray-600 hover:text-gray-300'
                        }`}
                        title={isBm ? 'Remove Bookmark' : 'Bookmark'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleReview(item.evidenceId);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isRev ? 'text-[#34D399]' : 'text-gray-600 hover:text-gray-300'
                        }`}
                        title={isRev ? 'Marked as Reviewed' : 'Mark as Reviewed'}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-bold text-base text-white group-hover:text-[#D94B4B] transition-colors line-clamp-1">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Location & Time */}
                  <div className="mt-4 pt-3 border-t border-[#293444] flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="truncate max-w-[130px]">{item.discoveryLocation}</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>

                {/* Inspect Action */}
                <button
                  onClick={() => onInspect(item)}
                  className="mt-4 w-full py-2 rounded-xl bg-[#18212D] group-hover:bg-[#D94B4B] group-hover:text-white text-xs font-semibold text-gray-300 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Forensic Record</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
