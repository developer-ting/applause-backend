import mongoose from "mongoose";

export const AuditionSchema = new mongoose.Schema(
  {
    thumbnail: { type: String },
    video: { type: String },
    characterName: { type: String },
    characterType: { type: String, enum: ["Primary", "Secondary", "Tertiary"] },
    status: { type: String, enum: ["Casted", "Shortlisted", "None"] },
    projects: { type: [String], ref: "Project" },
    talents: { type: [String], ref: "Talent" },
  },
  { timestamps: true }
);

export default mongoose.model.Talents ||
  mongoose.model("Audition", AuditionSchema);
