import mongoose from "mongoose";

export const ProjectsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  description: {
    type: String,
  },
  imdbUrl: {
    type: String,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  cencorRating: {
    type: String,
  },
  producers: {
    type: String,
  },
  directors: {
    type: String,
  },
  cast: {
    type: String,
  },
  castingDirector: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  email: {
    type: String,
  },
  characters: {
    type: [String],
    ref: "Character",
  },
  genre: {
    type: [String],
    ref: "Genre",
  },
});

export default mongoose.model.Projects ||
  mongoose.model("Project", ProjectsSchema);
