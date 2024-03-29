// Models
import GenreModel from "../model/genre.model.js";
import LanguageModel from "../model/language.model.js";
import PlatformModel from "../model/platform.model.js";
import SkillsModel from "../model/skills.model.js";

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
    const genres = await GenreModel.find();
    return res.status(200).json({ genres });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

// ===================== Language ===================

export async function createLanguage(req, res) {
  try {
    const response = req.body;
    await LanguageModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}

export async function fetchLanguage(req, res) {
  try {
    const language = await LanguageModel.find();
    return res.status(200).json({ language });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

// ===================== Platform ===================

export async function createPlatform(req, res) {
  try {
    const response = req.body;
    await PlatformModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}

export async function fetchPlatform(req, res) {
  try {
    const platform = await PlatformModel.find();
    return res.status(200).json({ platform });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

// ===================== Skills ===================

export async function createSkills(req, res) {
  try {
    const response = req.body;
    await SkillsModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}

export async function fetchSkills(req, res) {
  try {
    const skills = await SkillsModel.find();
    return res.status(200).json({ skills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}
