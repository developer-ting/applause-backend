import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as filtersController from "../controllers/filters.js";

// Language
// POST
router.route("/language").post(filtersController.createLanguage); // Create Language
// PUT
router.route("/language/:title").put(filtersController.updateLanguage); // Update One language
// GET
router.route("/language").get(filtersController.fetchLanguage); // Get All Language
// Delete
router.route("/language/:title").delete(filtersController.deleteLanguage); // Delete One language

export default router;
