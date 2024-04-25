import mongoose from "mongoose";

export const TalentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    birthYear: { type: Number, required: true },
    thumbnail: { type: String, required: true, ref: "Media" },
    introVideo: { type: String, required: true, ref: "Media" },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    height: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    withApplause: { type: String, required: true, enum: ["True", "False"] },
    languageSpoken: { type: [String], ref: "Language" },
    projects: { type: [String], ref: "Project" },
    profilePictures: { type: [String] },
    auditions: { type: [String], ref: "Audition" },
  },
  { timestamps: true }
);

export default mongoose.model.Talents || mongoose.model("Talent", TalentSchema);
