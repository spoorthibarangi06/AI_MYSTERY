import { Mystery } from '../models/Mystery.js';
import { Suspect } from '../models/Suspect.js';
import { Evidence } from '../models/Evidence.js';
import { Solution } from '../models/Solution.js';
import { InvestigationProgress } from '../models/InvestigationProgress.js';
import { Accusation } from '../models/Accusation.js';
import { runMysteryGenerationPipeline } from '../services/mysteryGenerationService.js';

export const createMystery = async (req, res, next) => {
  try {
    const { title, prompt, category, difficulty, suspectCount } = req.body;

    const mystery = await Mystery.create({
      userId: req.user._id,
      title: title && title.trim() ? title.trim() : 'Case Under Investigation',
      originalPrompt: prompt,
      category: category || 'General Mystery',
      difficulty: difficulty || 'Medium',
      suspectCount: suspectCount || 4,
      status: 'generating',
      generationStage: 'Analysing your story',
    });

    // Run AI pipeline asynchronously so the client gets an immediate response
    // and can navigate to the generating screen with real-time progress polling
    runMysteryGenerationPipeline(mystery._id).catch((err) => {
      console.error('[Async Mystery Pipeline Failed]', err);
    });

    res.status(201).json({
      success: true,
      message: 'Mystery investigation generation initiated',
      data: {
        _id: mystery._id,
        status: mystery.status,
        generationStage: mystery.generationStage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMysteries = async (req, res, next) => {
  try {
    const mysteries = await Mystery.find({ userId: req.user._id }).sort({ createdAt: -1 });

    // Also get counts of accusations for dashboard stats
    const accusations = await Accusation.find({ userId: req.user._id });
    const correctCount = accusations.filter((a) => a.isCorrect).length;

    res.json({
      success: true,
      data: {
        mysteries,
        stats: {
          total: mysteries.length,
          completed: mysteries.filter((m) => m.status === 'completed').length,
          ongoing: mysteries.filter((m) => m.status === 'ready').length,
          correctAccusations: correctCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMysteryById = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mystery) {
      return res.status(404).json({
        success: false,
        message: 'Case file not found or unauthorized',
        error: 'MYSTERY_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      data: mystery,
    });
  } catch (error) {
    next(error);
  }
};

export const getMysteryStatus = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id }).select(
      'status generationStage generationError title category difficulty'
    );

    if (!mystery) {
      return res.status(404).json({
        success: false,
        message: 'Mystery not found',
        error: 'NOT_FOUND',
      });
    }

    res.json({
      success: true,
      data: mystery,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMystery = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mystery) {
      return res.status(404).json({
        success: false,
        message: 'Mystery not found or unauthorized',
        error: 'NOT_FOUND',
      });
    }

    await Promise.all([
      Mystery.deleteOne({ _id: mystery._id }),
      Suspect.deleteMany({ mysteryId: mystery._id }),
      Evidence.deleteMany({ mysteryId: mystery._id }),
      Solution.deleteOne({ mysteryId: mystery._id }),
      InvestigationProgress.deleteMany({ mysteryId: mystery._id }),
      Accusation.deleteMany({ mysteryId: mystery._id }),
    ]);

    res.json({
      success: true,
      message: 'Case file deleted permanently',
    });
  } catch (error) {
    next(error);
  }
};
