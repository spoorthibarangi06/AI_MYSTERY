import { callGemini } from './geminiService.js';
import { getBatchEvidenceGenerationPrompt } from '../prompts/evidenceGenerationPrompt.js';
import { getEvidenceAssetUrl } from './assetGenerationService.js';

export const resolveEvidenceCategory = (type) => {
  const t = (type || '').toLowerCase();
  if (['message', 'email', 'call_log', 'access_log'].includes(t)) {
    return 'digital';
  }
  if (['cctv', 'photo', 'image'].includes(t)) {
    return 'visual';
  }
  if (['police_report', 'medical_report'].includes(t)) {
    return 'official_report';
  }
  if (['witness_statement'].includes(t)) {
    return 'witness_statement';
  }
  return 'physical';
};

export const resolveEvidenceSource = (type, blueprintLocation) => {
  switch (type) {
    case 'police_report':
      return 'Metropolitan Forensic & Detective Bureau';
    case 'medical_report':
      return 'Office of the Chief Medical Examiner';
    case 'cctv':
      return 'Building Physical Security Video Server';
    case 'message':
      return 'Digital Forensics Unit - Device Extraction';
    case 'email':
      return 'Corporate Mail Server Forensic Archive';
    case 'call_log':
      return 'Telecommunications Judicial Subpoena';
    case 'access_log':
      return 'Physical Access Control & Keycard Log';
    case 'financial_record':
      return 'Forensic Financial Intelligence Unit';
    case 'witness_statement':
      return 'Formal Detective Interrogation Division';
    case 'handwritten_note':
      return 'Crime Scene Processing Unit';
    case 'photo':
      return 'Scene Photography & Ballistics Division';
    default:
      return `${blueprintLocation || 'Crime Scene'} Evidence Locker`;
  }
};

export const generateEvidenceForBlueprint = async (blueprint) => {
  const prompt = getBatchEvidenceGenerationPrompt({ blueprint });
  let generatedItems = await callGemini(prompt);

  if (!Array.isArray(generatedItems) || generatedItems.length === 0) {
    console.warn('[EvidenceService] Fallback to default evidence batch');
    generatedItems = [];
  }

  const suspectIds = blueprint.suspects.map((s) => s.suspectId);
  const culpritId = blueprint.solution.culpritSuspectId;

  return generatedItems.map((item, index) => {
    // Standardize Evidence ID format: EV-001, EV-002...
    const padNum = String(index + 1).padStart(3, '0');
    const evidenceId = item.evidenceId?.startsWith('EV-') ? item.evidenceId : `EV-${padNum}`;

    const type = item.type || 'document';
    const category = item.category || resolveEvidenceCategory(type);
    const source = item.source || resolveEvidenceSource(type, blueprint.location);
    const assetUrl = item.assetUrl || getEvidenceAssetUrl(type, item.title);

    // Validate related suspects
    let related = Array.isArray(item.relatedSuspectIds) ? item.relatedSuspectIds : [];
    related = related.filter((id) => suspectIds.includes(id));
    if (related.length === 0) {
      related = [culpritId];
    }

    return {
      evidenceId,
      type,
      category,
      source,
      title: item.title || `Forensic Clue #${padNum}`,
      description: item.description || 'Forensic evidence collected from the scene.',
      content: item.content || {},
      assetUrl,
      relatedSuspectIds: related,
      discoveryLocation: item.discoveryLocation || blueprint.location || 'Incident Venue',
      timestamp: item.timestamp || blueprint.incidentDate || 'Night of incident',
      metadata: item.metadata || {},
    };
  });
};
