/**
 * Curated high-resolution noir/detective/surveillance imagery for visual clues,
 * suspect portraits, and CCTV feeds.
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
  document: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
  physical_evidence: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
  fingerprint: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  safe: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
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
  if (t === 'document' || lowerTitle.includes('ledger') || lowerTitle.includes('contract')) {
    return EVIDENCE_IMAGE_COLLECTION.document;
  }
  if (lowerTitle.includes('safe') || lowerTitle.includes('vault')) {
    return EVIDENCE_IMAGE_COLLECTION.safe;
  }
  if (lowerTitle.includes('fingerprint') || lowerTitle.includes('latch') || lowerTitle.includes('lock')) {
    return EVIDENCE_IMAGE_COLLECTION.physical_evidence;
  }
  return EVIDENCE_IMAGE_COLLECTION.crime_scene;
};
