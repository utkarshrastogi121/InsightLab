import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  title: string;
  description: string;
  url: string;
  category: string;
  scrapedAt: Date;
}

const newsSchema = new Schema<INews>({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  scrapedAt: { type: Date, default: Date.now },
});

export default mongoose.model<INews>("News", newsSchema);
