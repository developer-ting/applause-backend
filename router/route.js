import { Router } from "express";
const router = Router();

//  import all controllers
import * as controller from "../controllers/appController.js";
import * as authController from "../controllers/auth.js";
import * as filtersController from "../controllers/filters.js";
import * as languageController from "../controllers/languageController.js";
import * as skillsController from "../controllers/skillsController.js";
import * as platformController from "../controllers/platformController.js";

// AUTH
router.route("/register").post(authController.register); // register user
router.route("/login").post(controller.verifyUser, authController.login); // login user

// Filters - POST
router.route("/genre").post(filtersController.createGenre); // Genre
router.route("/language").post(languageController.language); // Language
router.route("/skills").post(skillsController.skills); // Skills
router.route("/platform").post(platformController.platform); // Platform

// Filters - GET
router.route("/genre").post(filtersController.fetchGenre); // Genre
router.route("/language").post(languageController.language); // Language
router.route("/skills").post(skillsController.skills); // Skills
router.route("/platform").post(platformController.platform); // Platform

export default router;
