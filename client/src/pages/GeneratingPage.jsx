import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mysteryService } from '../services/mysteryService';
import { Shield, CheckCircle2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const STAGES = [
  'Analysing your story',
  'Creating the mystery storyline',
  'Building suspect profiles',
  'Establishing motives and alibis',
  'Generating evidence',
  'Preparing the investigation room',
];

export const GeneratingPage = () => {
  const { mysteryId } = useParams();
  const navigate = useNavigate();

  const [mystery, setMystery] = useState(null);
  const [currentStage, setCurrentStage] = useState('Analysing your story');
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId = null;

    const checkStatus = async () => {
      try {
        const res = await mysteryService.getMysteryStatus(mysteryId);
        const data = res.data;
        setMystery(data);

        if (data.generationStage) {
          setCurrentStage(data.generationStage);
        }

        if (data.status === 'ready') {
          clearInterval(intervalId);
          setTimeout(() => {
            navigate(`/mystery/${mysteryId}`);
          }, 800);
        } else if (data.status === 'failed') {
          clearInterval(intervalId);
          setError(data.generationError || 'Generation encountered an unrecoverable failure.');
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    checkStatus();
    intervalId = setInterval(checkStatus, 1500);

    return () => clearInterval(intervalId);
  }, [mysteryId, navigate]);

  const getStageIndex = (stage) => {
    const idx = STAGES.findIndex((s) => s.toLowerCase() === (stage || '').toLowerCase());
    return idx === -1 ? 0 : idx;
  };

  const activeIndex = getStageIndex(currentStage);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F3F4F6] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-[#121923] border border-[#293444] rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#18212D] border border-[#D94B4B] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#D94B4B] shadow-lg shadow-[#D94B4B]/20 animate-pulse">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Constructing Case File</h2>
          <p className="text-xs text-[#9CA3AF] mt-1 font-mono">
            {mystery?.title || 'GEMINI FORENSIC SYNTHESIS IN PROGRESS'}
          </p>
        </div>

        {error ? (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">AI Synthesis Failure</p>
                <p className="mt-1 text-gray-300">{error}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/create-mystery"
                className="flex-1 py-3 text-center rounded-xl bg-[#18212D] border border-[#293444] hover:border-gray-500 text-white text-xs font-semibold transition-colors"
              >
                Modify Scenario
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-3 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Synthesis</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Stage Indicator */}
            <div className="p-4 rounded-xl bg-[#18212D] border border-[#293444] text-xs flex items-center justify-between font-mono">
              <span className="text-[#9CA3AF]">ACTIVE PIPELINE PHASE:</span>
              <span className="text-[#D6A85F] font-bold">{currentStage.toUpperCase()}</span>
            </div>

            {/* Stages Timeline List */}
            <div className="space-y-3 pt-2">
              {STAGES.map((stage, idx) => {
                const isPassed = idx < activeIndex || mystery?.status === 'ready';
                const isCurrent = idx === activeIndex && mystery?.status !== 'ready';

                return (
                  <div
                    key={stage}
                    className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${
                      isPassed
                        ? 'bg-[#18212D]/60 border-emerald-500/20 text-[#34D399]'
                        : isCurrent
                        ? 'bg-[#18212D] border-[#D94B4B] text-white shadow-md shadow-[#D94B4B]/10'
                        : 'border-[#293444]/40 text-gray-600'
                    }`}
                  >
                    <div className="shrink-0">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-[#D94B4B] animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-700"></div>
                      )}
                    </div>
                    <span className="text-xs font-medium">{stage}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-center text-[#9CA3AF] pt-4 font-mono">
              Verifying logical consistency and clue relationships...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
