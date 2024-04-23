// Models
import BookmarkModel from "../model/bookmark.model.js";
import UserModel from "../model/user.model.js";

// Plugins
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// Utils
import { defaultConfig } from "../utils/index.js";

// ===================== GET ===================
/** GET: http://localhost:8080/api/bookmarks 
 * @param : {
  "limit" : 10,
  "skip" : 0,
  "type": "Media"
}
*/
export async function getBookmarks(req, res) {
  try {
    const { limit, skip, type } = req.query;
    let query = {};

    if (type) {
      query["items.type"] = type;
    }

    let bookmarks = await BookmarkModel.find(query)
      .limit(limit || defaultConfig.fetchLimit)
      .skip(skip || 0);

    // Filter populated items to include only those of the specified type
    if (type) {
      bookmarks = bookmarks.map((bookmark) => {
        bookmark.items = bookmark.items.filter((item) => item.type === type);
        return bookmark;
      });
    }

    return res.status(200).json({ bookmarks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve bookmarks" });
  }
}

/** GET: http://localhost:8080/api/bookmarks/Ting1 
 * @param : {
  "type": "Media"
}
*/
export async function getBookmark(req, res) {
  try {
    const { name } = req.params;
    const { type } = req.query;

    let bookmarks = await BookmarkModel.findOne({ name }).populate(
      "items.itemId"
    );

    // Check if type parameter is provided and split it into an array
    const typesArray = type ? type.split(",") : [];

    // Filter items based on the type parameter
    if (typesArray.length > 1) {
      bookmarks.items = bookmarks.items.filter((item) =>
        typesArray.includes(item.itemId.type)
      );
    } else {
      bookmarks.items = bookmarks.items.filter((item) => item.type === type);
    }

    return res.status(200).json({ bookmarks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve bookmarks" });
  }
}

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

/** PUT: http://localhost:8080/api/bookmarks/test
 * @body : {
    "type": "Video",
    "id": "660bb2a0038d622b96ff40d4",
}
*/
export async function addToBookmark(req, res) {
  try {
    const { name } = req.params;
    const { type, itemId } = req.body;

    const bookmark = await BookmarkModel.findOne({ name });

    if (!bookmark) {
      return res
        .status(404)
        .json({ error: "Bookmark not found!, Please provide correct Name" });
    }

    // Check if the entry already exists in the items array
    const existingIndex = bookmark.items.findIndex(
      (item) => item.type === type && item.itemId === itemId
    );

    if (existingIndex !== -1) {
      await BookmarkModel.updateOne(
        { name }, // Query criteria
        { $pull: { items: { type, itemId } } }
      );

      return res.status(200).json({ msg: `Record updated for ${name}` });
    }

    await BookmarkModel.updateOne(
      { name },
      { $push: { items: { type, itemId } } }
    );

    return res.status(200).json({ msg: `Record updated for ${name}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================
