import express from 'express';
import {
  createMystery,
  getMysteries,
  getMysteryById,
  getMysteryStatus,
  deleteMystery,
} from '../controllers/mysteryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createMysterySchema } from '../services/validationService.js';

const router = express.Router();

router.use(protect);

router.post('/', validate(createMysterySchema), createMystery);
router.get('/', getMysteries);
router.get('/:id', getMysteryById);
router.get('/:id/status', getMysteryStatus);
router.delete('/:id', deleteMystery);

export default router;
