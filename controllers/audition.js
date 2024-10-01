// Models
import Audition from "../model/audition.model.js";

// AUDITION
// ===================== POST ===================
export async function createAudition(req, res) {
  try {
    const response = req.body;
    await Audition.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Message not delivered" });
  }
}

// ===================== GET ===================
export async function getAudition(req, res) {
  try {
    const audition = await Audition.find();
    return res.status(200).json({ audition });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve audition" });
  }
}

// ===================== PUT ===================
export async function updateAudition(req, res) {
  try {
    const { characterName } = req.params;
    const data = req.body;
    const audition = await Audition.findOne({ characterName });
    if (!audition) {
      return res.status(404).json({
        error: "genres not found!, Please provide correct characterName",
      });
    }

    await Audition.updateOne({ characterName }, data);

    return res.status(200).json({ msg: `Record updated for ${characterName}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

export async function deleteAudition(req, res) {
  try {
    const { characterName } = req.params;

    const audition = await Audition.findOne({ characterName });

    if (!audition) {
      return res.status(404).json({ error: "audition not found!" });
    }

    await Audition.findOne({ characterName }).deleteOne();

    return res
      .status(200)
      .json({ msg: `Entry for ${characterName} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}
