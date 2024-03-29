import mongoose from "mongoose";

export const LanguageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

export default mongoose.model.Language ||
  mongoose.model("Language", LanguageSchema);
