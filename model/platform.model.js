import mongoose from "mongoose";

export const platformSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

export default mongoose.model.Platform ||
  mongoose.model("Platform", platformSchema);
