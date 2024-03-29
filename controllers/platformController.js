// Models
import PlatformModel from "../model/platform.model.js";

// ===================== POST GENRE DATA ===================

export async function platform(req, res) {
  try {
    const response = req.body;
    await PlatformModel.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}
