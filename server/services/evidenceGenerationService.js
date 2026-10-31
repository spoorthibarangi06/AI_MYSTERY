import { callGemini } from './geminiService.js';
import { getBatchEvidenceGenerationPrompt } from '../prompts/evidenceGenerationPrompt.js';
import { getEvidenceAssetUrl } from './assetGenerationService.js';

export const generateEvidenceForBlueprint = async (blueprint) => {
  const prompt = getBatchEvidenceGenerationPrompt({ blueprint });
  let generatedItems = await callGemini(prompt);

  if (!Array.isArray(generatedItems) || generatedItems.length === 0) {
    console.warn('[EvidenceService] Fallback to default evidence batch');
    generatedItems = [];
  }

  // Augment evidence items with asset URLs and valid identifiers
  const suspectIds = blueprint.suspects.map((s) => s.suspectId);
  const culpritId = blueprint.solution.culpritSuspectId;

  return generatedItems.map((item, index) => {
    const evidenceId = item.evidenceId || `ev_${index + 1}`;
    const type = item.type || 'document';
    const assetUrl = item.assetUrl || getEvidenceAssetUrl(type, item.title);

    // Ensure related suspects are valid
    let related = Array.isArray(item.relatedSuspectIds) ? item.relatedSuspectIds : [];
    related = related.filter((id) => suspectIds.includes(id));
    if (related.length === 0) {
      related = [culpritId];
    }

    return {
      evidenceId,
      type,
      title: item.title || `Investigative Lead #${index + 1}`,
      description: item.description || 'Forensic evidence collected from the scene.',
      content: item.content || {},
      assetUrl,
      relatedSuspectIds: related,
      discoveryLocation: item.discoveryLocation || blueprint.location || 'Incident Venue',
      timestamp: item.timestamp || blueprint.incidentDate || 'Night of incident',
    };
  });
};
