import mongoose from 'mongoose';

const mysterySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'Untitled Mystery',
    },
    originalPrompt: {
      type: String,
      required: true,
      minlength: 30,
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: [
        'Murder Mystery',
        'Theft',
        'Missing Person',
        'Cybercrime',
        'Corporate Espionage',
        'Hidden Identity',
        'General Mystery',
      ],
      default: 'General Mystery',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    suspectCount: {
      type: Number,
      min: 3,
      max: 6,
      default: 4,
    },
    story: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    incidentDate: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['generating', 'ready', 'failed', 'completed'],
      default: 'generating',
      index: true,
    },
    generationStage: {
      type: String,
      default: 'Analyzing your story',
    },
    generationError: {
      type: String,
      default: null,
    },
    timeline: [
      {
        eventId: { type: String, required: true },
        title: { type: String, required: true },
        dateTime: { type: String, required: true },
        description: { type: String, required: true },
        relatedSuspects: [{ type: String }],
        relatedEvidence: [{ type: String }],
      },
    ],
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Mystery = mongoose.model('Mystery', mysterySchema);
