// Models
import CharacterModel from "../model/character.model";

// Character
// ===================== POST ===================
export async function createCharacter(req, res) {
  try {
    const response = req.body;
    await CharacterModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}

// ===================== GET ===================
export async function getCharacter(req, res) {
  try {
    const character = await CharacterModel.find();
    return res.status(200).json({ audition });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve audition" });
  }
}

// ===================== PUT ===================
export async function updateCharacter(req, res) {
  try {
    const { characterName } = req.params;
    const data = req.body;
    const character = await CharacterModel.findOne({ characterName });
    if (!character) {
      return res.status(404).json({
        error: "genres not found!, Please provide correct characterName",
      });
    }

    await CharacterModel.updateOne({ characterName }, data);

    return res.status(200).json({ msg: `Record updated for ${characterName}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

export async function deleteCharacter(req, res) {
  try {
    const { characterName } = req.params;

    const character = await CharacterModel.findOne({ characterName });

    if (!character) {
      return res.status(404).json({ error: "project not found!" });
    }

    await CharacterModel.findOne({ characterName }).deleteOne();

    return res
      .status(200)
      .json({ msg: `Entry for ${characterName} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}
