import mongoose from "mongoose";

export const BookmarkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    items: [
      {
        type: {
          type: String,
          enum: ["Profile", "Video", "Image", "Talent", "Audition"],
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model.Talents ||
  mongoose.model("Bookmark", BookmarkSchema);
