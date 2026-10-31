import { Mystery } from '../models/Mystery.js';
import { Suspect } from '../models/Suspect.js';
import { Evidence } from '../models/Evidence.js';
import { Solution } from '../models/Solution.js';
import { InvestigationProgress } from '../models/InvestigationProgress.js';
import { callGemini } from './geminiService.js';
import { getMysteryBlueprintPrompt } from '../prompts/mysteryBlueprintPrompt.js';
import { validateBlueprint } from './validationService.js';
import { generateEvidenceForBlueprint } from './evidenceGenerationService.js';
import { getSuspectPortrait } from './assetGenerationService.js';

export const runMysteryGenerationPipeline = async (mysteryId) => {
  const mystery = await Mystery.findById(mysteryId);
  if (!mystery) {
    console.error(`[Pipeline Error] Mystery ${mysteryId} not found`);
    return;
  }

  try {
    // ----------------------------------------------------
    // Stage 1: Analysing your story & Blueprint Generation
    // ----------------------------------------------------
    await updateStage(mystery, 'Analysing your story');
    const blueprintPrompt = getMysteryBlueprintPrompt({
      originalPrompt: mystery.originalPrompt,
      category: mystery.category,
      difficulty: mystery.difficulty,
      suspectCount: mystery.suspectCount,
    });

    let rawBlueprint = await callGemini(blueprintPrompt);

    // ----------------------------------------------------
    // Stage 2: Blueprint Validation & Retries
    // ----------------------------------------------------
    await updateStage(mystery, 'Creating the mystery storyline');
    let validation = validateBlueprint(rawBlueprint, mystery.suspectCount);

    let retryCount = 0;
    while (!validation.valid && retryCount < 2) {
      console.warn(`[Pipeline] Blueprint validation failed: ${validation.errors.join(', ')}. Retrying...`);
      retryCount++;
      const fixPrompt = `${blueprintPrompt}\n\nIMPORTANT: Previous attempt had errors: ${validation.errors.join('; ')}. Fix these errors and return valid JSON.`;
      rawBlueprint = await callGemini(fixPrompt);
      validation = validateBlueprint(rawBlueprint, mystery.suspectCount);
    }

    if (!validation.valid) {
      throw new Error(`Blueprint validation failed after retries: ${validation.errors.join(', ')}`);
    }

    const blueprint = validation.data;

    // ----------------------------------------------------
    // Stage 3: Building suspect profiles & motives
    // ----------------------------------------------------
    await updateStage(mystery, 'Building suspect profiles');
    const suspectsToSave = blueprint.suspects.map((s, idx) => ({
      mysteryId: mystery._id,
      suspectId: s.suspectId,
      name: s.name,
      age: s.age || 35,
      occupation: s.occupation || 'Unknown',
      profileImage: getSuspectPortrait(idx),
      background: s.background || '',
      motive: s.motive || '',
      alibi: s.alibi || '',
      publicDetails: s.publicDetails || '',
    }));

    await Suspect.deleteMany({ mysteryId: mystery._id });
    await Suspect.insertMany(suspectsToSave);

    // Save Confidential Solution
    await Solution.deleteMany({ mysteryId: mystery._id });
    await Solution.create({
      mysteryId: mystery._id,
      culpritSuspectId: blueprint.solution.culpritSuspectId,
      actualMotive: blueprint.solution.actualMotive,
      method: blueprint.solution.method,
      opportunity: blueprint.solution.opportunity,
      explanation: blueprint.solution.explanation,
      evidenceReasoning: blueprint.solution.evidenceReasoning || [],
    });

    // ----------------------------------------------------
    // Stage 4 & 5: Generating evidence & Preparing room
    // ----------------------------------------------------
    await updateStage(mystery, 'Generating evidence');
    const evidenceItems = await generateEvidenceForBlueprint(blueprint);

    await Evidence.deleteMany({ mysteryId: mystery._id });
    const evidenceToSave = evidenceItems.map((e) => ({
      mysteryId: mystery._id,
      evidenceId: e.evidenceId,
      type: e.type,
      category: e.category,
      source: e.source,
      title: e.title,
      description: e.description,
      content: e.content,
      assetUrl: e.assetUrl,
      relatedSuspectIds: e.relatedSuspectIds,
      discoveryLocation: e.discoveryLocation,
      timestamp: e.timestamp,
      metadata: e.metadata || {},
    }));
    await Evidence.insertMany(evidenceToSave);

    // ----------------------------------------------------
    // Stage 6: Finalizing Investigation Room
    // ----------------------------------------------------
    await updateStage(mystery, 'Preparing the investigation room');

    // Create initial investigation progress record
    await InvestigationProgress.findOneAndUpdate(
      { userId: mystery.userId, mysteryId: mystery._id },
      { reviewedEvidenceIds: [], bookmarkedEvidenceIds: [], lastVisitedAt: new Date() },
      { upsert: true, new: true }
    );

    // Mark mystery ready
    mystery.title = blueprint.title || mystery.title;
    mystery.story = blueprint.story || '';
    mystery.location = blueprint.location || '';
    mystery.incidentDate = blueprint.incidentDate || '';
    mystery.timeline = blueprint.timeline || [];
    mystery.status = 'ready';
    mystery.generationStage = 'Complete';
    mystery.generationError = null;
    await mystery.save();

    console.log(`[Pipeline Success] Mystery ${mystery._id} is ready for investigation.`);
  } catch (err) {
    console.error(`[Pipeline Error] Failed to generate mystery ${mysteryId}:`, err);
    mystery.status = 'failed';
    mystery.generationError = err.message || 'Generation failed';
    mystery.generationStage = 'Error during generation';
    await mystery.save();
  }
};

const updateStage = async (mystery, stageName) => {
  mystery.generationStage = stageName;
  await mystery.save();
  // Small pause between stages for smooth UI transition
  await new Promise((res) => setTimeout(res, 400));
};
