import mongoose from "mongoose";

export const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    // type: { name: String, type: String },
  },
});

export default mongoose.model.Genre || mongoose.model("Genre", genreSchema);
