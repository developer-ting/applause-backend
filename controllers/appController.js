// Models
import UserModel from "../model/user.model.js";

// Plugins
import * as dotenv from "dotenv";
dotenv.config();

// middleware for verify user
export async function verifyUser(req, res, next) {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await UserModel.findOne({ email });
    if (!exist) return res.status(404).send({ error: "Can't find User" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}
