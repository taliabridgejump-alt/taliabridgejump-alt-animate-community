import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  video: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  username: string;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IComment>('Comment', CommentSchema);
