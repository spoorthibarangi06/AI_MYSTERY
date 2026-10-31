import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mysteryService } from '../services/mysteryService';
import { CaseOverview } from '../components/mystery/CaseOverview';
import { SuspectCard } from '../components/suspects/SuspectCard';
import { SuspectModal } from '../components/suspects/SuspectModal';
import { EvidenceList } from '../components/evidence/EvidenceList';
import { EvidenceDetailModal } from '../components/evidence/EvidenceDetailModal';
import { TimelineView } from '../components/mystery/TimelineView';
import { AccusationModal } from '../components/mystery/AccusationModal';
import {
  FileText,
  Users,
  Search,
  MessageSquare,
  Video,
  Clock,
  ShieldAlert,
  LayoutDashboard,
  CheckCircle,
  Bookmark,
  Award,
} from 'lucide-react';

export const InvestigationPage = () => {
  const { mysteryId } = useParams();
  const navigate = useNavigate();

  const [mystery, setMystery] = useState(null);
  const [suspects, setSuspects] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [progress, setProgress] = useState({ reviewedEvidenceIds: [], bookmarkedEvidenceIds: [] });
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Modals
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [showAccusationModal, setShowAccusationModal] = useState(false);
  const [isSubmittingAccusation, setIsSubmittingAccusation] = useState(false);

  useEffect(() => {
    const loadInvestigationData = async () => {
      try {
        const [mRes, sRes, eRes, tRes, pRes] = await Promise.all([
          mysteryService.getMystery(mysteryId),
          mysteryService.getSuspects(mysteryId),
          mysteryService.getEvidence(mysteryId),
          mysteryService.getTimeline(mysteryId),
          mysteryService.getProgress(mysteryId),
        ]);

        setMystery(mRes.data);

        // If completed, redirect to result
        if (mRes.data.status === 'completed') {
          navigate(`/mystery/${mysteryId}/result`);
          return;
        }

        setSuspects(sRes.data || []);
        setEvidenceList(eRes.data || []);
        setTimeline(tRes.data || []);
        if (pRes.data) {
          setProgress({
            reviewedEvidenceIds: pRes.data.reviewedEvidenceIds || [],
            bookmarkedEvidenceIds: pRes.data.bookmarkedEvidenceIds || [],
          });
        }
      } catch (err) {
        console.error('Failed to load investigation room:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInvestigationData();
  }, [mysteryId, navigate]);

  // Handle Review toggle
  const handleToggleReview = async (evidenceId) => {
    const current = progress.reviewedEvidenceIds;
    const updated = current.includes(evidenceId)
      ? current.filter((id) => id !== evidenceId)
      : [...current, evidenceId];

    setProgress((prev) => ({ ...prev, reviewedEvidenceIds: updated }));
    try {
      await mysteryService.updateProgress(mysteryId, updated);
    } catch (err) {
      console.warn('Failed to sync progress:', err);
    }
  };

  // Handle Bookmark toggle
  const handleToggleBookmark = async (evidenceId) => {
    const current = progress.bookmarkedEvidenceIds;
    const updated = current.includes(evidenceId)
      ? current.filter((id) => id !== evidenceId)
      : [...current, evidenceId];

    setProgress((prev) => ({ ...prev, bookmarkedEvidenceIds: updated }));
    try {
      await mysteryService.updateBookmarks(mysteryId, updated);
    } catch (err) {
      console.warn('Failed to sync bookmarks:', err);
    }
  };

  // Handle Accusation Submission
  const handleSubmitAccusation = async ({ selectedSuspectId, reasoning }) => {
    setIsSubmittingAccusation(true);
    try {
      await mysteryService.submitAccusation(mysteryId, { selectedSuspectId, reasoning });
      setShowAccusationModal(false);
      navigate(`/mystery/${mysteryId}/result`);
    } catch (err) {
      alert('Error submitting accusation: ' + err.message);
      setIsSubmittingAccusation(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D94B4B] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-mono text-[#9CA3AF] mt-4 tracking-widest">
          ACCESSING SECURE EVIDENCE VAULT #{mysteryId?.slice(-6)}...
        </p>
      </div>
    );
  }

  if (!mystery) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm text-red-400 font-mono">Case file could not be retrieved.</p>
          <Link to="/dashboard" className="mt-4 inline-block text-xs text-[#D6A85F] underline">
            Return to Case Board
          </Link>
        </div>
      </div>
    );
  }

  const reviewedPercent = evidenceList.length
    ? Math.round((progress.reviewedEvidenceIds.length / evidenceList.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F3F4F6] flex flex-col">
      {/* Top Bar Navigation */}
      <div className="bg-[#121923] border-b border-[#293444] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard"
            className="p-1.5 rounded-lg bg-[#18212D] text-gray-400 hover:text-white border border-[#293444] transition-colors"
            title="Return to Case Files"
          >
            <LayoutDashboard className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-heading font-bold text-white truncate max-w-xs sm:max-w-md">
                {mystery.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18212D] text-[#D6A85F] border border-[#293444]">
                {mystery.difficulty}
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#9CA3AF]">
              CASE #{mystery._id?.slice(-8).toUpperCase()} • INVESTIGATION ACTIVE
            </p>
          </div>
        </div>

        {/* Progress & Accusation CTA */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono">
            <span className="text-[#9CA3AF]">EVIDENCE LOG:</span>
            <span className="text-[#34D399]">
              {progress.reviewedEvidenceIds.length}/{evidenceList.length} ({reviewedPercent}%)
            </span>
          </div>

          <button
            onClick={() => setShowAccusationModal(true)}
            className="px-4 py-2 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white text-xs font-semibold shadow-md shadow-[#D94B4B]/25 flex items-center space-x-1.5 transition-all hover:scale-[1.02]"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Submit Final Accusation</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-[#0E141C] border-r border-[#293444] p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0">
          {[
            { id: 'overview', label: 'Case Overview', icon: FileText },
            { id: 'suspects', label: `Suspect Dossiers (${suspects.length})`, icon: Users },
            { id: 'evidence', label: `Evidence Docket (${evidenceList.length})`, icon: Search },
            {
              id: 'official_reports',
              label: 'Official Reports',
              icon: Shield,
              count: evidenceList.filter((e) => ['police_report', 'medical_report'].includes(e.type)).length,
            },
            {
              id: 'digital',
              label: 'Digital Forensics',
              icon: MessageSquare,
              count: evidenceList.filter((e) => ['message', 'email', 'call_log', 'access_log'].includes(e.type)).length,
            },
            {
              id: 'visual',
              label: 'Surveillance & Photos',
              icon: Video,
              count: evidenceList.filter((e) => ['cctv', 'photo', 'image'].includes(e.type)).length,
            },
            { id: 'timeline', label: 'Case Timeline', icon: Clock },
            { id: 'accuse', label: 'Indict Culprit', icon: ShieldAlert, highlight: true },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'accuse') {
                    setShowAccusationModal(true);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 md:shrink ${
                  tab.highlight
                    ? 'bg-[#D94B4B]/15 text-[#D94B4B] border border-[#D94B4B]/30 hover:bg-[#D94B4B]/25 mt-auto'
                    : isActive
                    ? 'bg-[#18212D] text-white border border-[#293444] font-semibold'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-[#121923]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${tab.highlight ? 'text-[#D94B4B]' : 'text-[#D6A85F]'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[10px] font-mono text-gray-500 hidden md:inline">{tab.count}</span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {activeTab === 'overview' && <CaseOverview mystery={mystery} onSwitchTab={setActiveTab} />}

          {activeTab === 'suspects' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">Suspect Dossiers</h3>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Click any suspect to open their full statement, background connection, and verified alibis.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suspects.map((s) => (
                  <SuspectCard key={s.suspectId} suspect={s} onSelect={setSelectedSuspect} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <EvidenceList
              evidenceList={evidenceList}
              suspects={suspects}
              reviewedIds={progress.reviewedEvidenceIds}
              bookmarkedIds={progress.bookmarkedEvidenceIds}
              onInspect={setSelectedEvidence}
              onToggleReview={handleToggleReview}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'official_reports' && (
            <EvidenceList
              evidenceList={evidenceList.filter((e) =>
                ['police_report', 'medical_report'].includes(e.type)
              )}
              suspects={suspects}
              reviewedIds={progress.reviewedEvidenceIds}
              bookmarkedIds={progress.bookmarkedEvidenceIds}
              onInspect={setSelectedEvidence}
              onToggleReview={handleToggleReview}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'digital' && (
            <EvidenceList
              evidenceList={evidenceList.filter((e) =>
                ['message', 'email', 'call_log', 'access_log'].includes(e.type)
              )}
              suspects={suspects}
              reviewedIds={progress.reviewedEvidenceIds}
              bookmarkedIds={progress.bookmarkedEvidenceIds}
              onInspect={setSelectedEvidence}
              onToggleReview={handleToggleReview}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'visual' && (
            <EvidenceList
              evidenceList={evidenceList.filter((e) => ['cctv', 'photo', 'image'].includes(e.type))}
              suspects={suspects}
              reviewedIds={progress.reviewedEvidenceIds}
              bookmarkedIds={progress.bookmarkedEvidenceIds}
              onInspect={setSelectedEvidence}
              onToggleReview={handleToggleReview}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'timeline' && <TimelineView timeline={timeline} />}
        </main>
      </div>

      {/* Modals */}
      {selectedSuspect && (
        <SuspectModal
          suspect={selectedSuspect}
          onClose={() => setSelectedSuspect(null)}
          onAccuse={(s) => {
            setSelectedSuspect(null);
            setShowAccusationModal(true);
          }}
        />
      )}

      {selectedEvidence && (
        <EvidenceDetailModal
          evidence={selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          isReviewed={progress.reviewedEvidenceIds.includes(selectedEvidence.evidenceId)}
          isBookmarked={progress.bookmarkedEvidenceIds.includes(selectedEvidence.evidenceId)}
          onToggleReview={handleToggleReview}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {showAccusationModal && (
        <AccusationModal
          suspects={suspects}
          initialSelectedSuspect={selectedSuspect}
          onClose={() => setShowAccusationModal(false)}
          onSubmitAccusation={handleSubmitAccusation}
          isSubmitting={isSubmittingAccusation}
        />
      )}
    </div>
  );
};
