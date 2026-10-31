import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema(
  {
    mysteryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mystery',
      required: true,
      index: true,
    },
    evidenceId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['message', 'image', 'cctv', 'witness_statement', 'physical_evidence', 'document'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    assetUrl: {
      type: String,
      default: '',
    },
    relatedSuspectIds: [
      {
        type: String,
      },
    ],
    discoveryLocation: {
      type: String,
      default: 'Crime Scene',
    },
    timestamp: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

evidenceSchema.index({ mysteryId: 1, evidenceId: 1 }, { unique: true });

export const Evidence = mongoose.model('Evidence', evidenceSchema);
