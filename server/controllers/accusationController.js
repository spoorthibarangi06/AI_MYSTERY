import { Mystery } from '../models/Mystery.js';
import { processAccusation, getInvestigationResultData } from '../services/accusationService.js';

export const submitAccusation = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mystery) {
      return res.status(404).json({ success: false, message: 'Mystery not found', error: 'NOT_FOUND' });
    }

    const { selectedSuspectId, reasoning } = req.body;

    const result = await processAccusation({
      userId: req.user._id,
      mysteryId: mystery._id,
      selectedSuspectId,
      reasoning,
    });

    res.status(201).json({
      success: true,
      message: 'Accusation recorded and evaluated successfully',
      data: result,
    });
  } catch (error) {
    if (error.message.includes('already been submitted')) {
      return res.status(400).json({
        success: false,
        message: error.message,
        error: 'DUPLICATE_ACCUSATION',
      });
    }
    next(error);
  }
};

export const getResult = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mystery) {
      return res.status(404).json({ success: false, message: 'Mystery not found', error: 'NOT_FOUND' });
    }

    const result = await getInvestigationResultData({
      userId: req.user._id,
      mysteryId: mystery._id,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No accusation has been submitted yet for this case.',
        error: 'RESULT_NOT_AVAILABLE',
      });
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
