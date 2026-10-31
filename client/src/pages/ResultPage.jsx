import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mysteryService } from '../services/mysteryService';
import {
  CheckCircle2,
  XCircle,
  Shield,
  Search,
  LayoutDashboard,
  PlusCircle,
  FileText,
  User,
  Clock,
  Key,
} from 'lucide-react';

export const ResultPage = () => {
  const { mysteryId } = useParams();
  const [result, setResult] = useState(null);
  const [mystery, setMystery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const [rRes, mRes] = await Promise.all([
          mysteryService.getResult(mysteryId),
          mysteryService.getMystery(mysteryId),
        ]);
        setResult(rRes.data);
        setMystery(mRes.data);
      } catch (err) {
        console.error('Failed to load result:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [mysteryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D94B4B] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-mono text-[#9CA3AF] mt-4 tracking-widest">
          COMPILING CHIEF DETECTIVE REPORT...
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm text-[#EF4444] font-mono">No verdict has been recorded for this case file yet.</p>
          <Link to={`/mystery/${mysteryId}`} className="mt-4 inline-block text-xs text-[#D6A85F] underline">
            Proceed to Investigation Room
          </Link>
        </div>
      </div>
    );
  }

  const isCorrect = result.isCorrect;
  const culprit = result.culprit;
  const selected = result.selectedSuspect;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F3F4F6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Verdict Banner */}
        <div
          className={`border rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl ${
            isCorrect
              ? 'bg-gradient-to-b from-emerald-950/40 via-[#121923] to-[#121923] border-emerald-500/40'
              : 'bg-gradient-to-b from-[#EF4444]/15 via-[#121923] to-[#121923] border-[#EF4444]/40'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isCorrect
                    ? 'bg-emerald-500/20 text-[#34D399] border-emerald-500/30'
                    : 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30'
                }`}
              >
                {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF]">
                  OFFICIAL INDICTMENT VERDICT
                </span>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-0.5">
                  {isCorrect ? 'Case Solved! Indictment Verified' : 'Case Closed. Incorrect Accusation'}
                </h1>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Submitted on {new Date(result.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Performance Pill */}
            <div className="p-3 bg-[#18212D] border border-[#293444] rounded-xl text-xs font-mono">
              <div className="text-gray-400">CLUES REVIEWED:</div>
              <div className="text-[#D6A85F] font-bold text-sm">
                {result.performance?.reviewedCount} / {result.performance?.totalEvidence}
              </div>
            </div>
          </div>

          {/* User's Deduction Review */}
          {result.userReasoning && (
            <div className="mt-6 pt-6 border-t border-[#293444] text-xs">
              <p className="font-mono uppercase text-[#9CA3AF] mb-1">Your Submitted Deductive Argument:</p>
              <p className="p-4 rounded-xl bg-[#18212D]/80 border border-[#293444] text-gray-200 italic">
                "{result.userReasoning}"
              </p>
            </div>
          )}

          {/* Evaluation Feedback */}
          {result.resultExplanation && (
            <div className="mt-4 p-4 rounded-xl bg-[#18212D]/40 border border-[#293444] text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
              {result.resultExplanation}
            </div>
          )}
        </div>

        {/* The True Culprit Dossier */}
        <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#293444] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-[#D94B4B]" />
              <h2 className="font-heading font-bold text-lg text-white">Confidential Culprit Declassification</h2>
            </div>
            <span className="text-xs font-mono text-[#D6A85F] uppercase px-2 py-0.5 rounded bg-[#18212D] border border-[#293444]">
              IDENTIFIED PERPETRATOR
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Profile strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 bg-[#18212D] border border-[#293444] rounded-2xl">
              <img
                src={culprit?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                alt={culprit?.name}
                className="w-20 h-20 rounded-xl object-cover grayscale contrast-125 border border-[#D94B4B]/40 shrink-0"
              />
              <div className="flex-1">
                <span className="text-[10px] font-mono text-[#D6A85F]">CULPRIT ID: {culprit?.suspectId}</span>
                <h3 className="text-xl font-heading font-bold text-white">{culprit?.name}</h3>
                <p className="text-xs text-[#D94B4B] font-mono uppercase">{culprit?.occupation}</p>
                <p className="text-xs text-[#9CA3AF] mt-1">{culprit?.background}</p>
              </div>
            </div>

            {/* Motive & Method Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl space-y-2">
                <p className="font-mono uppercase text-[#D6A85F] font-semibold">The Actual Hidden Motive</p>
                <p className="text-gray-200 leading-relaxed">{culprit?.actualMotive}</p>
              </div>

              <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl space-y-2">
                <p className="font-mono uppercase text-[#D94B4B] font-semibold">The Breach Opportunity</p>
                <p className="text-gray-200 leading-relaxed">{culprit?.opportunity}</p>
              </div>
            </div>

            {/* Execution Method */}
            <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl text-xs space-y-2">
              <p className="font-mono uppercase text-blue-400 font-semibold">Methodology of Execution</p>
              <p className="text-gray-200 leading-relaxed">{culprit?.method}</p>
            </div>

            {/* Full Narrative Explanation */}
            <div>
              <h3 className="text-sm font-heading font-semibold text-white mb-2">
                Full Investigation Narrative & Resolution
              </h3>
              <div className="p-5 bg-[#18212D] border border-[#293444] rounded-xl text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
                {culprit?.explanation}
              </div>
            </div>

            {/* Clue Breakdown Steps */}
            {culprit?.evidenceReasoning && culprit.evidenceReasoning.length > 0 && (
              <div>
                <h3 className="text-sm font-heading font-semibold text-white mb-3">
                  Evidence Chain Connecting to Culprit
                </h3>
                <div className="space-y-2 text-xs">
                  {culprit.evidenceReasoning.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#18212D] border border-[#293444] rounded-xl flex items-start space-x-3 text-gray-200"
                    >
                      <span className="text-[#34D399] font-mono font-bold shrink-0">STEP {idx + 1}</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#293444]">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-[#D6A85F]" />
            <span>Return to Case Board</span>
          </Link>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Link
              to={`/mystery/${mysteryId}`}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] text-gray-300 text-xs font-medium text-center transition-colors"
            >
              Revisit Crime Scene Room
            </Link>

            <Link
              to="/create-mystery"
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#D94B4B]/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Investigate Another Case</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
