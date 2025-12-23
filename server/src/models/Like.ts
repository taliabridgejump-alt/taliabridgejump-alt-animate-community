import mongoose, { Document, Schema } from 'mongoose';

export interface ILike extends Document {
  video: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const LikeSchema = new Schema<ILike>({
  video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

LikeSchema.index({ video: 1, user: 1 }, { unique: true });

export default mongoose.model<ILike>('Like', LikeSchema);
