import mongoose from 'mongoose';

const investigationProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    mysteryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mystery',
      required: true,
      index: true,
    },
    reviewedEvidenceIds: [
      {
        type: String,
      },
    ],
    bookmarkedEvidenceIds: [
      {
        type: String,
      },
    ],
    lastVisitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

investigationProgressSchema.index({ userId: 1, mysteryId: 1 }, { unique: true });

export const InvestigationProgress = mongoose.model('InvestigationProgress', investigationProgressSchema);
