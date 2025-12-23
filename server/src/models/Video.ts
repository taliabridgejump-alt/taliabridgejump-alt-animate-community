import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploader: mongoose.Types.ObjectId;
  uploaderName: string;
  tags: string[];
  category: string;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  uploader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  uploaderName: { type: String, required: true },
  tags: [{ type: String }],
  category: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

VideoSchema.index({ title: 'text', tags: 'text', uploaderName: 'text' });

export default mongoose.model<IVideo>('Video', VideoSchema);
