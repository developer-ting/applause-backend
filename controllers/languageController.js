// Models
import LanguageModel from "../model/language.model.js";

// ===================== POST GENRE DATA ===================

export async function language(req, res) {
  try {
    const response = req.body;
    await LanguageModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}
