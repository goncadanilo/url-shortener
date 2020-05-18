import { Schema, model, Document } from 'mongoose';

type Url = Document & {
  originalUrl: string;
  shortUrl: string;
};

const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default model<Url>('Url', UrlSchema);
