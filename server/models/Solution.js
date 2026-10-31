import mongoose from 'mongoose';

const solutionSchema = new mongoose.Schema(
  {
    mysteryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mystery',
      required: true,
      unique: true,
      index: true,
    },
    culpritSuspectId: {
      type: String,
      required: true,
    },
    actualMotive: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    opportunity: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    evidenceReasoning: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Solution = mongoose.model('Solution', solutionSchema);
