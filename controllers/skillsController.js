// Models
import SkillsModel from "../model/skills.model.js";

// ===================== POST GENRE DATA ===================

export async function skills(req, res) {
  try {
    const response = req.body;
    await SkillsModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}
