import mongoose from 'mongoose';

const accusationSchema = new mongoose.Schema(
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
    selectedSuspectId: {
      type: String,
      required: true,
    },
    reasoning: {
      type: String,
      default: '',
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    resultExplanation: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

accusationSchema.index({ userId: 1, mysteryId: 1 }, { unique: true });

export const Accusation = mongoose.model('Accusation', accusationSchema);
