import { Mystery } from '../models/Mystery.js';
import { Suspect } from '../models/Suspect.js';
import { Evidence } from '../models/Evidence.js';
import { InvestigationProgress } from '../models/InvestigationProgress.js';

export const getSuspects = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mystery) {
      return res.status(404).json({ success: false, message: 'Mystery not found', error: 'NOT_FOUND' });
    }

    const suspects = await Suspect.find({ mysteryId: mystery._id }).select(
      'suspectId name age occupation profileImage background motive alibi publicDetails'
    );

    res.json({ success: true, data: suspects });
  } catch (error) {
    next(error);
  }
};

export const getEvidenceList = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mystery) {
      return res.status(404).json({ success: false, message: 'Mystery not found', error: 'NOT_FOUND' });
    }

    const evidence = await Evidence.find({ mysteryId: mystery._id });
    res.json({ success: true, data: evidence });
  } catch (error) {
    next(error);
  }
};

export const getEvidenceById = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mystery) {
      return res.status(404).json({ success: false, message: 'Mystery not found', error: 'NOT_FOUND' });
    }

    const evidence = await Evidence.findOne({
      mysteryId: mystery._id,
      $or: [{ _id: req.params.evidenceId }, { evidenceId: req.params.evidenceId }],
    });

    if (!evidence) {
      return res.status(404).json({ success: false, message: 'Evidence item not found', error: 'NOT_FOUND' });
    }

    res.json({ success: true, data: evidence });
  } catch (error) {
    next(error);
  }
};

export const getTimeline = async (req, res, next) => {
  try {
    const mystery = await Mystery.findOne({ _id: req.params.id, userId: req.user._id }).select('timeline');
    if (!mystery) {
      return res.status(404).json({ success: false, message: 'Mystery not found', error: 'NOT_FOUND' });
    }

    res.json({ success: true, data: mystery.timeline || [] });
  } catch (error) {
    next(error);
  }
};

export const getProgress = async (req, res, next) => {
  try {
    let progress = await InvestigationProgress.findOne({
      userId: req.user._id,
      mysteryId: req.params.id,
    });

    if (!progress) {
      progress = await InvestigationProgress.create({
        userId: req.user._id,
        mysteryId: req.params.id,
        reviewedEvidenceIds: [],
        bookmarkedEvidenceIds: [],
      });
    }

    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const { reviewedEvidenceIds } = req.body;

    const progress = await InvestigationProgress.findOneAndUpdate(
      { userId: req.user._id, mysteryId: req.params.id },
      {
        $set: {
          reviewedEvidenceIds: Array.isArray(reviewedEvidenceIds) ? reviewedEvidenceIds : [],
          lastVisitedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

export const updateBookmarks = async (req, res, next) => {
  try {
    const { bookmarkedEvidenceIds } = req.body;

    const progress = await InvestigationProgress.findOneAndUpdate(
      { userId: req.user._id, mysteryId: req.params.id },
      {
        $set: {
          bookmarkedEvidenceIds: Array.isArray(bookmarkedEvidenceIds) ? bookmarkedEvidenceIds : [],
          lastVisitedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};
