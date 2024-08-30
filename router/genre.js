import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as filtersController from "../controllers/filters.js";

// Genre
// POST
router.route("/genre").post(filtersController.createGenre); // Create Genre
// PUT
router.route("/genre/:title").put(filtersController.updateGenre); // Update One genre
// GET
router.route("/genre").get(filtersController.fetchGenre); // Get All Genre
// Delete
router.route("/genre/:title").delete(filtersController.deleteGenre); // Delete One genre

export default router;
