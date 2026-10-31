import express from 'express';
import {
  getSuspects,
  getEvidenceList,
  getEvidenceById,
  getTimeline,
  getProgress,
  updateProgress,
  updateBookmarks,
} from '../controllers/evidenceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/:id/suspects', getSuspects);
router.get('/:id/evidence', getEvidenceList);
router.get('/:id/evidence/:evidenceId', getEvidenceById);
router.get('/:id/timeline', getTimeline);
router.get('/:id/progress', getProgress);
router.put('/:id/progress', updateProgress);
router.put('/:id/bookmarks', updateBookmarks);

export default router;
