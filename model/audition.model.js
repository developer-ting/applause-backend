import mongoose from "mongoose";

export const AuditionSchema = new mongoose.Schema(
  {
    thumbnail: { type: String },
    video: { type: String },
    projects: { type: [String], ref: "Project" },
    talents: { type: [String], ref: "Talent" },
  },
  { timestamps: true }
);

export default mongoose.model.Auditions ||
  mongoose.model("Audition", AuditionSchema);
