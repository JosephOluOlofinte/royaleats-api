import mongoose from 'mongoose';
import iSessionDocument from '../types_and_interfaces/sessionDocument.interface';

const sessionSchema = new mongoose.Schema<iSessionDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }, // Expires in 30 days
});

const Session = mongoose.model<iSessionDocument>('Session', sessionSchema);

export default Session;
