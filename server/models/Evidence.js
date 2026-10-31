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
      enum: [
        'message',
        'cctv',
        'police_report',
        'witness_statement',
        'medical_report',
        'email',
        'call_log',
        'financial_record',
        'access_log',
        'photo',
        'image',
        'handwritten_note',
        'physical_evidence',
        'document',
      ],
      required: true,
    },
    category: {
      type: String,
      enum: ['digital', 'visual', 'official_report', 'witness_statement', 'physical', 'document'],
      default: 'document',
      index: true,
    },
    source: {
      type: String,
      default: 'Forensic Investigation Unit',
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
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

evidenceSchema.index({ mysteryId: 1, evidenceId: 1 }, { unique: true });

export const Evidence = mongoose.model('Evidence', evidenceSchema);
