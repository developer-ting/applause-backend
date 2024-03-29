import mongoose from "mongoose";

export const skillsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

export default mongoose.model.Skills || mongoose.model("Skills", skillsSchema);
