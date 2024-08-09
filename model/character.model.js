import mongoose from "mongoose";

export const CharacterSchema = new mongoose.Schema(
  {
    characterName: { type: String },
    characterType: { type: String, enum: ["Primary", "Secondary", "Tertiary"] },
    status: { type: String, enum: ["Casted", "Shortlisted", "None"] },
    projects: { type: [String], ref: "Project" },
    auditions: { type: [String], ref: "Audition" },
  },
  { timestamps: true }
);

export default mongoose.model.Characters ||
  mongoose.model("Character", CharacterSchema);
