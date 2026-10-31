import { Accusation } from '../models/Accusation.js';
import { Solution } from '../models/Solution.js';
import { Suspect } from '../models/Suspect.js';
import { Mystery } from '../models/Mystery.js';
import { InvestigationProgress } from '../models/InvestigationProgress.js';
import { Evidence } from '../models/Evidence.js';
import { callGemini } from './geminiService.js';
import { getEvaluationPrompt } from '../prompts/evaluationPrompt.js';

export const processAccusation = async ({ userId, mysteryId, selectedSuspectId, reasoning }) => {
  // Check if an accusation already exists
  const existing = await Accusation.findOne({ userId, mysteryId });
  if (existing) {
    throw new Error('An accusation has already been submitted for this case.');
  }

  // Fetch confidential solution
  const solution = await Solution.findOne({ mysteryId });
  if (!solution) {
    throw new Error('Mystery solution could not be found.');
  }

  // Fetch suspects
  const suspects = await Suspect.find({ mysteryId });
  const selectedSuspect = suspects.find((s) => s.suspectId === selectedSuspectId);
  if (!selectedSuspect) {
    throw new Error('The selected suspect does not exist in this investigation.');
  }

  const isCorrect = solution.culpritSuspectId === selectedSuspectId;

  // Generate evaluation via Gemini or smart fallback
  let evaluationResult = null;
  try {
    const prompt = getEvaluationPrompt({
      solution,
      selectedSuspect,
      userReasoning: reasoning,
      suspects,
    });
    evaluationResult = await callGemini(prompt);
  } catch (err) {
    console.warn('[AccusationService] Evaluation prompt failed, using procedural narrative.');
  }

  const resultExplanation =
    evaluationResult?.detailedFeedback ||
    (isCorrect
      ? `Case Solved! Your deductive reasoning was spot on. ${selectedSuspect.name} committed the crime using the method revealed in the confidential logs.`
      : `Case Closed. While ${selectedSuspect.name} appeared suspicious, the true culprit was someone else.`);

  // Create accusation record
  const accusation = await Accusation.create({
    userId,
    mysteryId,
    selectedSuspectId,
    reasoning: reasoning || '',
    isCorrect,
    resultExplanation,
  });

  // Mark mystery completed
  await Mystery.findByIdAndUpdate(mysteryId, {
    status: 'completed',
    completedAt: new Date(),
  });

  return getInvestigationResultData({ userId, mysteryId, accusation, solution, suspects });
};

export const getInvestigationResultData = async ({ userId, mysteryId, accusation, solution, suspects }) => {
  if (!accusation) {
    accusation = await Accusation.findOne({ userId, mysteryId });
  }
  if (!accusation) {
    return null;
  }
  if (!solution) {
    solution = await Solution.findOne({ mysteryId });
  }
  if (!suspects) {
    suspects = await Suspect.find({ mysteryId });
  }

  const culprit = suspects.find((s) => s.suspectId === solution.culpritSuspectId);
  const selected = suspects.find((s) => s.suspectId === accusation.selectedSuspectId);

  // Performance stats
  const progress = await InvestigationProgress.findOne({ userId, mysteryId });
  const totalEvidence = await Evidence.countDocuments({ mysteryId });
  const reviewedCount = progress?.reviewedEvidenceIds?.length || 0;

  return {
    isCorrect: accusation.isCorrect,
    submittedAt: accusation.submittedAt,
    userReasoning: accusation.reasoning,
    resultExplanation: accusation.resultExplanation,
    culprit: {
      suspectId: culprit?.suspectId,
      name: culprit?.name,
      profileImage: culprit?.profileImage,
      occupation: culprit?.occupation,
      background: culprit?.background,
      actualMotive: solution.actualMotive,
      method: solution.method,
      opportunity: solution.opportunity,
      explanation: solution.explanation,
      evidenceReasoning: solution.evidenceReasoning,
    },
    selectedSuspect: {
      suspectId: selected?.suspectId,
      name: selected?.name,
      profileImage: selected?.profileImage,
      occupation: selected?.occupation,
    },
    performance: {
      totalEvidence,
      reviewedCount,
      accuracyRate: accusation.isCorrect ? 100 : 0,
    },
  };
};
