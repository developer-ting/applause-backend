import mongoose from "mongoose";

export const SkillsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

export default mongoose.model.Skills || mongoose.model("Skills", SkillsSchema);
