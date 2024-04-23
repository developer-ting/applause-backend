import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  profile: { type: String },
  phone: { type: String },
  bookmarks: { type: [String], ref: "Bookmark" },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
