import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// Utils
import {
  defaultConfig,
  deleteMedia,
  deleteMultipleMedia,
  storeMediaToDB,
} from "../utils/index.js";

// Models
import UserModel from "../model/user.model.js";

// ===================== GET ===================

/** GET: http://localhost:8080/api/user?email=pogilok267a@pursip.com
 * @param : {
     "Authentication" : "Bearer ${token}",
  }
 */
export async function fetchOneUser(req, res) {
  try {
    // if in-correct or no token return status 500
    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // decode token into userId and username
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        // Token verification failed
        console.error(err);
        throw err;
      }

      // Token is valid, and 'decoded' contains the payload
      const email = req.query?.email;

      if (!email) {
        return res.status(404).json({ error: "Provide email address" });
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      return res.status(200).json({ user });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve User" });
  }
}

/** GET: http://localhost:8080/api/users
 * @param : {
     "Authentication" : "Bearer ${token}",
  }
*/
export async function fetchAllUser(req, res) {
  try {
    // if in-correct or no token return status 500
    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // decode token into userId and username
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        // Token verification failed
        console.error(err);
        throw err;
      }

      // Token is valid, and 'decoded' contains the payload
      const email = decoded.email;

      const user = await UserModel.find();

      if (!user) {
        return res.status(404).json({ error: "Users not found!" });
      }

      return res.status(200).json({ user });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve Users" });
  }
}

// ===================== POST ===================

// ===================== PUT ===================

/** PUT: http://localhost:8080/api/user?email=pogilok267a@pursip.com
 * @body : {
    "firstname": "Ting",
    "lastname": "Works",
    "profile": "profile.com/img",
    "password": "password@123",
    "email": "test@gmail.com",
    "phone": "1234567890"
}
*/
export async function updateOneUser(req, res) {
  try {
    // if in-correct or no token return status 500
    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // decode token into userId and username
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        // Token verification failed
        console.error(err);
        throw err;
      }

      // Token is valid, and 'decoded' contains the payload
      const email = req.query?.email;

      if (!email) {
        return res.status(404).json({ error: "Provide email address" });
      }
      const user = await UserModel.findOne({ email });
      const { password, ...data } = req.body;

      let media = {};

      if (req.files) {
        if (req.files.profile) {
          await Promise.all([
            storeMediaToDB(
              req.files.profile,
              "Image",
              `${user.firstname}${user.lastname}`
            ),
          ]).then((values) => {
            console.log(values);
            media.profile = values[0].media;
          });
        }
      }

      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found!, Please provide correct Email" });
      }

      await UserModel.updateOne({ email }, { ...data, ...media });

      return res.status(200).json({ msg: `Record updated for ${email}` });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

/** DELETE: http://localhost:8080/api/user
 * @param : {}
 */
export async function deleteOneUser(req, res) {
  try {
    // if in-correct or no token return status 500
    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // decode token into userId and username
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        // Token verification failed
        console.error(err);
        throw err;
      }

      // Token is valid, and 'decoded' contains the payload
      const email = decoded.email;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      await UserModel.findOne({ email }).deleteOne();

      return res.status(200).json({ msg: `Entry for ${email} is removed` });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}
