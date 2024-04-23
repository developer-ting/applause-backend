import mongoose from "mongoose";

// const CharacterSchema = new mongoose.Schema({
//   characterName: String,
//   characterType: {
//     type: String,
//     enum: ["Primary", "Secondary", "Tertiary"],
//   },
//   auditions: {
//     type: [String],
//     ref: "Audition",
//   },
// });

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
    default: Date.now, // Optionally set a default value
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
  characters: [
    {
      characterName: String,
      characterType: {
        type: String,
        enum: ["Primary", "Secondary", "Tertiary"],
      },
      auditions: {
        type: String,
        ref: "Audition",
      },
    },
  ],
  genre: {
    type: [String],
    ref: "Genre",
  },
});

export default mongoose.model.Genre ||
  mongoose.model("Project", ProjectsSchema);
