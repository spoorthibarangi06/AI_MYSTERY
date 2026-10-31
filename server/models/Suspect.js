import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema(
  {
    mysteryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mystery',
      required: true,
      index: true,
    },
    suspectId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 35,
    },
    occupation: {
      type: String,
      default: 'Unknown',
    },
    profileImage: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: '',
    },
    motive: {
      type: String,
      default: '',
    },
    alibi: {
      type: String,
      default: '',
    },
    publicDetails: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure uniqueness per mystery
suspectSchema.index({ mysteryId: 1, suspectId: 1 }, { unique: true });

export const Suspect = mongoose.model('Suspect', suspectSchema);
