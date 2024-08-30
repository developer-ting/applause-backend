import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as filtersController from "../controllers/filters.js";

// Platform
// POST
router.route("/platform").post(filtersController.createPlatform); // Create Platform
// PUT
router.route("/platform/:title").put(filtersController.updatePlatform); // Update One platform
// GET
router.route("/platform").get(filtersController.fetchPlatform); // Get All Platform
// Delete
router.route("/platform/:title").delete(filtersController.deletePlatform); // Delete One platform

export default router;
