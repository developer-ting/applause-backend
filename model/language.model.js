import mongoose from "mongoose";

export const languageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

export default mongoose.model.Language ||
  mongoose.model("Language", languageSchema);
