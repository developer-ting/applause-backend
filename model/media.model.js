import mongoose from "mongoose";

export const MediaSchema = new mongoose.Schema(
  {
    sourceId: { type: String },
    media: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model.Talents || mongoose.model("Media", MediaSchema);
