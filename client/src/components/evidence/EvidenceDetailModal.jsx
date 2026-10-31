import React from 'react';
import { X, Bookmark, CheckCircle, MapPin, Calendar, Shield } from 'lucide-react';

// Viewers
import { PoliceReportView } from './viewers/PoliceReportView';
import { MedicalReportView } from './viewers/MedicalReportView';
import { EmailView } from './viewers/EmailView';
import { CallLogView } from './viewers/CallLogView';
import { FinancialRecordView } from './viewers/FinancialRecordView';
import { AccessLogView } from './viewers/AccessLogView';
import { HandwrittenNoteView } from './viewers/HandwrittenNoteView';
import { PhotoEvidenceView } from './viewers/PhotoEvidenceView';
import { WitnessStatementView } from './viewers/WitnessStatementView';
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
      case 'police_report':
        return <PoliceReportView evidence={evidence} />;
      case 'medical_report':
        return <MedicalReportView evidence={evidence} />;
      case 'message':
        return <ChatMessageView content={evidence.content} />;
      case 'cctv':
        return <CctvView evidence={evidence} />;
      case 'witness_statement':
        return <WitnessStatementView evidence={evidence} />;
      case 'email':
        return <EmailView evidence={evidence} />;
      case 'call_log':
        return <CallLogView evidence={evidence} />;
      case 'financial_record':
        return <FinancialRecordView evidence={evidence} />;
      case 'access_log':
        return <AccessLogView evidence={evidence} />;
      case 'handwritten_note':
        return <HandwrittenNoteView evidence={evidence} />;
      case 'photo':
      case 'image':
        return <PhotoEvidenceView evidence={evidence} />;
      default:
        return <DocumentView evidence={evidence} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121923] border border-[#293444] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#293444] flex items-center justify-between sticky top-0 bg-[#121923]/95 backdrop-blur-md z-20">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#18212D] text-[#D6A85F] border border-[#293444] font-bold">
              {evidence.evidenceId || 'EV-FILE'}
            </span>
            <span className="text-xs font-heading font-semibold text-white truncate max-w-xs sm:max-w-md">
              {evidence.title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleBookmark(evidence.evidenceId)}
              className={`p-2 rounded-xl border transition-colors ${
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
              className={`p-2 rounded-xl border transition-colors ${
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
              className="p-2 rounded-xl bg-[#18212D] text-gray-400 hover:text-white border border-[#293444] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body with specialized Viewer */}
        <div className="p-4 sm:p-6 flex-1 bg-[#0E141C]">{renderContent()}</div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#0B0F14] border-t border-[#293444] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9CA3AF]">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#D94B4B]" />
              <span className="truncate max-w-[200px]">{evidence.discoveryLocation || 'Incident Scene'}</span>
            </span>
            <span className="flex items-center space-x-1.5 font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>{evidence.timestamp || 'Recorded'}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] text-white text-xs font-semibold transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
