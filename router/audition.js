import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as auditionController from "../controllers/audition.js";

//POST
router.route("/audition").post(auditionController.createAudition); // All audition
//GET
router.route("/audition").get(auditionController.getAudition); // All audition
// PUT
router.route("/audition/:characterName").put(auditionController.updateAudition); // Update audition
// DELETE
router
  .route("/audition/:characterName")
  .delete(auditionController.deleteAudition); // Delete One audition

export default router;
