import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmark extends Document {
  video: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>({
  video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

BookmarkSchema.index({ video: 1, user: 1 }, { unique: true });

export default mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
