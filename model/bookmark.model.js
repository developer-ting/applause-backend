import mongoose from "mongoose";

export const BookmarkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    items: [
      {
        type: {
          type: String,
          enum: ["Media", "Talent", "Audition", "Project"],
          required: true,
        },
        itemId: {
          type: String,
          required: true,
          refPath: "items.type",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model.Bookmarks ||
  mongoose.model("Bookmark", BookmarkSchema);
