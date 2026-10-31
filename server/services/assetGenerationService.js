/**
 * Curated high-resolution noir/detective/surveillance imagery for visual clues,
 * suspect portraits, and realistic forensic evidence.
 */
const DETECTIVE_PORTRAITS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
];

const EVIDENCE_IMAGE_COLLECTION = {
  cctv: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&auto=format&fit=crop&q=80',
  crime_scene: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
  police_report: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
  medical_report: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
  financial_record: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
  access_log: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  handwritten_note: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
  physical_evidence: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
  document: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
  photo: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
};

export const getSuspectPortrait = (index) => {
  return DETECTIVE_PORTRAITS[index % DETECTIVE_PORTRAITS.length];
};

export const getEvidenceAssetUrl = (type, title = '') => {
  const t = (type || '').toLowerCase();
  const lowerTitle = (title || '').toLowerCase();

  if (t === 'cctv' || lowerTitle.includes('camera') || lowerTitle.includes('surveillance')) {
    return EVIDENCE_IMAGE_COLLECTION.cctv;
  }
  if (t === 'police_report') return EVIDENCE_IMAGE_COLLECTION.police_report;
  if (t === 'medical_report' || lowerTitle.includes('autopsy') || lowerTitle.includes('pathology')) {
    return EVIDENCE_IMAGE_COLLECTION.medical_report;
  }
  if (t === 'financial_record' || lowerTitle.includes('bank') || lowerTitle.includes('ledger') || lowerTitle.includes('wire')) {
    return EVIDENCE_IMAGE_COLLECTION.financial_record;
  }
  if (t === 'access_log' || lowerTitle.includes('terminal') || lowerTitle.includes('badge')) {
    return EVIDENCE_IMAGE_COLLECTION.access_log;
  }
  if (t === 'handwritten_note' || lowerTitle.includes('letter') || lowerTitle.includes('note')) {
    return EVIDENCE_IMAGE_COLLECTION.handwritten_note;
  }
  if (t === 'photo' || t === 'image' || lowerTitle.includes('photo')) {
    return EVIDENCE_IMAGE_COLLECTION.photo;
  }
  return EVIDENCE_IMAGE_COLLECTION.crime_scene;
};
