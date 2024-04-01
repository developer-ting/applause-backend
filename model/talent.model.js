import mongoose from "mongoose";

export const TalentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    birthYear: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    introVideo: { type: String, required: true },
    gender: { type: String, required: true },
    height: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    languageSpoken: { type: [String], ref: "Language" },
    projects: { type: [String], ref: "Project" },
    profilePictures: { type: [String] },
    auditions: { type: [String], ref: "Audition" },
  },
  { timestamps: true }
);

export default mongoose.model.Talents || mongoose.model("Talent", TalentSchema);
