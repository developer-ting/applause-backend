import mongoose from "mongoose";

export const PlatformSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

export default mongoose.model.Platform ||
  mongoose.model("Platform", PlatformSchema);
