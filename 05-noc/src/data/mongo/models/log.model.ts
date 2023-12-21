import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    level: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Level is required'],
      default: 'low',
    },
    origin: {
      type: String,
      required: [true, 'Origin is required'],
    },
    createdAt: {
      type: String,
      required: [true, 'Created At is required'],
      default: new Date(),
    },
  },
  {
  timestamps: true,
  versionKey: false,
  }
);

export const LogModel = mongoose.model('Log', logSchema);