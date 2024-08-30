import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as filtersController from "../controllers/filters.js";

// Skills
// POST
router.route("/skills").post(filtersController.createSkills); // Create Skill
// PUT
router.route("/skills/:title").put(filtersController.updateSkills); // Update One skills
// GET
router.route("/skills").get(filtersController.fetchSkills); // Get All Skills
// Delete
router.route("/skills/:title").delete(filtersController.deleteSkills); // Delete One skills

export default router;
