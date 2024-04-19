// Models
import BookmarkModel from "../model/bookmark.model.js";
import UserModel from "../model/user.model.js";

// Plugins
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// Utils

// ===================== GET ===================

// ===================== POST ===================

/** POST: http://localhost:8080/api/bookmarks 
 * @body : {
    "name": "test",
    "items": [],
  }
  @param : {
     "Authentication" : "Bearer ${token}",
  }
*/

export async function createbookmark(req, res) {
  const { name } = req.body;
  const data = req.body;

  // if in-correct or no token return status 500
  if (!req.headers.authorization)
    return res.status(500).send({ error: "Please provide correct token" });

  // access authorize header to validate request
  const token = req.headers.authorization.split(" ")[1];

  try {
    const existingBookmark = await BookmarkModel.findOne({ name });

    if (existingBookmark) {
      return res.status(409).json({ error: "Bookmark already exists" });
    }

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

      const bookmark = await BookmarkModel.create(data);

      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      await UserModel.updateOne(
        { email },
        {
          bookmarks: [...user.bookmarks, bookmark._id],
        }
      );

      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== PUT ===================

// ===================== DELETE ===================
