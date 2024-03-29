// Models
import GenreModel from "../model/genre.model.js";

// ===================== GENRE ===================

export async function createGenre(req, res) {
  try {
    const response = req.body;
    await GenreModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}

export async function fetchGenre(req, res) {
  try {
    const response = req.body;
    await GenreModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}

// ===================== language ===================
