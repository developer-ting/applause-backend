import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as bookmarksController from "../controllers/bookmark.js";

// POST
router.route("/bookmarks").post(Auth, bookmarksController.createbookmark); // Get bookmarks

// GET
router.route("/bookmarks").get(bookmarksController.getBookmarks); // All Bookmarks
router.route("/bookmarks/:name").get(bookmarksController.getBookmark); // Get one bookmark
// PUT
router.route("/bookmarks/:name").put(bookmarksController.addToBookmark); // Add/Remove Item from Bookmark
// DELETE
router.route("/bookmarks/:name").delete(bookmarksController.deleteBookmark); // Delete One Bookmark

export default router;
