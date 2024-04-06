// Models
import GenreModel from "../model/genre.model.js";
import LanguageModel from "../model/language.model.js";
import PlatformModel from "../model/platform.model.js";
import SkillsModel from "../model/skills.model.js";

// GENRE
// ===================== POST ===================
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
// ===================== GET ===================
export async function fetchGenre(req, res) {
  try {
    const genres = await GenreModel.find();
    return res.status(200).json({ genres });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

// ===================== PUT ===================
export async function updateGenre(req, res) {
  try {
    const { title } = req.params;
    const data = req.body;
    const genres = await GenreModel.findOne({ title });
    if (!genres) {
      return res
        .status(404)
        .json({ error: "genres not found!, Please provide correct Title" });
    }

    await GenreModel.updateOne({ title }, data);

    return res.status(200).json({ msg: `Record updated for ${title}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

export async function deleteGenre(req, res) {
  try {
    const { title } = req.params;

    const genre = await GenreModel.findOne({ title });

    if (!genre) {
      return res.status(404).json({ error: "project not found!" });
    }

    await GenreModel.findOne({ title }).deleteOne();

    return res.status(200).json({ msg: `Entry for ${title} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// Language
// ===================== POST ===================
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
// ===================== GET ===================
export async function fetchLanguage(req, res) {
  try {
    const language = await LanguageModel.find();
    return res.status(200).json({ language });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

// ===================== PUT ===================
export async function updateLanguage(req, res) {
  try {
    const { title } = req.params;
    const data = req.body;
    const language = await LanguageModel.findOne({ title });
    if (!language) {
      return res
        .status(404)
        .json({ error: "language not found!, Please provide correct Title" });
    }

    await LanguageModel.updateOne({ title }, data);

    return res.status(200).json({ msg: `Record updated for ${title}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

export async function deleteLanguage(req, res) {
  try {
    const { title } = req.params;

    const language = await LanguageModel.findOne({ title });

    if (!language) {
      return res.status(404).json({ error: "language not found!" });
    }

    await LanguageModel.findOne({ title }).deleteOne();

    return res.status(200).json({ msg: `Entry for ${title} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// Platform
// ===================== POST ===================
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
// ===================== GET ===================
export async function fetchPlatform(req, res) {
  try {
    const platform = await PlatformModel.find();
    return res.status(200).json({ platform });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

// ===================== PUT ===================
export async function updatePlatform(req, res) {
  try {
    const { title } = req.params;
    const data = req.body;
    const platform = await PlatformModel.findOne({ title });
    if (!platform) {
      return res
        .status(404)
        .json({ error: "platform not found!, Please provide correct Title" });
    }

    await PlatformModel.updateOne({ title }, data);

    return res.status(200).json({ msg: `Record updated for ${title}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

export async function deletePlatform(req, res) {
  try {
    const { title } = req.params;

    const platform = await PlatformModel.findOne({ title });

    if (!platform) {
      return res.status(404).json({ error: "platform not found!" });
    }

    await PlatformModel.findOne({ title }).deleteOne();

    return res.status(200).json({ msg: `Entry for ${title} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// Skills
// ===================== POST ===================
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
// ===================== GET ===================
export async function fetchSkills(req, res) {
  try {
    const skills = await SkillsModel.find();
    return res.status(200).json({ skills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

// ===================== PUT ===================
export async function updateSkills(req, res) {
  try {
    const { title } = req.params;
    const data = req.body;
    const skills = await SkillsModel.findOne({ title });
    if (!skills) {
      return res
        .status(404)
        .json({ error: "Skills not found!, Please provide correct Title" });
    }

    await SkillsModel.updateOne({ title }, data);

    return res.status(200).json({ msg: `Record updated for ${title}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

export async function deleteSkills(req, res) {
  try {
    const { title } = req.params;

    const skills = await SkillsModel.findOne({ title });

    if (!skills) {
      return res.status(404).json({ error: "Skills not found!" });
    }

    await SkillsModel.findOne({ title }).deleteOne();

    return res.status(200).json({ msg: `Entry for ${title} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}
