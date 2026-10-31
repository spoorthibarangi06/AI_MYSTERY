import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, AlertCircle, ArrowRight, Trash2, CheckCircle2, Loader2 } from 'lucide-react';

export const MysteryCard = ({ mystery, onDelete }) => {
  const isGenerating = mystery.status === 'generating';
  const isCompleted = mystery.status === 'completed';
  const isFailed = mystery.status === 'failed';

  const getDifficultyBadge = (level) => {
    switch (level) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Hard':
        return 'bg-[#D94B4B]/15 text-[#D94B4B] border-[#D94B4B]/30';
      default:
        return 'bg-[#D6A85F]/15 text-[#D6A85F] border-[#D6A85F]/30';
    }
  };

  const getStatusBadge = () => {
    if (isGenerating) {
      return (
        <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Generating AI Blueprint</span>
        </span>
      );
    }
    if (isCompleted) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" />
          <span>Case Closed</span>
        </span>
      );
    }
    if (isFailed) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20">
          <AlertCircle className="w-3 h-3" />
          <span>Generation Failed</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#D6A85F]/10 text-[#D6A85F] border border-[#D6A85F]/20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F] animate-pulse"></span>
        <span>Investigation Active</span>
      </span>
    );
  };

  return (
    <div className="bg-[#121923] border border-[#293444] hover:border-[#293444]/80 rounded-xl p-5 flex flex-col justify-between transition-all group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#18212D] text-gray-300 border border-[#293444]">
              {mystery.category}
            </span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getDifficultyBadge(mystery.difficulty)}`}>
              {mystery.difficulty}
            </span>
          </div>
          {getStatusBadge()}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#D94B4B] transition-colors line-clamp-1">
          {mystery.title || 'Untitled Case'}
        </h3>

        {/* Story description snippet */}
        <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2 leading-relaxed">
          {mystery.story || mystery.originalPrompt}
        </p>

        {/* Metadata info */}
        <div className="flex items-center space-x-4 mt-4 text-[11px] font-mono text-[#9CA3AF]">
          <div className="flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-[#D6A85F]" />
            <span>{mystery.suspectCount || 4} Suspects</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{new Date(mystery.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-[#293444] flex items-center justify-between">
        <button
          onClick={() => onDelete(mystery._id)}
          className="text-gray-500 hover:text-[#EF4444] p-1.5 rounded-lg transition-colors"
          title="Delete Case File"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {isGenerating ? (
          <Link
            to={`/generating/${mystery._id}`}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
          >
            <span>View Progress</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : isCompleted ? (
          <Link
            to={`/mystery/${mystery._id}/result`}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
          >
            <span>View Verdict</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Link
            to={`/mystery/${mystery._id}`}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#D94B4B] hover:bg-[#b83b3b] text-white transition-colors shadow-sm shadow-[#D94B4B]/30"
          >
            <span>Enter Room</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
