import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const AccusationModal = ({
  suspects = [],
  initialSelectedSuspect = null,
  onClose,
  onSubmitAccusation,
  isSubmitting,
}) => {
  const [selectedId, setSelectedId] = useState(initialSelectedSuspect?.suspectId || '');
  const [reasoning, setReasoning] = useState('');
  const [confirmStep, setConfirmStep] = useState(false);

  const selectedSuspect = suspects.find((s) => s.suspectId === selectedId);

  const handleProceed = () => {
    if (!selectedId) return;
    setConfirmStep(true);
  };

  const handleFinalSubmit = () => {
    onSubmitAccusation({
      selectedSuspectId: selectedId,
      reasoning: reasoning.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121923] border border-[#293444] rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#293444] flex items-center justify-between sticky top-0 bg-[#121923] z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D94B4B] animate-pulse"></span>
            <h3 className="font-heading font-bold text-lg text-white">Final Indictment & Accusation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#18212D] text-gray-400 hover:text-white border border-[#293444] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {!confirmStep ? (
            <>
              <div>
                <p className="text-xs text-[#9CA3AF]">
                  Select the individual you believe is the true culprit based on the forensic evidence and alibi
                  contradictions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {suspects.map((s) => {
                    const isSelected = selectedId === s.suspectId;
                    return (
                      <div
                        key={s.suspectId}
                        onClick={() => setSelectedId(s.suspectId)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 ${
                          isSelected
                            ? 'bg-[#D94B4B]/15 border-[#D94B4B] text-white shadow-md shadow-[#D94B4B]/20'
                            : 'bg-[#18212D] border-[#293444] text-[#9CA3AF] hover:border-gray-500'
                        }`}
                      >
                        <img
                          src={s.profileImage}
                          alt={s.name}
                          className="w-12 h-12 rounded-lg object-cover grayscale contrast-125 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                          <p className="text-[11px] text-[#D6A85F] font-mono truncate">{s.occupation}</p>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-[#D94B4B] shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Deductive Reasoning */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                  Deductive Reasoning & Evidence Chain <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="Explain how the WhatsApp messages, CCTV timestamps, or forensic findings prove this suspect committed the incident..."
                  className="w-full px-4 py-3 bg-[#18212D] border border-[#293444] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D94B4B] transition-colors leading-relaxed"
                />
              </div>

              {/* Notice */}
              <div className="p-3.5 rounded-xl bg-[#D6A85F]/10 border border-[#D6A85F]/30 flex items-start space-x-2 text-xs text-[#D6A85F]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Official Protocol: Only one indictment can be submitted per case file. Once handed over, the file is
                  permanently locked for evaluation.
                </span>
              </div>
            </>
          ) : (
            /* Confirmation Step */
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D94B4B]/20 border border-[#D94B4B] flex items-center justify-center mx-auto text-[#D94B4B]">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-heading font-bold text-white">Confirm Official Indictment?</h4>

              <div className="p-4 bg-[#18212D] border border-[#293444] rounded-xl max-w-sm mx-auto text-left flex items-center space-x-3">
                <img
                  src={selectedSuspect?.profileImage}
                  alt={selectedSuspect?.name}
                  className="w-12 h-12 rounded-lg object-cover grayscale contrast-125"
                />
                <div>
                  <p className="text-sm font-bold text-white">{selectedSuspect?.name}</p>
                  <p className="text-xs text-[#D94B4B] font-mono">{selectedSuspect?.occupation}</p>
                </div>
              </div>

              <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
                Are you certain? Submitting your accusation will freeze the investigation room and reveal the true
                culprit and forensic explanation.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0B0F14] border-t border-[#293444] flex items-center justify-between">
          {!confirmStep ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#18212D] text-xs font-medium text-gray-400 hover:text-white transition-colors"
              >
                Continue Reviewing Clues
              </button>
              <button
                disabled={!selectedId}
                onClick={handleProceed}
                className="px-5 py-2 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] disabled:opacity-40 text-xs font-semibold text-white transition-all shadow-md shadow-[#D94B4B]/20 flex items-center space-x-1.5"
              >
                <span>Proceed to Accusation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setConfirmStep(false)}
                className="px-4 py-2 rounded-xl bg-[#18212D] text-xs font-medium text-gray-400 hover:text-white transition-colors"
              >
                Back to Selection
              </button>
              <button
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] disabled:opacity-50 text-xs font-bold text-white transition-all shadow-lg shadow-[#D94B4B]/30 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit Final Verdict</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
