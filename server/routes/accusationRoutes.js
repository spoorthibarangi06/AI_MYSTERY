import express from 'express';
import { submitAccusation, getResult } from '../controllers/accusationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { accusationSchema } from '../services/validationService.js';

const router = express.Router();

router.use(protect);

router.post('/:id/accusation', validate(accusationSchema), submitAccusation);
router.get('/:id/result', getResult);

export default router;
